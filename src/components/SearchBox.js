import React from 'react';

const SearchBox = ({ searchfield, searchChange }) => {
    return (
        <div className='searchbox'>
            <input 
            type='search' 
            placeholder='search pictures'
            onChange={searchChange} 
            />
        </div>        
    )
}

export default SearchBox;