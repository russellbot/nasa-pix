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

const initialStateSearch = {
    searchField: ''
}

export const searchPictures = (state=initialStateSearch, action={}) => {
    switch(action.type) {
        case CHANGE_SEARCH_FIELD:
            return { ...state, searchField: action.payload }
        default:
            return state;
    }
}

const initialStatePictures = {
    isPending: false,
    pictures: [],
    error: ''
}

export const requestPictures = (state=initialStatePictures, action={}) => {
    switch(action.type) {
        case REQUEST_PICTURES_PENDING:
            return { ...state, isPending: true };
        case REQUEST_PICTURES_SUCCESS:
            return { ...state, pictures: action.payload, isPending: false };
        case REQUEST_PICTURES_FAILED:
            return { ...state, error: action.payload, isPending: false };
        default:
            return state;
    }
}

const initialStateFavorites = {
    favorites: [],
    isAdded: false
}

export const favoritesReducer = (state=initialStateFavorites, action={}) => {
    switch(action.type) {
        case REQUEST_FAVORITES_EMPTY:
            return { ...state, favorites: [] };
        case REQUEST_FAVORITES_SUCCESS:
            return { ...state, favorites: action.payload };
        case ADD_FAVORITE:
            return { ...state, favorites: action.payload };
        default:
            return state;
    }
}

export const addedConfirmation = (state=initialStateFavorites, action={}) => {
    switch(action.type) {
        case SHOW_CONFIRMATION:
            return { ...state, isAdded: action.payload };
        default:
            return state;
    }
}

const initialStatePage = {
    page: 'home'
}

export const changePage = (state=initialStatePage, action={}) => {
    switch (action.type) {
        case FAVORITES_PAGE:
            return { ...state, page: action.payload };
        case HOME_PAGE:
            return { ...state, page: 'home'};
        default:
            return state;
    }
}