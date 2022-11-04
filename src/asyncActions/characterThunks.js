import {
    setCharacterActionCreator,
    setAttemptToLoadCharacterActionCreator,
} from "../redux/reducers/character/characterActionCreators";
import { getKanjisActionCreator } from "../redux/reducers/kanjis/kanjisActionCreators";
import {
    changeCharacter,
    createCharacter,
    getCharacter,
    setCharactersList,
} from "./http/character";

export const setCharacterThunk = (characterId) => async (dispatch) => {
    if (characterId) {
        const characterData = await getCharacter(characterId);

        const defaultImg =
            "https://sun9-42.userapi.com/impg/n0SEG-EyA_ZMnRogha9C0d6vcJr7tMurMgzEqQ/mxSrqn_y3Sc.jpg?size=1919x1079&quality=95&sign=77baa2b7ae88385d26588ce1b7e2b5b3&type=album";
        let mnemoImg = characterData.characterPart.mnemoImg;
        mnemoImg = mnemoImg ? mnemoImg : defaultImg;
        characterData.characterPart.mnemoImg = mnemoImg;

        if (characterData) {
            dispatch(setCharacterActionCreator(characterData));
        } else {
            console.log("The problem is caught in characterThunk");
        }
    }
    dispatch(setAttemptToLoadCharacterActionCreator());
};

export const createCharacterThunk = async (characterData) => {
    try {
        const res = await createCharacter({ ...characterData });
        return res;
    } catch (err) {
        console.log("The problem is caught in characterThunk");
    }
};

export const changeCharacterThunk = async (characterData) => {
    try {
        await changeCharacter(characterData);
    } catch (err) {
        console.log("The problem is caught in characterThunk");
    }
};

export const setCharactersListThunk = () => async (dispatch) => {
    try {
        const res = await setCharactersList();
        dispatch(getKanjisActionCreator(res.data));
    } catch {
        console.log("The problem is caught at setCharactersListThunk");
    }
};
