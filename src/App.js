import React from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Navigation from './Navigation';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            pictures: [],
            searchfield: '',
        }
    }

    componentDidMount() {
        // NASA API
        const count = 10;
        const apiKey = 'DEMO_KEY';
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(newPics => this.setState({ pictures: newPics}));
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render() {
        const filteredPictures = this.state.pictures.filter(pic => {
            // Account for pictures without copyright information
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