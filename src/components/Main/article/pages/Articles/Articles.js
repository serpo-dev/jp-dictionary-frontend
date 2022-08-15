import React from 'react';
import { Route, Routes } from 'react-router';
import { NavLink } from 'react-router-dom';

import ArticleEditor from './ArticleEditor/ArticleEditor';
import ArticlePage from './ArticlePage/ArticlePage';
import ArticlesFeed from './ArticlesFeed/ArticlesFeed';

const Articles = (props) => {

    return (
        <div>
            <Routes>
                <Route path='/*' element={<ArticlesFeed />} />
                <Route path='/:id/*' element={<ArticlePage />} />
                <Route path='/:id/edit/' element={<ArticleEditor />} />
            </Routes>
        </div>
    )
};

export default Articles;