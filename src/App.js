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
            // Account for pictures with not copyright information
            if (!pic.copyright) {
                pic.copyright = '';
            }
            // Return pictures with tite, explanation, or copyright that match the searchbox
            return (
                pic.title.toLowerCase().includes(this.state.searchfield.toLowerCase()) || 
                pic.explanation.toLowerCase().includes(this.state.searchfield.toLowerCase()) || 
                pic.copyright.toLowerCase().includes(this.state.searchfield.toLowerCase())
            );
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