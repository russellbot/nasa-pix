import {
    CHANGE_SEARCH_FIELD,
    REQUEST_PICTURES_PENDING,
    REQUEST_PICTURES_SUCCESS,
    REQUEST_PICTURES_FAILED,
    REQUEST_FAVORITES_SUCCESS,
    REQUEST_FAVORITES_EMPTY,
    FAVORITES_PAGE,
    HOME_PAGE,
    ADD_FAVORITE,
    SHOW_CONFIRMATION
} from './constants.js';

export const setSearchfield = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: text
})

export const requestPictures = () => (dispatch) => {
    dispatch({ type: REQUEST_PICTURES_PENDING});
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=10')
        .then(response => response.json())
        .then(data => {
            dispatch({ type: REQUEST_PICTURES_SUCCESS, payload: data }); 
            dispatch({ type: HOME_PAGE, payload: 'home' });
        })
        .catch(error => dispatch({ type: REQUEST_PICTURES_FAILED, payload: error }))
}

export const requestFavorites = () => (dispatch) => {
    if(localStorage.getItem('nasaFavorites')) {
        let newFavorites = JSON.parse(localStorage.getItem('nasaFavorites'));
        dispatch({ type: REQUEST_FAVORITES_SUCCESS, payload: newFavorites })
    } else {
        dispatch({ type: REQUEST_FAVORITES_EMPTY, payload: [] })
    }
}

export const switchPageFavorites = () => ({
    type: FAVORITES_PAGE,
    payload: 'favorites'
})

export const switchPageHome = () => ({
    type: HOME_PAGE, 
    payload: 'home'
});

export const addFavorite = (picture) => (dispatch) => {
    let newFavorites = JSON.parse(localStorage.getItem('nasaFavorites'));
    console.log('favorites', newFavorites);
    console.log('picture.object', picture.object);
    console.log(!newFavorites.includes(picture.object));
    if(!newFavorites.includes(picture.object)) {
        // add picture to favorites array
        console.log(Array.isArray(newFavorites));
        newFavorites.push(picture.object);
        dispatch({ type: ADD_FAVORITE, payload: newFavorites })
        // Set favorites in localStorage
        localStorage.setItem('nasaFavorites', JSON.stringify(newFavorites));
        // Show save confirmation for 2 seconds
        dispatch({ type: SHOW_CONFIRMATION, payload: true })
        setTimeout(() => {
            dispatch({ type: SHOW_CONFIRMATION, payload: false })
        }, 2000);
    }
}