import express from 'express';
import session from 'express-session';
import axios from 'axios';
import dotenv from "dotenv"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



dotenv.config();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;
const secret = process.env.SESSION_SECRET;



const app = express();
const PORT = process.env.PORT || 3000;



app.use(session({
  secret:secret, // Güvenli bir anahtar kullanın
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/login", (req, res) => {
  if(req.session.accessToken) {
    res.redirect("/person");
    return;
  }
  const scope = "playlist-modify-public playlist-modify-private user-read-private user-read-email user-read-playback-state user-top-read";
  
  const authUrl = "https://accounts.spotify.com/authorize?" + new URLSearchParams({
    response_type: "code",
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri
  }).toString(); 

  res.redirect(authUrl);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  
  try {
    // Yetkilendirme kodunu kullanarak token al
    const response = await axios.post("https://accounts.spotify.com/api/token", new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirect_uri,
      client_id: client_id,
      client_secret: client_secret
    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    
    req.session.accessToken = response.data.access_token;
    req.session.refreshToken = response.data.refresh_token;
    
    res.redirect("/person");
  } catch (error) {
    console.error("Error getting token:", error);
    res.send("Error getting token");
  }
});

async function refreshAccessToken() {
  try {
    const response = await axios.post("https://accounts.spotify.com/api/token", new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: req.session.refreshToken,
      client_id: client_id,
      client_secret: client_secret
    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    req.session.accessToken = response.data.access_token;
    return true;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return false;
  }
}

app.get("/api/person", async (req, res) => {
  if (!req.session.accessToken) {
    res.redirect("/login");
    return;
  }

  try {
    // Fetch user data from Spotify
    const person = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${req.session.accessToken}`
      }
    });

    const topArtists = await axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: `Bearer ${req.session.accessToken}`
      }
    });

    const topTracks = await axios.get("https://api.spotify.com/v1/me/top/tracks?limit=40", {
      headers: {
        Authorization: `Bearer ${req.session.accessToken}`
      }
    });

    // Store data directly in session
    req.session.userData = {
      name: person.data.display_name,
      email: person.data.email,
      profileUrl: person.data.external_urls.spotify,
      imageUrl: person.data.images[0].url,
      topGenres: [],
      topArtists: [],
      topTracks: []
    };

    // Process top artists
    topArtists.data.items.forEach(item => {
      item.genres.forEach(genre => {
        if (!req.session.userData.topGenres.includes(genre)) {
          req.session.userData.topGenres.push(genre);
        }
      });
      req.session.userData.topArtists.push({
        name: item.name,
        url: item.external_urls.spotify
      });
    });

    // Process top tracks
    topTracks.data.items.forEach(item => {
      const artistNames = item.artists.map(artist => artist.name).join(", ");
      req.session.userData.topTracks.push({
        name: item.name,
        artists: artistNames,
        url: item.external_urls.spotify
      });
    });

    console.log('Session data:', req.session.userData);
    res.json(req.session.userData);

  } catch (error) {
    console.error("Detailed error:", error.response?.data || error.message);
    if (error.response && error.response.status === 401) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return res.redirect("/api/person");
      } else {
        res.redirect("/login");
      }
    } else {
      console.error("Error getting data:", error);
      res.status(500).send("Error getting data");
    }
  }
});


app.get("/person", (req, res) => {
  if (!req.session.accessToken) {
    res.redirect("/login");
    return;
  }

  res.sendFile(__dirname + "/public/person.html");
});

// Add this new route to get session data
app.get("/api/user-data", (req, res) => {
  if (!req.session.userData) {
    res.status(404).json({ error: "No user data found" });
    return;
  }
  res.json(req.session.userData);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

