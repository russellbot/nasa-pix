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
        setSearchfield(event.target.value)
    }

    const loadMorePictures = () => {
        setPage('home');
        const count = 10;
        const apiKey = 'DEMO_KEY';
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(newPics => setPictures(newPics));
    }

    const loadFavorites = () => {
        if(localStorage.getItem('nasaFavorites')) {
            setFavorites(JSON.parse(localStorage.getItem('nasaFavorites'))) 
        }
    }

    const loadFavoritesPage = () => {
        setPage(favorites);
    }

    const saveFavorite = (picture) => {
        let newFavorites = favorites;
        // check if picture already exists in favorites
        if(!newFavorites.includes(picture.object)) {
            // add picture to favorites array
            newFavorites.push(picture.object)
            setFavorites(newFavorites);
            // Show save confirmation for 2 seconds
            setIsAdded(true);
            setTimeout(() => {
                setIsAdded(false);
            }, 2000);
        }
        // Set favorites in localStorage
        localStorage.setItem('nasaFavorites', JSON.stringify(favorites));       
    }

    const removeFavorite = (picture) => {
        let newFavorites = favorites
        let index = newFavorites.indexOf(picture.object);
        if (index !== -1) {
            newFavorites.splice(index, 1);
            setFavorites(newFavorites);
            localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
        }        
    }
    
    const filteredPictures = pictures.filter(pic => {
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
    } else if (page === 'home') {
        return (
            <div className="container">
                <Navigation loadMore={loadMorePictures} loadFavorites={loadFavoritesPage}/>
                <span className="searchbox"><SearchBox searchChange={onSearchChange} /></span>
                <CardList pix={filteredPictures} saveFavorite={saveFavorite} searchWords={searchWords} />
                <Added isAdded={isAdded} />
            </div>        
        );
    } else if (page === 'favorites') {
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