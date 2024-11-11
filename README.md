# Spotify Top Artists & Tracks App

This app allows users to log in with their Spotify accounts to view their top artists, tracks, profile information, and most popular music genres based on their listening habits.

## Features

- **Login with Spotify**: Log in with your Spotify account.
- **User Profile Information**: View your Spotify username, email, profile picture, and more.
- **Top Artists**: Display your most-listened-to artists on Spotify.
- **Top Tracks**: Display your most-played songs on Spotify.
- **Top Genres**: Discover your favorite music genres based on your listening history.

## Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/spotify-top-artists.git
   cd spotify-top-artists
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up the .env File:**
   Create a `.env` file in the project directory and add your Spotify API credentials:
   ```env
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   REDIRECT_URI=http://localhost:3000/callback
   ```

4. **Run the Server:**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`.

## Usage

1. **Login Page**: Navigate to `http://localhost:3000` to start the login process with Spotify.
2. **Profile Page**: After logging in, view your profile information, top artists, top tracks, and favorite genres.

## Project Structure

- **public/**: Contains static files (HTML, CSS, JavaScript).
- **User.js**: A class managing user data.
- **spotifyFunctions.js**: Functions to fetch and manage user Spotify data.
- **index.js**: Main server file; integrates Express.js with the Spotify API.

## API Integrations

- **Spotify API**: Retrieves user details, top artists, top tracks, and favorite genres.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

