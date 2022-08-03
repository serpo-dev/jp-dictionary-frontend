import { userLogin, userRegistration } from './http/user'
import { setUserActionCreator } from '../redux/reducers/user/userActionCreators';

export const setUserLoginThunk = (login, email, password) => async (dispatch) => {
    const userData = await userLogin(login, email, password);
    if (userData) {
        dispatch(setUserActionCreator(userData));
    } else {
        console.log(`setUserThunk error`)
    };
};

export const setUserRegistrationThunk = (login, email, password) => async (dispatch) => {
    const userData = await userRegistration(login, email, password);
    if (userData) {
        dispatch(setUserActionCreator(userData));
        console.log(userData)
    } else {
        console.log(`setUserThunk error`)
    };
};