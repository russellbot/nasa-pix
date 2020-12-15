import React from 'react';

const Added = ({ isAdded }) => {
    if (isAdded) {
        return (
            <div className="save-confirmed">
                <h1>ADDED!</h1>
            </div>
        );
    } else {
        return (<div></div>);
    }       
}

export default Added;