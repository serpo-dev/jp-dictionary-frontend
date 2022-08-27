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
                description: characterPart.description,
                mnemoDisc: characterPart.mnemoDisc,
                img: characterPart.img,
                mnemoImg: characterPart.mnemoImg,
                variants: characterPart.variants,

                associations: action.payload.associations,

                examLevel: null,

                translations: [],
                examples: [],

                attemptToLoad: true,
            };
            if (action.payload.kanjiPart) {
                const kanjiPart = action.payload.kanjiPart;
                setCharacterNewState = {
                    ...setCharacterNewState,

                    examLevel: kanjiPart.examLevel,

                    translations: kanjiPart.translations,
                    examples: kanjiPart.examples,
                };
            };
            return setCharacterNewState;

        case characterActionTypes.UPDATE_CHARACTER:
            let updateCharacterNewState = {
                ...state,
                associations: state.associations.length !== 0 ? [...state.associations] : [],
                translations: state.translations.length !== 0 ? [...state.translations] : [],
                examples: state.examples.length !== 0 ? [...state.examples] : [],
            };
            if (state.type === 'COMPONENT') {
                updateCharacterNewState = {
                    ...state,
                    examLevel: null,
                    translations: [],
                    examples: [],
                };
            };
            switch (action.payload[1]) {
                case 'TITLE':
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        title: action.payload[0],
                    };
                    break;
                case 'TYPE':
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        type: action.payload[0],
                    };
                    break;
                case 'VARIANTS':
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        variants: action.payload[0],
                    };
                    break;
                case 'MEANING':
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        meaning: action.payload[0],
                    };
                    break;
                case 'DESCRIPTION':
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        description: action.payload[0],
                    };
                    break;
                case 'MNEMO_DISC':
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        mnemoDisc: action.payload[0],
                    };
                    break;
                case 'EXAM_LEVEL':
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        examLevel: action.payload[0],
                    };
                    break;
                case 'ASSOCIATIONS':
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        associations: action.payload[0],
                    };
                    break;
                case 'TRANSLATIONS':
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        translations: action.payload[0],
                    };
                    break;
                case 'EXAMPLES':
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        examples: action.payload[0],
                    };
                    break;
                case 'STROKE_ORDER_IMG':
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        img: action.payload[0],
                    };
                    break;
                case 'MNEMO_IMG':
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        mnemoImg: action.payload[0],
                    };
                    break;
            };
            console.log(updateCharacterNewState)
            return updateCharacterNewState;

        case characterActionTypes.SET_ATTEMPT:
            return {
                ...state,
                attemptToLoad: true,
            };

        default:
            return state;
    };
};
