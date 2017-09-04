import { SET_BALANCE, SET_OF_100, SET_OF_50, SET_OF_20, ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/actionTypes";

export function setBalance(newSum) {
    return {
        type: SET_BALANCE,
        payload: {
            balance: newSum
        }
    }
}

export function setOf100(count) {
    return {
        type: SET_OF_100,
        payload: {
            count_of_100: count
        }
    }
}

export function setOf50(count) {
    return {
        type: SET_OF_50,
        payload: {
            count_of_50: count
        }
    }
}

export function setOf20(count) {
    return {
        type: SET_OF_20,
        payload: {
            count_of_20: count
        }
    }
}

export function showModalError(error) {
    return {
        type: ERROR_MESSAGE,
        payload: {
            showModalError: error
        }
    }
}

export function showModalSuccess(success) {
    return {
        type: SUCCESS_MESSAGE,
        payload: {
            showModalSuccess: success
        }
    }
}