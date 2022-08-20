import userActionTypes from "./userActionTypes";

export const setAuthActionCreator = () => ({
    type: userActionTypes.SET_AUTH
});

export const setUserActionCreator = (userData) => ({
    type: userActionTypes.SET_USER,
    payload: userData
});

export const removeUserActionCreator = () => ({
    type: userActionTypes.REMOVE_USER
});