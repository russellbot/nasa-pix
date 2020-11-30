import React from 'react';

const Navigation = () => {
    return (
        <div className="navigation-container">
            <h1>Nasa Pictures</h1>
            <span className="navigation-items" id="resultsNav">
                <h3 className="clickable">Favorites</h3>
                <h3>&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;</h3>
                <h3 className="clickable">Load More</h3>
            </span>
        </div>
    )
}

export default Navigation;