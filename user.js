
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
        this.topArtists.push(artist);
    };

    getTracks() {
        return this.topTracks;
    }
    addTracks(track) {
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
        return `Name: ${this.name}<br>
        Email: ${this.email}<br>
        Profile URL: ${this.profileUrl}<br>
        Top Genres: ${this.topGenres.join(', ')}<br>
        Top Artists: ${this.topArtists.join(', ')}<br>
        Top Tracks: ${this.topTracks.join(', ')}`;
    }
    

}

export default User;