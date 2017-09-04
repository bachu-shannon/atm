import { SET_BALANCE, SET_OF_100, SET_OF_50, SET_OF_20, ERROR_MESSAGE, SUCCESS_MESSAGE } from '../constants/actionTypes';

const initialState = {
    balance: 1000,
    default_100: 100,
    default_50: 50,
    default_20: 20,
    count_of_100: 0,
    count_of_50: 0,
    count_of_20: 0,
    showModalError: false,
    showModalSuccess: false
};

export default function atm(state = initialState, action) {
    switch(action.type) {
        case SET_BALANCE:
            return {
                ...state,
                balance: action.payload.balance,
            };
        case SET_OF_100:
            return {
                ...state,
                count_of_100: action.payload.count_of_100,
            };
        case SET_OF_50:
            return {
                ...state,
                count_of_50: action.payload.count_of_50,
            };
        case SET_OF_20:
            return {
                ...state,
                count_of_20: action.payload.count_of_20,
            };
        case ERROR_MESSAGE:
            return {
                ...state,
                showModalError: action.payload.showModalError,
            };
        case SUCCESS_MESSAGE:
            return {
                ...state,
                showModalSuccess: action.payload.showModalSuccess,
            };
        default:
            return state;
    }
}