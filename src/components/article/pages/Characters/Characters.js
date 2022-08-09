import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CharactersBrowser from './CharactersBrowser/CharactersBrowser';
import CharacterPage from './CharachterPage/CharacterPage';
import CharacterEditor from './CharacterEditor/CharacterEditor';

const Characters = (props) => {

    return (
        <div>
            <Routes>
                <Route path='/*' element={<CharactersBrowser />} />
                <Route path='/:name' element={<CharacterPage />} />
                <Route path='/edit/:name' element={<CharacterEditor />} />
            </Routes>
        </div>
    );
};

export default Characters;