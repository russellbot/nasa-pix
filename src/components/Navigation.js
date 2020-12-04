import React from 'react';
// import SearchBox from './SearchBox';

const Navigation = ({ loadmore, favorites }) => {
    return (
        <div className="navigation-container">
            <span className="background"></span>
            <span className="title"><h1>Nasa Pictures</h1></span>
            <span className="navigation-items" id="resultsNav">
                <h3 className="clickable" onClick={favorites}>Favorites</h3>
                <h3>&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;</h3>
                <h3 className="clickable" onClick={loadmore}>Load More</h3>
            </span>
            {/* <span className="searchbox"><SearchBox /></span> */}
        </div>
    )
}

export default Navigation;