import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';

import authIcon from '../../assets/images/icons/header/64x64/auth_rose_900.png';

const mapStateToProps = (state) => {
    return ({
        isAuth: state.user.isAuth
    });
};

const AuthStatus = (props) => {
    console.log(props.isAuth)
    if (props.isAuth) {
        return (
            <NavLink to='/home' className="w-26 flex flex-row items-center gap-0 transition duration-100 ease-out hover:ease-in hover:drop-shadow rounded-full bg-rose-400 hover:bg-rose-300">
                <img src={authIcon} className='h-5 ml-3' />
                <p className="mt-1 mb-1 ml-1 mr-4 font-bold text-rose-900">
                    Logout
                </p>
            </NavLink>
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

const AuthStatusContainer = connect(mapStateToProps, {})(AuthStatus);
export default AuthStatusContainer;