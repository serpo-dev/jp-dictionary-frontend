import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";

import { setCharacterThunk } from "../../../../../../asyncActions/characterThunks";
import { updateCharacterActionCreator } from "../../../../../../redux/reducers/character/characterActionCreators";
import { createCharacterThunk } from "../../../../../../asyncActions/characterThunks";
import CharacterEditor from "./CharacterEditor";

const mapStateToProps = (state) => {
  const character = state.character;
  const isAuth = state.user.isAuth;
  return {
    isAuth,

    type: character.type,
    title: character.title,
    description: character.description,
    meaning: character.meaning,
    mnemoDisc: character.mnemoDisc,
    mnemoImg: character.mnemoImg,
    img: character.img,
    variants: character.variants,

    associations: character.associations,

    examLevel: character.examLevel,

    translations: character.translations,
    examples: character.examples,

    attemptToLoad: character.attemptToLoad,
    lastField: character.lastField,
  };
};

const CreateCharacterContainer = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    !props.isAuth && navigate("../");
  }, []);

  const toPublish = () => {
    const characterData = {
      type: props.type,
      title: props.title,
      description: props.description,
      meaning: props.meaning,
      mnemoDisc: props.mnemoDisc,
      mnemoImg: props.mnemoImg,
      img: props.img,
      variants: props.variants,

      associations: props.associations,

      examLevel: props.examLevel,

      translations: props.translations,
      examples: props.examples,
    };
    const resURI = createCharacterThunk(characterData);
    navigate(`../${resURI}`);
  };

  return (
    <div>
      <CharacterEditor
        {...props}
        toPublish={toPublish}
        containerType="create"
      />
    </div>
  );
};

export default connect(mapStateToProps, {
  setCharacterThunk,
  updateCharacterActionCreator,
})(CreateCharacterContainer);
