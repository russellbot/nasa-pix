import React from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Navigation from './Navigation';
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
                <Navigation />
                <span className="searchbox"><SearchBox searchChange={this.onSearchChange} /></span>
                <CardList pix={filteredPictures} />
            </div>        
        );
    }    
}

export default App;