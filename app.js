import express from 'express';
import session from 'express-session';
import axios from 'axios';
import dotenv from "dotenv"
import User from "./User.js";
import { setUserDetails,setUsersTopArtist,setUsersTopTracks } from './spotifyFunctions.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



dotenv.config();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

const user = new User();
let accessToken = null; // Kullanıcı için alınan erişim tokeni
let refreshToken = null;



const app = express();
const PORT = process.env.PORT || 3000;




app.use(session({
  secret: 'your_secret_key', // Güvenli bir anahtar kullanın
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/login", (req, res) => {
  if(accessToken){
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
    
    accessToken = response.data.access_token;
    refreshToken = response.data.refresh_token;
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
      refresh_token: refreshToken,
      client_id: client_id,
      client_secret: client_secret
    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    accessToken = response.data.access_token;
    return true;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return false;
  }
}

app.get("/api/person", async (req, res) => {
  if (!accessToken) {
    res.redirect("/login");
    return;
  }

  try {
    const person = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const topArtists = await axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const topTracks = await axios.get("https://api.spotify.com/v1/me/top/tracks?limit=40", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    setUserDetails(user, person.data);
    setUsersTopArtist(user, topArtists.data);
    setUsersTopTracks(user, topTracks.data);

    res.send(user.toJSON());
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return res.redirect("/api/person");
      } else {
        res.redirect("/login");
      }
    } else {
      console.error("Error getting data:", error);
      res.send("Error getting data");
    }
  }
});


app.get("/person", (req, res) => {
  if (!accessToken) {
    res.redirect("/login");
    return;
  }

  res.sendFile(__dirname + "/public/person.html");
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

