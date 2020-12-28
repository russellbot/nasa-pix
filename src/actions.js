import {
    CHANGE_SEARCH_FIELD,
    REQUEST_PICTURES_PENDING,
    REQUEST_PICTURES_SUCCESS,
    REQUEST_PICTURES_FAILED,
    REQUEST_FAVORITES_SUCCESS,
    REQUEST_FAVORITES_EMPTY,
    FAVORITES_PAGE,
    HOME_PAGE
} from './constants.js';

export const setSearchfield = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: text
})

export const requestPictures = () => (dispatch) => {
    dispatch({ type: REQUEST_PICTURES_PENDING});
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=10')
        .then(response => response.json())
        .then(data => dispatch({ type: REQUEST_PICTURES_SUCCESS, payload: data }))
        .catch(error => dispatch({ tyep: REQUEST_PICTURES_FAILED, payload: error }))
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