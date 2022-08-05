import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';

import homeIcon from './assets/images/icons/navbar/64x64/home_rose.png';
import articlesIcon from './assets/images/icons/navbar/64x64/articles_rose.png';
import charactersIcon from './assets/images/icons/navbar/64x64/characters_rose.png';
import grammarIcon from './assets/images/icons/navbar/64x64/grammar_rose.png';
import questionsIcon from './assets/images/icons/navbar/64x64/questions_rose.png';
import headerLogo from './assets/images/logos/header_bg_transparent.png';

import AuthStatus from './components/header/AuthStatus';
import Content from './components/article/common/Content';

import { userCheckAuth } from './asyncActions/http/user';
import { setAuthActionCreator, setUserActionCreator } from './redux/reducers/user/userActionCreators';


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(window.localStorage)
    userCheckAuth()
      .then((userData) => {
        dispatch(setUserActionCreator(userData));
        dispatch(setAuthActionCreator());
      })
      .finally(console.log('Page loaded!'));
    setTimeout((data) => { setLoading(false) }, 2000);
  }, []);

  if (loading) {
    return (
      <div>
        <div class="space">
          <div class="f-circle"></div>
          <div class="s-circle"></div>
          <div class="t-circle"></div>
          <div class="circle"></div>
        </div>
      </div>
    )
  };

  return (<div>
    <BrowserRouter>
      <div className='bg-gradient-to-r from-rose-200 to-pink-300 min-h-screen'>
        <div className='grid grid-cols-1 h-full'>
          <div className='h-0'>
            <div className='bg-gradient-to-r from-rose-200 to-pink-300'>

            </div>
          </div>
          <div className='sticky top-0 h-0 grid grid-cols-12'>
            <header className='backdrop-opacity-50 drop-shadow col-span-12 h-16 bg-gradient-to-r from-rose-50/90 to-pink-50/90'>
              <div className='grid grid-cols-12'>
                <div className='backdrop-opacity-50 col-span-12 hover:bg-gradient-to-r hover:from-rose-500/10 hover:to-pink-500/90 h-1.5'>
                </div>
                <div className='col-span-12 -mt-1'>
                  <div className='flex flex-row'>
                    <div className='basis-1/12 bg-r' />
                    <div className='flex-none basis-34'>
                      <NavLink to='/'>
                        <img src={headerLogo} className='h-14' />
                      </NavLink>
                    </div>
                    <div className='pl-8 pt-2.5 basis-9/12' >
                      <NavLink to='/'>
                        <p className='transition duration-100 w-fit ease-out hover:ease-in hover:text-rose-500 font-bold text-2xl text-slate-800'>CrimsonPotato</p>
                      </NavLink>
                    </div>
                    <div className='mt-2.5'>
                      <AuthStatus />
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <nav className='col-span-3 justify-self-end mr-10 mt-10'>
              <div className='flex flex-col w-36 gap-2'>
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

          </div>
          <div className='grid grid-cols-12 h-full'>
            <div className='col-span-12 h-16' />
            <div className='col-span-3'>
            </div>
            <article className='col-span-6 pt-4 min-h-5/6 max-h-full'>
              <Content />
            </article>
            <aside className='col-span-3'>

            </aside>
            <footer className="justify-self-center h-full self-end col-span-12">
              FOOTER
            </footer>
          </div>
        </div>
      </div>
    </BrowserRouter>
  </div>
  );
}

export default App;