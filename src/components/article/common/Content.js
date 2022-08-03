import React from "react";
import { Route, Routes } from 'react-router-dom';

import OnlyPage from "./OnlyPage";
import WithTitlePage from './WithTitlePage';

const Content = (props) => {

    return (
        <div className="m-0 p-0">
            <Routes>
                <Route path='/auth/*' element={<WithTitlePage page='Auth' />} />
                <Route path='/auth/login/' element={<WithTitlePage page='Login' />} />
                <Route path='/auth/registration/' element={<WithTitlePage page='Registration' />} />

                <Route path='/home/*' element={<OnlyPage page='Home' />} />
                <Route path='/articles/*' element={<OnlyPage page='Articles' />} />
                <Route path='/characters/*' element={<OnlyPage page='Characters' />} />
                <Route path='/grammar/*' element={<OnlyPage page='Grammar' />} />
                <Route path='/questions/*' element={<OnlyPage page='Questions' />} />

                <Route path='/*' element={<OnlyPage page='PageNotfoundError' />} />
            </Routes>
        </div>
    );
};

export default Content;