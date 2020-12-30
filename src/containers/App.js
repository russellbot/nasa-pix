import React from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Navigation from '../components/Navigation';
import Loader from '../components/Loader';
import Added from '../components/Added';

import { setSearchfield, requestPictures, requestFavorites, switchPageFavorites, switchPageHome, addFavorite, removeFavorite } from '../actions'

const mapStateToProps = state => {
    return {
        searchField: state.searchPictures.searchField,
        pictures: state.requestPictures.pictures,
        favorites: state.favoritesReducer.favorites,
        isAdded: state.addedConfirmation.isAdded,
        isPending: state.requestPictures.isPending,
        error: state.requestPictures.error, 
        page: state.changePage.page
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchfield(event.target.value)),
        onRequestPictures: () => dispatch(requestPictures()),
        onRequestFavorites: () => dispatch(requestFavorites()),
        changePageFavorites: () => dispatch(switchPageFavorites()),
        changePageHome: () => dispatch(switchPageHome()),
        saveFavorite: (picture) => dispatch(addFavorite(picture)),
        deleteFavorite: (picture) => dispatch(removeFavorite(picture))
    }
}

class App extends React.Component {

    componentDidMount() {
        this.props.onRequestFavorites();
        this.props.onRequestPictures();                 
    }
    
    render() {
        const { searchField, onSearchChange, pictures, favorites, isPending, changePageFavorites, isAdded, saveFavorite, deleteFavorite, page, onRequestPictures } = this.props;
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

        if (isPending) {
            return (
                <Loader />
            );
        } else if (this.props.page === 'home') {
            return (
                <div className="container">
                    <Navigation loadMore={onRequestPictures} loadFavorites={changePageFavorites}/>
                    <span className="searchbox"><SearchBox searchChange={onSearchChange} /></span>
                    <CardList pix={filterPictures(pictures)} saveFavorite={saveFavorite} searchWords={searchWords} />
                    <Added isAdded={isAdded} />
                </div>        
            );
        } else if (this.props.page === 'favorites') {
            return (
                <div className="container">
                    <Navigation loadMore={onRequestPictures} loadFavorites={changePageFavorites}/>
                    <span className="searchbox"><SearchBox searchChange={onSearchChange} /></span>
                    <CardList pix={filterPictures(favorites)} removeFavorite={deleteFavorite} searchWords={searchWords} page={page} />
                </div>
            ); 
        }             
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);