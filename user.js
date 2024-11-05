
class User {
    constructor(name = '', email = '', url = '') {
        this.name = name;
        this.email = email;
        this.profileUrl = url;
        this.topGenres = [];
        this.topArtists = [];
        this.topTracks = [];
    }

    getGenres() {
        return this.topGenres;
    }

    addGenre(genre) {
        if(!this.topGenres.includes(genre)){
            this.topGenres.push(genre);
        }   
    }

    getArtists() {
        return this.topArtists;
    }
    addArtist(artist) {
        if(!this.topArtists.includes(artist)){
            this.topArtists.push(artist);
        }
        
    };

    getTracks() {
        return this.topTracks;
    }
    addTrack(track) {
        this.topTracks.push(track);
    }

    getName() {
        return this.name;
    }
    
    setName(name) {
        this.name = name;
    }
    
    getEmail() {
        return this.email;
    }
    
    setEmail(email) {
        this.email = email;
    }
    
    getprofileUrl() {
        return this.url;
    }
    
    setprofileUrl(url) {
        this.profileUrl = url;
    }

    toString() {
        return `
            <div>
                <strong>Name:</strong> ${this.name}<br>
                <strong>Email:</strong> ${this.email}<br>
                <strong>Profile URL:</strong> <a href="${this.profileUrl}" target="_blank">${this.profileUrl}</a><br>
                <strong>Top Genres:</strong>
                <ul>
                    ${this.topGenres.map(genre => `<li>${genre}</li>`).join('')}
                </ul>
                <strong>Top Artists:</strong>
                <ul>
                    ${this.topArtists.map(artist => `<li>${artist}</li>`).join('')}
                </ul>
                <strong>Top Tracks:</strong>
                <ul>
                    ${this.topTracks.map(track => `<li>${track}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    
    

}

export default User;