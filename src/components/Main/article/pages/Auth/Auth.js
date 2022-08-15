import React from 'react';
import { NavLink } from 'react-router-dom';
import stylesheet from './Auth.module.css';

const Login = (props) => {

    return (
        <div className={stylesheet.disable_text_selection}>
            <span className='grid grid-cols-1 gap-3 items-center justify-items-center'>
                <h2 className='font-bold mb-4 mt-4'>Hi! Who are you?</h2>
                <NavLink to='login' className='w-full h-fit flex flex-row justify-center items-center gap-0 transition duration-50 ease-out hover:ease-in  rounded-full bg-rose-300 hover:bg-rose-200'>
                    <p className='ml-5 mr-5 mt-2 mb-2 text-lg text-center font-semibold'>
                        I'm already a potato.
                    </p>
                </NavLink>
                <NavLink to='registration' className='w-full h-fit flex flex-row justify-center items-center gap-0 transition duration-50 ease-out hover:ease-in  rounded-full bg-rose-300 hover:bg-rose-200'>
                    <p className='ml-5 mr-5 mt-2 mb-2 text-lg text-center font-semibold'>
                        I'm a newbie!
                    </p>
                </NavLink>
            </span>
        </div>
    )
};

export default Login;