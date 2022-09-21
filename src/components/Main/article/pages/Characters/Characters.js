import React from "react";
import { Route, Routes } from "react-router-dom";

import CharactersBrowser from "./CharactersBrowser/CharactersBrowser";
import CharacterPage from "./CharachterPage/CharacterPage";
import ChangeCharacterContainer from "./CharacterEditor/ChangeCharacterContainer";
import CreateCharacterContainer from "./CharacterEditor/CreateCharacterContainer";
import NotFound from "./NotFound.js/NotFound";

const Characters = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<CharactersBrowser />} />
        <Route path="/:name" element={<CharacterPage />} />
        <Route path="/:name/edit" element={<ChangeCharacterContainer />} />
        <Route path="/create" element={<CreateCharacterContainer />} />
        <Route path="/:name/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Characters;
