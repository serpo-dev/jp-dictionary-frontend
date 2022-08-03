import { $authHost, $host } from "./index";
import jwt_decode from 'jwt-decode';

export const userLogin = async (login, email, password) => {
    try {
        const response = await $host.post(
            'api/user/login',
            {
                login,
                email,
                password
            }
        );
        const dataDecoded = jwt_decode(response.data.token);
        localStorage.setItem('token', response.data.token);
        return dataDecoded;
    } catch (err) {
        console.log(`Incorrect login/email/password. Error:`, err)
        return null;
    };
};

export const userRegistration = async (login, email, password) => {
    try {
        const response = await $host.post(
            'api/user/registration',
            {
                login,
                email,
                password
            }
        );
        const dataDecoded = jwt_decode(response.data.token);
        localStorage.setItem('token', response.data.token);
        return dataDecoded;
    } catch (err) {
        console.log(`Registration is failed. Error:`, err)
        return null;
    };
};

export const userCheckAuth = async () => {
    const response = await $authHost.get('api/user/auth');
    const dataDecoded = jwt_decode(response.data.token);
    localStorage.setItem('token', response.data.token);
    return dataDecoded;
};