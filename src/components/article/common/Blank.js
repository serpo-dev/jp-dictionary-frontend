import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from '../pages/Home/Home';
import Characters from '../pages/Characters/Characters';
import Articles from '../pages/Articles/Articles';
import Grammar from '../pages/Grammar/Grammar';
import Questions from '../pages/Questions/Questions';

import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';

const Content = (props) => {
    return (
        <div className="bg-white w-full h-fit rounded-lg">
            <div className="bg-rose-50 rounded-lg p-4">
                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/articles' element={<Articles />} />
                    <Route path='/characters' element={<Characters />} />
                    <Route path='/grammar' element={<Grammar />} />
                    <Route path='/questions' element={<Questions />} />

                    <Route path='/login' element={<Login />} />
                    <Route path='/registration' element={<Registration />} />
                </Routes>
            </div>
        </div>
    );
};

export default Content;