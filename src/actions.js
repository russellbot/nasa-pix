import {
    CHANGE_SEARCH_FIELD,
    REQUEST_PICTURES_PENDING,
    REQUEST_PICTURES_SUCCESS,
    REQUEST_PICTURES_FAILED
} from './constants.js';

export const setSearchfield = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: text
})

export const requestPictures = (dispatch) => {
    dispatch({ type: REQUEST_PICTURES_PENDING});
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=10')
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_PICTURES_SUCCESS, payload: data }))
    .catch(error => dispatch({ tyep: REQUEST_PICTURES_FAILED, payload: error }))
}