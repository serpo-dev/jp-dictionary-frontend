import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CharactersBrowser from './CharactersBrowser/CharactersBrowser';
import CharacterPage from './CharachterPage/CharacterPage';

const Characters = (props) => {

    return (
        <div>
            <Routes>
                <Route path='/*' element={<CharactersBrowser />} />
                <Route path='/:name' element={<CharacterPage />} />
            </Routes>
        </div>
    );
};

export default Characters;