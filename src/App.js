import React from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import { pix } from './pix.js'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            pictures: pix,
            searchfield: '',
        }
    }
    render() {
        return (
            <div>
                <h1>Nasa Pictures</h1>
                <SearchBox />
                <CardList pix={this.state.pictures} />
            </div>        
        );
    }    
}

export default App;