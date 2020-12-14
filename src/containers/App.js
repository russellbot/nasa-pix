import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Navigation from '../components/Navigation';
import Loader from '../components/Loader';
import Added from '../components/Added';

function App() {
    // constructor() {
    //     super()
    //     this.state = {
    //         pictures: [],
    //         favorites: [],
    //         page: 'home',
    //         isAdded: false,
    //         searchfield: '',
    //     }
    // }
    const [pictures, setPictures] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [page, setPage] = useState('home');
    const [isAdded, setIsAdded] = useState(false);
    const [searchfield, setSearchfield] = useState('');

    // componentDidMount() {
    //     this.loadFavorites();
    //     this.loadMorePictures();                  
    // }

    const onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    const loadMorePictures = () => {
        this.setState({ page: 'home' })
        const count = 10;
        const apiKey = 'DEMO_KEY';
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(newPics => this.setState({ pictures: newPics}));
    }

    const loadFavorites = () => {
        if(localStorage.getItem('nasaFavorites')) {
            this.setState({ favorites: JSON.parse(localStorage.getItem('nasaFavorites'))}) 
        }
    }

    const loadFavoritesPage = () => {
        this.setState({ page: 'favorites' })
    }

    const saveFavorite = (picture) => {
        let { favorites } = this.state;
        // check if picture already exists in favorites
        if(!favorites.includes(picture.object)) {
            // add picture to favorites array
            favorites.push(picture.object)
            this.setState({favorites: favorites})
            // Show save confirmation for 2 seconds
            this.setState({isAdded: true})
            setTimeout(() => {
                this.setState({isAdded: false})
            }, 2000);
        }
        // Set favorites in localStorage
        localStorage.setItem('nasaFavorites', JSON.stringify(favorites));       
    }

    const removeFavorite = (picture) => {
        let { favorites } = this.state;
        let index = favorites.indexOf(picture.object);
        if (index !== -1) {
            favorites.splice(index, 1);
            this.setState({favorites: favorites})
            localStorage.setItem('nasaFavorites', JSON.stringify(this.state.favorites));
        }        
    }

    
        const { pictures, searchfield, favorites, page, isAdded } = this.state;

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
                <Navigation loadMore={loadMorePictures} loadFavorites={loadFavoritesPage}/>
                <span className="searchbox"><SearchBox searchChange={onSearchChange} /></span>
                <CardList pix={filteredPictures} saveFavorite={saveFavorite} searchWords={searchWords} />
                <Added isAdded={isAdded} />
            </div>        
        );
    } else if (this.state.page === 'favorites') {
        return (
            <div className="container">
                <Navigation loadMore={loadMorePictures} loadFavorites={loadFavoritesPage}/>
                <span className="searchbox"><SearchBox searchChange={onSearchChange} /></span>
                <CardList pix={favorites} removeFavorite={removeFavorite} searchWords={searchWords} page={page} />
            </div>
        ); 
    }             
}

export default App;