import React from 'react';
import { useState } from 'react';
import { setUserLoginThunk } from '../../../../../asyncActions/userThunks';
import { useDispatch } from 'react-redux/es/exports';
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';

const mapStateToProps = (state) => {
    return ({
        isAuth: state.user.isAuth
    });
};

const Login = (props) => {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState();
    const [password, setPassword] = useState();
    const login = nickname;
    const email = null;

    const dispatch = useDispatch();
    const click = () => {
        dispatch(setUserLoginThunk(login, email, password));
    };

    if (props.isAuth) {
        navigate('/home');
    } else {
        return (
            <div>
                <div className='grid grid-cols-1 gap-2 mt-0 mb-4 items-center justify-items-center'>
                    <span className='col-span-1 mb-0 mt-4 w-full'>
                        <span className='grid grid-cols-9 gap-3 items-center justify-items-center'>
                            <h2 className='col-span-3 font-bold mr-2 w-fit justify-self-end'>Login | Email</h2>
                            <input onChange={e => setNickname(e.target.value)} value={nickname} className='col-span-4 w-full h-8 rounded-full text-center'></input>
                            <div className='col-span-2'></div>
                        </span>
                    </span>
                    <span className='col-span-1 mb-4 mt-0 w-full'>
                        <span className='grid grid-cols-9 gap-3 items-center justify-items-center'>
                            <h2 className='col-span-3 font-bold  mr-2 w-fit justify-self-end'>Password</h2>
                            <input onChange={e => setPassword(e.target.value)} value={password} type='password' className='col-span-4 w-full h-8 rounded-full text-center'></input>
                            <div className='col-span-2'></div>
                        </span>
                    </span>
                    <div className='col-span-1'>
                        <button onClick={click} className='min-w-fit max-w-lg h-fit flex flex-row justify-center items-center gap-0 transition duration-50 ease-out hover:ease-in  rounded-full bg-rose-300 hover:bg-rose-200'>
                            <p className='ml-5 mr-5 mt-2 mb-2 text-lg font-semibold'>
                                Sign in
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        )
    }   
};

const LoginContainer = connect(mapStateToProps)(Login);
export default LoginContainer;