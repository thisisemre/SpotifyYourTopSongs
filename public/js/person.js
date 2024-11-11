let user = null;

async function fetchUserData() {
    try {
        const response = await fetch('/api/person');
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        updateUI(userData);
    } catch (error) {
        console.error('Error:', error);
    }
}

function updateUI(userData) {
    // Update profile information
    document.getElementById('profile-image').src = userData.imageUrl;
    document.getElementById('user-name').textContent = userData.name;
    document.getElementById('user-email').textContent = userData.email;

    // Update genres
    const genreList = document.querySelector('.genre-list');
    genreList.innerHTML = userData.topGenres
        .map(genre => `<li class="genre-item">${genre}</li>`)
        .join('');

    // Update top artists
    const artistsList = document.getElementById('top-artists');
    artistsList.innerHTML = userData.topArtists
        .map(artist => `<li class="track-item">${artist}</li>`)
        .join('');

    // Update top tracks
    const tracksList = document.getElementById('top-tracks');
    tracksList.innerHTML = userData.topTracks
        .map(track => `<li class="track-item">${track}</li>`)
        .join('');
}

// Call this when the page loads
fetchUserData();

