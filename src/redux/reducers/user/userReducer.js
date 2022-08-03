import userActionTypes from "./userActionTypes";
import userInitialState from './userInitialState';

export const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case userActionTypes.SET_USER:
            const payload = action.payload;
            const newState = {
                ...state,
                isAuth: true,
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
            return newState;
        default:
            return state;
    };
};