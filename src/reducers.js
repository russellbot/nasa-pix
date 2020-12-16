import { CHANGE_SEARCH_FIELD } from './constants.js';

const initialState = {
    searchfield: ''
}

export const searchPictures = (state=initialState, action={}) => {
    switch(action.type) {
        case CHANGE_SEARCH_FIELD:
            return { ...state, searchfield: action.payload }
        default:
            return state;
    }
}