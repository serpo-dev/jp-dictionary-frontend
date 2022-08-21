import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';

import authIcon from '../../../assets/images/icons/header/64x64/auth_rose_900.png';
import { userLogoutThunk } from "../../../asyncActions/userThunks";

import messagesIcon from '../../../assets/images/icons/header/64x64/messages_pink.png';
import profileIcon from '../../../assets/images/icons/header/64x64/profile_pink.png';
import settingsIcon from '../../../assets/images/icons/header/64x64/settings_pink.png';
import logoutIcon from '../../../assets/images/icons/header/64x64/auth_pink.png';


const mapStateToProps = (state) => {
    return {
        isAuth: state.user.isAuth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userLogout: () => dispatch(userLogoutThunk()),
    };
};


const AuthStatus = (props) => {
    if (props.isAuth) {
        return (
            <div className="flex flex-row">
                <div className='mr-6 self-center'>
                    <img src={profileIcon} className='h-7 cursor-pointer' />
                </div>
                <div className='mr-6 self-center'>
                    <img src={messagesIcon} className='h-7 cursor-pointer' />
                </div>
                <div className='mr-6 self-center'>
                    <img src={settingsIcon} className='h-7 cursor-pointer' />
                </div>
                <div>
                    <img src={logoutIcon} onClick={props.userLogout} className='h-7 cursor-pointer' />
                </div>
            </div>
        );
    } else {
        return (
            <NavLink to='/auth' className="w-24 flex flex-row items-center gap-0 transition duration-100 ease-out hover:ease-in hover:drop-shadow rounded-full bg-rose-400 hover:bg-rose-300">
                <img src={authIcon} className='h-5 ml-3' />
                <p className="mt-1 mb-1 ml-1 mr-4 font-bold text-rose-900">
                    Login
                </p>
            </NavLink>
        );
    };
};

const AuthStatusContainer = connect(mapStateToProps, mapDispatchToProps)(AuthStatus);
export default AuthStatusContainer;