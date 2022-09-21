import characterActionTypes from "./characterActionTypes";

export const setCharacterActionCreator = (characterData) => ({
  type: characterActionTypes.SET_CHARACTER,
  payload: characterData,
});

export const updateCharacterActionCreator = (characterData) => ({
  type: characterActionTypes.UPDATE_CHARACTER,
  payload: characterData,
});

export const setAttemptToLoadCharacterActionCreator = () => ({
  type: characterActionTypes.SET_ATTEMPT,
});
