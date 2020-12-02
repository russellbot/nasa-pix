import React from 'react';
import loaderPic from './loaf-rocket-1.svg';
import './Loader.css';

const Loader = () => {
    return (
        <div className="loader">
            <img src={loaderPic} alt="Rocket Loading Animation"></img>
        </div>
    );
}

export default Loader;