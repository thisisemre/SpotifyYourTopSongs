let user = null;

async function getPerson() {
    try {
        const response = await fetch("/api/person");
        
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        
        user = await response.json();
        console.log(user);
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}

getPerson().then(()=>{
    document.getElementById("username").innerText = user.name;
    document.getElementById("profile-image").src = user.imageUrl;
    const artistList = document.getElementById("top-artists");
    const genreList = document.getElementById("top-genres");
    const trackList = document.getElementById("top-tracks");
    const recommendedList = document.getElementById("recommended-tracks");

    artistList.innerHTML = "";
    genreList.innerHTML = "";
    trackList.innerHTML = "";
    
    user.topArtists.forEach((artist) => {
        const li = document.createElement("li");
        li.innerText = artist;
        artistList.appendChild(li);
    });
    user.topGenres.forEach((genre) => {
        const li = document.createElement("li");
        li.innerText = genre;
        genreList.appendChild(li);
    });
    user.topTracks.forEach((track) => {
        const li = document.createElement("li");
        li.innerText = track;
        trackList.appendChild(li);
    });

    


});

