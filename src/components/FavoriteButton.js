import React from 'react';

const FavoriteButton = (props) => {
    const { saveFavorite, removeFavorite, object } = props;
    if (this.state.page === 'favorites') {
        return (<p className="clickable" onClick={() => removeFavorite({object})}>Delete from Favorites</p>);
    } else {
        return(<p className="clickable" onClick={() => saveFavorite({object})}>Add to Favorites</p>);
    }
}

export default FavoriteButton;