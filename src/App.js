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

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render() {
        const filteredPictures = this.state.pictures.filter(pic => {
            return pic.title.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        return (
            <div className="container">
                <h1>Nasa Pictures</h1>
                <span className="navigation-items" id="resultsNav">
                    <h3 className="clickable">Favorites</h3>
                    <h3>&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;</h3>
                    <h3 className="clickable">Load More</h3>
                </span>
                <SearchBox searchChange={this.onSearchChange} />
                <CardList pix={filteredPictures} />
            </div>        
        );
    }    
}

export default App;