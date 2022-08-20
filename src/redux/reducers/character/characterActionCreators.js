import characterActionTypes from "./characterActionTypes";

export const setCharacterActionCreator = (characterId) => ({
    type: characterActionTypes.SET_CHARACTER,
    payload: characterId
});

export const setAttemptToLoadCharacterActionCreator = () => ({
    type: characterActionTypes.SET_ATTEMPT,
});