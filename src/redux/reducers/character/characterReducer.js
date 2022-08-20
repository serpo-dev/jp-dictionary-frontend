import characterActionTypes from "./characterActionTypes";
import characterInitialState from './characterInitialState';

export const characterReducer = (state = characterInitialState, action) => {
    switch (action.type) {
        case characterActionTypes.SET_CHARACTER:
            const { characterPart } = action.payload;
            let setCharacterNewState = {
                id: characterPart.id,
                URI: characterPart.URI,
                type: characterPart.type,
                title: characterPart.title,
                meaning: characterPart.meaning,
                mnemoDisc: characterPart.mnemoDisc,
                img: characterPart.img,
                mnemoImg: characterPart.mnemoImg,

                attemptToLoad: true,
            };
            if (action.payload.kanjiPart) {
                const kanjiPart = action.payload.kanjiPart;
                setCharacterNewState = {
                    ...setCharacterNewState,
                    examLevel: kanjiPart.examLevel,
                };
            };
            return setCharacterNewState;
        case characterActionTypes.SET_ATTEMPT:
            return {
                ...state,
                attemptToLoad: true,
            };
        default:
            return state;
    };
};
