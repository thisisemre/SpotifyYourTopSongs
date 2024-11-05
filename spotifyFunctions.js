
function setUserDetails(user,json){
    user.setName(json.display_name);
    user.setEmail(json.email);
    user.setprofileUrl(json.external_urls.spotify);
};

function setUsersTopArtist(user,json){
    json.items.forEach(item => {
        item.genres.forEach(genre =>{
            user.addGenre(genre);
        })
        user.addArtist(item.name);
    });

};

function setUsersTopTracks(user,json){
    
    json.items.forEach(item => {
        let artistName = "";

        item.artists.forEach(artist =>{
            user.addArtist(artist.name);
            artistName +=  artist.name;
            
        })
        user.addTrack(item.name+" by: "+artistName);
        
    });
}


export {setUserDetails,setUsersTopArtist,setUsersTopTracks};

