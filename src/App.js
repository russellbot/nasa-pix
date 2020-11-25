import React from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import { pix } from './pix.js'

const App = () => {
    return (
        <div>
            <h1>Nasa Pictures</h1>
            <SearchBox />
            <CardList pix={pix} />
        </div>        
    );
}

export default App;