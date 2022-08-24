import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';

import { setCharacterThunk } from '../../../../../../asyncActions/characterThunks';
import { updateCharacterActionCreator } from '../../../../../../redux/reducers/character/characterActionCreators';
import { createCharacterThunk } from '../../../../../../asyncActions/characterThunks';
import CharacterEditor from './CharacterEditor';


const mapStateToProps = (state) => {
    const character = state.character;
    return {
        type: character.type,
        title: character.title,
        desctiption: character.desctiption,
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
    };
};

const CreateCharacterContainer = (props) => {
    const navigate = useNavigate();

    const toPublish = () => {
        const characterData = {
            type: props.type,
            title: props.title,
            desctiption: props.desctiption,
            meaning: props.meaning,
            mnemoDisc: props.mnemoDisc,
            mnemoImg: props.mnemoImg,
            img: props.img,
            variants: props.variants,

            associations: props.associations,

            examLevel: props.examLevel,

            translations: props.translations,
            examples: props.examples,

            attemptToLoad: props.attemptToLoad,
        };
        createCharacterThunk(characterData);
        navigate('../');
    };

    return (
        <div>
            <CharacterEditor {...props} toPublish={toPublish} type='create' />
        </div>
    );
};

export default connect(mapStateToProps, {
    setCharacterThunk,
    updateCharacterActionCreator,
})(CreateCharacterContainer);