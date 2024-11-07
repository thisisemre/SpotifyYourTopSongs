
class User {
    constructor(name = '', email = '', url = '') {
        this.name = name;
        this.email = email;
        this.profileUrl = url;
        this.topGenres = [];
        this.topArtists = [];
        this.topTracks = [];
        this.imageUrl = "";
    }

    getImageUrl() {
        return this.imageUrl;
    }

    setImageUrl(imageUrl) {
        this.imageUrl = imageUrl;
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
    toJSON() {
        return {
            name: this.name,
            email: this.email,
            profileUrl: this.profileUrl,
            topGenres: this.topGenres,
            topArtists: this.topArtists,
            topTracks: this.topTracks,
            imageUrl: this.imageUrl
        };
    }
    
    
    

}

export default User;