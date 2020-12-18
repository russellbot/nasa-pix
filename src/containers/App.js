import React from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Navigation from '../components/Navigation';
import Loader from '../components/Loader';
import Added from '../components/Added';

import { setSearchfield } from '../actions'

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchfield(event.target.value))
    }
}

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            pictures: [],
            favorites: [],
            page: 'home',
            isAdded: false,
            searchfield: '',
        }
    }
    // const [pictures, setPictures] = useState([]);
    // const [favorites, setFavorites] = useState([]);
    // const [page, setPage] = useState('home');
    // const [isAdded, setIsAdded] = useState(false);
    // const [searchfield, setSearchfield] = useState('');

    componentDidMount() {
        this.loadFavorites();
        this.loadMorePictures();                  
    }
    // useEffect(() => {
    //     loadMorePictures();
    //     loadFavorites();  
    // },[])

    // const onSearchChange = (event) => {
    //     setSearchfield(event.target.value)
    // }

    loadMorePictures = () => {
        this.setState({ page: 'home' });
        const count = 10;
        const apiKey = 'DEMO_KEY';
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(newPics => {this.setState({ pictures: newPics})});
    }

    loadFavorites = () => {
        if(localStorage.getItem('nasaFavorites')) {
            let newFavorites = JSON.parse(localStorage.getItem('nasaFavorites'));
            this.setState({ favorites: newFavorites });
        }
    }

    saveFavoritesLocalStorage = () => {
        localStorage.setItem('nasaFavorites', JSON.stringify(this.state.favorites));
    }

    loadFavoritesPage = () => {
        this.setState({ page: 'favorites' })
        this.loadFavorites();
    }

    saveFavorite = (picture) => {
        let newFavorites = this.state.favorites;
        // check if picture already exists in favorites
        if(!newFavorites.includes(picture.object)) {
            // add picture to favorites array
            newFavorites.push(picture.object)
            this.setState({ favorites: newFavorites });
            // Show save confirmation for 2 seconds
            this.setState({ isAdded: true });
            setTimeout(() => {
                this.setState({ isAdded: false });
            }, 2000);
        }
        // Set favorites in localStorage
        localStorage.setItem('nasaFavorites', JSON.stringify(this.state.favorites));       
    }

    removeFavorite = (picture) => {
        let newFavorites = this.state.favorites
        let index = newFavorites.indexOf(picture.object);
        if (index !== -1) {
            newFavorites.splice(index, 1);
            this.setState({ favorites: newFavorites });
            this.saveFavoritesLocalStorage();
            this.loadFavorites();
        }        
    }
    
    render() {
        const { searchField, onSearchChange } = this.props;
        const searchWords = searchField;   

        const filterPictures = (array) => array.filter(pic => {
            // Account for pictures without copyright information
            if (!pic.copyright) {pic.copyright = '';}
            // Return pictures with tite, explanation, or copyright that match the searchbox            
            return (
                pic.title.toLowerCase().includes(searchField.toLowerCase()) || 
                pic.explanation.toLowerCase().includes(searchField.toLowerCase()) || 
                pic.copyright.toLowerCase().includes(searchField.toLowerCase())
            );
        })

        if (!this.state.pictures.length) {
            return (
                <Loader />
            );
        } else if (this.state.page === 'home') {
            return (
                <div className="container">
                    <Navigation loadMore={this.loadMorePictures} loadFavorites={this.loadFavoritesPage}/>
                    <span className="searchbox"><SearchBox searchChange={onSearchChange} /></span>
                    <CardList pix={filterPictures(this.state.pictures)} saveFavorite={this.saveFavorite} searchWords={searchWords} />
                    <Added isAdded={this.state.isAdded} />
                </div>        
            );
        } else if (this.state.page === 'favorites') {
            return (
                <div className="container">
                    <Navigation loadMore={this.loadMorePictures} loadFavorites={this.loadFavoritesPage}/>
                    <span className="searchbox"><SearchBox searchChange={onSearchChange} /></span>
                    <CardList pix={filterPictures(this.state.favorites)} removeFavorite={this.removeFavorite} searchWords={searchWords} page={this.state.page} />
                </div>
            ); 
        }             
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);