import {
    CHANGE_SEARCH_FIELD,
    REQUEST_PICTURES_PENDING,
    REQUEST_PICTURES_SUCCESS,
    REQUEST_PICTURES_FAILED
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