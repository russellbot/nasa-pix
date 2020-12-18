import { CHANGE_SEARCH_FIELD } from './constants.js';

const initialState = {
    searchField: ''
}

export const searchPictures = (state=initialState, action={}) => {
    switch(action.type) {
        case CHANGE_SEARCH_FIELD:
            return { ...state, searchField: action.payload }
        default:
            return state;
    }
}