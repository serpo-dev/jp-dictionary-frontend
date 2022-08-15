import React from "react";
import { NavLink } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';

import authIcon from '../../../assets/images/icons/header/64x64/auth_rose_900.png';

import { dropAuthActionCreator } from "../../../redux/reducers/user/userActionCreators";

const mapStateToProps = (state) => {
    return {
        isAuth: state.user.isAuth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dropAuth: () => dispatch(dropAuthActionCreator()),
    };
};


const AuthStatus = (props) => {
    if (props.isAuth) {
        return (
            <button onClick={props.dropAuth} className="w-26 flex flex-row items-center gap-0 transition duration-100 ease-out hover:ease-in hover:drop-shadow rounded-full bg-rose-400 hover:bg-rose-300">
                <img src={authIcon} className='h-5 ml-3' />
                <p className="mt-1 mb-1 ml-1 mr-4 font-bold text-rose-900">
                    Logout
                </p>
            </button>
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