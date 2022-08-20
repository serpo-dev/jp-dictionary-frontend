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
                <div className='col-span-12 h-0'>
                    <div className='bg-gradient-to-t from-rose-50/90 to-pink-50/90 h-16' />
                </div>

                <div className='drop-shadow col-span-12 mt-1'>
                    <div className='flex flex-row'>
                        <div className='ml-[5%]'>
                            <NavLink to='/'>
                                <img src={headerLogo} className={`${stylesheet.headerImg} h-14`} />
                            </NavLink>
                        </div>
                        <div className='pl-3.5 pt-2.5' >
                            <NavLink to='/'>
                                <p className='transition duration-100 w-fit ease-out hover:ease-in hover:text-rose-500 font-bold text-2xl text-slate-800'>JPot</p>
                            </NavLink>
                        </div>
                        <div className='grow'>

                        </div>
                        <div className='self-center mr-[3%]'>
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