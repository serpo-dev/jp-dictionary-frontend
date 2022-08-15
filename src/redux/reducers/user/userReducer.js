import userActionTypes from "./userActionTypes";
import userInitialState from './userInitialState';

export const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case userActionTypes.SET_USER:
            const payload = action.payload;
            return {
                ...state,
                user: {
                    ...state.user,
                    id: payload.id,
                    login: payload.login,
                    email: payload.email,
                    lang: payload.lang
                },
                personalInfo: {
                    ...state.personalInfo,
                },
                progress: {
                    ...state.progress,
                    level: payload.level
                }
            };
        case userActionTypes.SET_AUTH:
            return {
                ...state,
                isAuth: true,
                user: {
                    ...state.user,
                },
                personalInfo: {
                    ...state.personalInfo,
                },
                progress: {
                    ...state.progress,
                }
            };
        case userActionTypes.DROP_AUTH:
            return {
                ...userInitialState,
                isAuth: false,
                user: {
                    ...userInitialState.user,
                },
                personalInfo: {
                    ...userInitialState.personalInfo,
                },
                progress: {
                    ...userInitialState.progress,
                }
            };
        default:
            return state;
    };
};