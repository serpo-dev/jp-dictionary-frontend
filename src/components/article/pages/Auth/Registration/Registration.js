import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { setUserRegistrationThunk } from '../../../../../asyncActions/userThunks';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return ({
        isAuth: state.user.isAuth
    });
};

const Registration = (props) => {
    const [login, setLogin] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    let loginBoolean = false;
    let emailBoolean = false;
    let passwordBoolean = false;

    if (login) {
        const length = login.length;
        if (length < 3) {
            loginBoolean = false;
        };
    }
    if (email) {
        const length = email.length;
        if (length < 5) {
            emailBoolean = false;
        };
    }
    if (password) {
        const length = password.length;
        if (length < 6) {
            passwordBoolean = false;
        };
    }

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const click = () => {
        dispatch(setUserRegistrationThunk(login, email, password));
    };

    if (props.isAuth) {
        navigate('/home');
    } else {
        return (
            <div>
                <div className='grid grid-cols-1 gap-2 mt-0 mb-4 items-center justify-items-center'>
                    <span className='col-span-1 mb-0 mt-4 w-full'>
                        <span className='grid grid-cols-9 gap-3 items-center justify-items-center'>
                            <h2 className='col-span-3 font-bold mr-2 w-fit justify-self-end'>Login</h2>
                            <input onChange={e => setLogin(e.target.value)} value={login} className='col-span-4 w-full h-8 rounded-full text-center'></input>
                            <div className='col-span-2'></div>
                        </span>
                    </span>
                    <span className='col-span-1 mb-1 mt-1 w-full'>
                        <span className='grid grid-cols-9 gap-3 items-center justify-items-center'>
                            <h2 className='col-span-3 font-bold  mr-2 w-fit justify-self-end'>Email</h2>
                            <input onChange={e => setEmail(e.target.value)} value={email} className='col-span-4 w-full h-8 rounded-full text-center'></input>
                            <div className='col-span-2'></div>
                        </span>
                    </span>
                    <span className='col-span-1 mb-4 mt-0 w-full'>
                        <span className='grid grid-cols-9 gap-3 items-center justify-items-center'>
                            <h2 className='col-span-3 font-bold  mr-2 w-fit justify-self-end'>Password</h2>
                            <input onChange={e => setPassword(e.target.value)} value={password} className='col-span-4 w-full h-8 rounded-full text-center'></input>
                            <div className='col-span-2'></div>
                        </span>
                    </span>
                    <div className='col-span-1'>
                        <button onClick={click} className='min-w-fit max-w-lg h-fit flex flex-row justify-center items-center gap-0 transition duration-50 ease-out hover:ease-in  rounded-full bg-rose-300 hover:bg-rose-200'>
                            <p className='ml-5 mr-5 mt-2 mb-2 text-lg font-semibold'>
                                Click to become a potato!
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        );
    };
};

const RegistrationContainer = connect(mapStateToProps)(Registration);
export default RegistrationContainer;