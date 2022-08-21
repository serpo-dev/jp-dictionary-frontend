import { setCharacterActionCreator, setAttemptToLoadCharacterActionCreator } from "../redux/reducers/character/characterActionCreators";
import { getCharacter } from "./http/character";

export const setCharacterThunk = (characterId) => async (dispatch) => {
    if (characterId) {
        const characterData = await getCharacter(characterId);
        console.log(characterData)
        if (characterData) {
            dispatch(setCharacterActionCreator(characterData));
        } else {
            console.log('The problem is caught in characterThunk');
        };
    };
    dispatch(setAttemptToLoadCharacterActionCreator());
};