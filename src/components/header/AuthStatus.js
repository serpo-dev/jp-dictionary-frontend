import React from "react";
import { NavLink } from "react-router-dom";

const AuthStatus = (props) => {
    return (
        <div className="flex flex-row gap-2">
            <NavLink to='/login' className="transition duration-100 ease-out hover:ease-in hover:drop-shadow rounded-lg bg-rose-400 hover:bg-rose-300">
                <p className="mt-1 mb-1 ml-3 mr-3 font-bold text-rose-900">
                    Login
                </p>
            </NavLink>
            <NavLink to='/registration' className="transition duration-100 ease-out hover:ease-in hover:drop-shadow rounded-lg bg-rose-400 hover:bg-rose-300">
                <p className="mt-1 mb-1 ml-3 mr-3 font-bold text-rose-900">
                    Registration
                </p>
            </NavLink>

        </div>
    );
};

export default AuthStatus;