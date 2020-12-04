import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Navigation from '../components/Navigation';
import Loader from '../components/Loader';
// import "./loaf-rocket-1.svg";

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            pictures: [],
            favorites: [],
            page: 'home',
            searchfield: '',
        }
    }

    componentDidMount() {
        this.loadMorePictures();
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    loadMorePictures = () => {
        this.setState({ page: 'home' })
        const count = 10;
        const apiKey = 'DEMO_KEY';
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(newPics => this.setState({ pictures: newPics}));
    }

    loadFavorites = () => {
        if(localStorage.getItem('nasaFavorites')) {
            this.setState({ favorites: JSON.parse(localStorage.getItem('nasaFavorites'))}) 
        }
        this.setState({ page: 'favorites' })
    }

    saveFavorite = (pic) => {
        // add picture to favorites array
        this.setState(prevState => ({
            favorites: [...prevState.favorites, pic.object]
        }))
        localStorage.setItem('nasaFavorites', JSON.stringify(this.state.favorites));
    }

    render() {
        const { pictures, searchfield, favorites } = this.state;
        const filteredPictures = this.state.pictures.filter(pic => {
            // Account for pictures without copyright information
            if (!pic.copyright) {pic.copyright = '';}
            // Return pictures with tite, explanation, or copyright that match the searchbox            
            return (
                pic.title.toLowerCase().includes(searchfield.toLowerCase()) || 
                pic.explanation.toLowerCase().includes(searchfield.toLowerCase()) || 
                pic.copyright.toLowerCase().includes(searchfield.toLowerCase())
            );
        })
        const searchWords = searchfield;
        if (!pictures.length) {
            return (
                <Loader />
            );
        } else if (this.state.page === 'home') {
            return (
                <div className="container">
                    <Navigation loadmore={this.loadMorePictures} favorites={this.loadFavorites}/>
                    <span className="searchbox"><SearchBox searchChange={this.onSearchChange} /></span>
                    <CardList pix={filteredPictures} saveFavorite={this.saveFavorite} searchWords={searchWords} />
                </div>        
            );
        } else if (this.state.page === 'favorites') {
            return (
                <div className="container">
                    <Navigation loadmore={this.loadMorePictures} favorites={this.loadFavorites}/>
                    <span className="searchbox"><SearchBox searchChange={this.onSearchChange} /></span>
                    <CardList pix={favorites} searchWords={searchWords} />
                </div>
            ); 
        }      
    }    
}

export default App;