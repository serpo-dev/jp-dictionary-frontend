import { userLogin, userRegistration } from './http/user'
import { setAuthActionCreator, setUserActionCreator } from '../redux/reducers/user/userActionCreators';

export const setUserLoginThunk = (login, email, password) => async (dispatch) => {
    const userData = await userLogin(login, email, password);
    if (userData) {
        dispatch(setUserActionCreator(userData));
        dispatch(setAuthActionCreator());
    } else {
        console.log(`setUserLoginThunk error`)
    };
};

export const setUserRegistrationThunk = (login, email, password) => async (dispatch) => {
    const userData = await userRegistration(login, email, password);
    if (userData) {
        dispatch(setUserActionCreator(userData));
        dispatch(setAuthActionCreator());
        console.log(userData)
    } else {
        console.log(`setUserRegistrationThunk error`)
    };
};