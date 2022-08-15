import React from 'react';
import { NavLink } from 'react-router-dom';

import homeIcon from '../../../assets/images/icons/navbar/64x64/home_rose.png';
import articlesIcon from '../../../assets/images/icons/navbar/64x64/articles_rose.png';
import charactersIcon from '../../../assets/images/icons/navbar/64x64/characters_rose.png';
import grammarIcon from '../../../assets/images/icons/navbar/64x64/grammar_rose.png';
import questionsIcon from '../../../assets/images/icons/navbar/64x64/questions_rose.png';

const Nav = () => {
    return (
        <span>
            <nav className='
                flex flex-row place-content-end pt-8 w-0
                md:w-[184px] md:pr-4
                lg:w-[212px] lg:pr-6
                xl:w-[290px]
            '>
                <div className='w-[48px]' />
                <div className='flex flex-col w-[145px] gap-2'>
                    <NavLink to='/home' className='transition duration-100 ease-out grid grid-cols-12 hover:bg-pink-50 hover:drop-shadow content-center h-8 bg-rose-50/90 rounded-lg w-full'>
                        <div className='col-span-3 justify-self-center'>
                            <img src={homeIcon} className='h-5' />
                        </div>
                        <div className='col-span-9'>
                            <div className='font-semibold text-[#c13e3e]'>
                                <p>Home</p>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to='/articles' className='transition duration-100 ease-out grid grid-cols-12 hover:bg-pink-50 hover:drop-shadow content-center h-8 bg-rose-50/90 rounded-lg w-full'>
                        <div className='col-span-3 justify-self-center'>
                            <img src={articlesIcon} className='h-5' />
                        </div>
                        <div className='col-span-9'>
                            <div className='font-semibold text-[#c13e3e]'>
                                <p>Articles</p>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to='/characters' className='transition duration-100 ease-out grid grid-cols-12 hover:bg-pink-50 hover:drop-shadow content-center h-8 bg-rose-50/90 rounded-lg w-full'>
                        <div className='col-span-3 justify-self-center'>
                            <img src={charactersIcon} className='h-5' />
                        </div>
                        <div className='col-span-9'>
                            <div className='font-semibold text-[#c13e3e]'>
                                <p>Characters</p>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to='/grammar' className='transition duration-100 ease-out grid grid-cols-12 hover:bg-pink-50 hover:drop-shadow  content-center h-8 bg-rose-50/90 rounded-lg w-full'>
                        <div className='col-span-3 justify-self-center'>
                            <img src={grammarIcon} className='h-5' />
                        </div>
                        <div className='col-span-9'>
                            <div className='font-semibold text-[#c13e3e]'>
                                <p>Grammar</p>
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to='/questions' className='transition duration-100 ease-out grid grid-cols-12 hover:bg-pink-50 content-center h-8 bg-rose-50/90 rounded-lg w-full'>
                        <div className='col-span-3 justify-self-center'>
                            <img src={questionsIcon} className='h-5' />
                        </div>
                        <div className='col-span-9'>
                            <div className='font-semibold text-[#c13e3e]'>
                                <p>Questions</p>
                            </div>
                        </div>
                    </NavLink>
                </div>
            </nav>
        </span>
    );
};

export default Nav;