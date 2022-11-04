import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router";

import { setCharacterThunk } from "../../../../../../asyncActions/characterThunks";
import { updateCharacterActionCreator } from "../../../../../../redux/reducers/character/characterActionCreators";
import { changeCharacterThunk } from "../../../../../../asyncActions/characterThunks";
import CharacterEditor from "./CharacterEditor";

const mapStateToProps = (state) => {
    const character = state.character;
    const isAuth = state.user.isAuth;
    return {
        isAuth,
        user: state.user,

        id: character.id,
        URI: character.URI,
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

const ChangeCharacterContainer = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const characterId = Number(params.name.split("-")[0]);
    useEffect(() => {
        !props.isAuth && navigate("../");
        props.setCharacterThunk(characterId);
    }, []);

    if (props.id) {
        if (params.name !== props.URI) {
            navigate(`../${props.URI}/edit`);
        }
    } else if (!props.id && props.attemptToLoad) {
        navigate(`../`);
    }

    const toPublish = () => {
        const characterData = {
            id: props.id,
            URI: props.URI,
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
        changeCharacterThunk(characterData);
        navigate(`../${props.URI}`);
    };

    return (
        <div>
            <CharacterEditor {...props} toPublish={toPublish} />
        </div>
    );
};

export default connect(mapStateToProps, {
    setCharacterThunk,
    updateCharacterActionCreator,
})(ChangeCharacterContainer);
