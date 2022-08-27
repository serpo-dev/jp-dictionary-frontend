import { setCharacterActionCreator, setAttemptToLoadCharacterActionCreator } from "../redux/reducers/character/characterActionCreators";
import { changeCharacter, createCharacter, getCharacter } from "./http/character";

export const setCharacterThunk = (characterId) => async (dispatch) => {
    if (characterId) {
        const characterData = await getCharacter(characterId);
        if (characterData) {
            dispatch(setCharacterActionCreator(characterData));
        } else {
            console.log('The problem is caught in characterThunk');
        };
    };
    dispatch(setAttemptToLoadCharacterActionCreator());
};

export const createCharacterThunk = async (characterData) => {
    try {
        const res = await createCharacter({ ...characterData });
        return res;
    } catch (err) {
        console.log('The problem is caught in characterThunk');
    };
};

export const changeCharacterThunk = async (characterData) => {
    try {
        await changeCharacter(characterData);
    } catch (err) {
        console.log('The problem is caught in characterThunk');
    };
};