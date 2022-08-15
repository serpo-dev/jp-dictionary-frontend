import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import stylesheet from './Header.module.css';

import headerLogo from '../../../assets/images/logos/header_bg_transparent.png';

import AuthStatus from '../header/AuthStatus';
import TopBarLoading from './TopBarLoading';
import { dropTopBarLoading } from '../../../redux/reducers/common/commonActionCreators';


const mapStateToProps = (state) => ({
    isTopBarLoading: state.common.isTopBarLoading
});
const mapDispatchToProps = (dispatch) => ({
    dropTopBarLoading: () => dispatch(dropTopBarLoading())
});

const Header = (props) => {

    return (
        <header className='w-full backdrop-opacity-50 col-span-1 h-16 bg-gradient-to-r from-rose-50/80 to-pink-50/80'>
            <div className='grid grid-cols-12'>
            <div className='h-0'>
                    <div className=' bg-gradient-to-r from-rose-200 to-pink-300 h-20 w-screen' />
                </div>
                <div className='col-span-12 h-0'>
                    <div className='bg-gradient-to-t from-rose-50/90 to-pink-50/90 h-16' />
                </div>
                
                <div className='drop-shadow col-span-12 mt-1'>
                    <div className='flex flex-row'>
                        <div className='basis-1/12 bg-r' />
                        <div className='flex-none basis-34'>
                            <NavLink to='/'>
                                <img src={headerLogo} className={`${stylesheet.headerImg} h-14`} />
                            </NavLink>
                        </div>
                        <div className='pl-8 pt-2.5 basis-9/12' >
                            <NavLink to='/'>
                                <p className='transition duration-100 w-fit ease-out hover:ease-in hover:text-rose-500 font-bold text-2xl text-slate-800'>JPot</p>
                            </NavLink>
                        </div>
                        <div className='mt-2.5'>
                            <AuthStatus />
                        </div>
                    </div>
                </div>
                <div className='drop-shadow col-span-12'>
                    {props.isTopBarLoading ? <TopBarLoading /> : null}
                </div>
                
            </div>
        </header>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);