
function setUserDetails(user,json){
    user.setName(json.display_name);
    user.setEmail(json.email);
    user.setprofileUrl(json.external_urls.spotify);
};

function setUsersTopItems(user,json){
    json.items.forEach(item => {
        item.genres.forEach(genre =>{
            user.addGenre(genre);
        })
        user.addArtist(item.name);
    });

};

export {setUserDetails,setUsersTopItems};

