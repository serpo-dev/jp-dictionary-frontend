import characterActionTypes from "./characterActionTypes";
import characterInitialState from "./characterInitialState";

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
            }
            return setCharacterNewState;

        case characterActionTypes.UPDATE_CHARACTER:
            console.log(action.payload);
            let updateCharacterNewState = {
                ...state,
                associations:
                    state.associations.length !== 0
                        ? [...state.associations]
                        : [],
                translations:
                    state.translations.length !== 0
                        ? [...state.translations]
                        : [],
                examples:
                    state.examples.length !== 0 ? [...state.examples] : [],
                lastField: action.payload[1],
            };
            if (state.type === "COMPONENT") {
                updateCharacterNewState = {
                    ...state,
                    examLevel: null,
                    translations: [],
                    examples: [],
                };
            }
            switch (action.payload[1]) {
                case "TITLE":
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        title: action.payload[0],
                    };
                    break;
                case "TYPE":
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        type: action.payload[0],
                    };
                    break;
                case "VARIANTS":
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        variants: action.payload[0],
                    };
                    break;
                case "MEANING":
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        meaning: action.payload[0],
                    };
                    break;
                case "DESCRIPTION":
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        description: action.payload[0],
                    };
                    break;
                case "MNEMO_DISC":
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        mnemoDisc: action.payload[0],
                    };
                    break;
                case "EXAM_LEVEL":
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        examLevel: action.payload[0],
                    };
                    break;
                case "ASSOCIATIONS":
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        associations: action.payload[0],
                    };
                    break;
                case "TRANSLATIONS":
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        translations: [...updateCharacterNewState.translations],
                    };
                    const curNumTrans = Number(action.payload[2]);
                    updateCharacterNewState.translations[curNumTrans] = {
                        ...updateCharacterNewState.translations[curNumTrans],
                        ...action.payload[0],
                    };
                    break;
                case "EXAMPLES":
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        examples: [...updateCharacterNewState.examples],
                    };
                    const curNumExmp = Number(action.payload[2]);
                    updateCharacterNewState.examples[curNumExmp] = {
                        ...updateCharacterNewState.examples[curNumExmp],
                        ...action.payload[0],
                    };
                    break;
                case "STROKE_ORDER_IMG":
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        img: action.payload[0],
                    };
                    break;
                case "MNEMO_IMG":
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        mnemoImg: action.payload[0],
                    };
                    break;

                case "ASSOCIATIONS_NEW_ONE":
                    //     updateCharacterNewState = {
                    //         ...updateCharacterNewState,
                    //         associations: [...updateCharacterNewState.associations, {

                    //         }],
                    //     };
                    break;
                case "TRANSLATIONS_NEW_ONE":
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        translations: [
                            ...updateCharacterNewState.translations,
                            {
                                jpNormalText: null,
                                jpFuriganaText: null,
                                enText: null,
                                ruText: null,
                            },
                        ],
                    };
                    break;
                case "EXAMPLES_NEW_ONE":
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        examples: [
                            ...updateCharacterNewState.examples,
                            {
                                jpNormalText: null,
                                jpFuriganaText: null,
                                enText: null,
                                ruText: null,
                            },
                        ],
                    };
                    break;

                case "ASSOCIATIONS_DELETE_ONE":
                    break;
                case "TRANSLATIONS_DELETE_ONE":
                    const prevTranslations =
                        [...updateCharacterNewState.translations];
                    prevTranslations.splice(Number(action.payload[2]), 1);
                    console.log('OLD', updateCharacterNewState.translations)
                    console.log('NEW', prevTranslations)
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        translations: prevTranslations,
                    };
                    break;
                case "EXAMPLES_DELETE_ONE":
                    const prevExamples = updateCharacterNewState.examples;
                    prevExamples.splice(Number(action.payload[2]), 1);
                    updateCharacterNewState = {
                        ...updateCharacterNewState,
                        examples: prevExamples,
                    };
                    break;
            }
            // debugger;
            return updateCharacterNewState;

        case characterActionTypes.REMOVE_CHARACTER:
            const removeCharacterNewState = {
                ...state,
                id: null,
                URI: null,
                type: null,
                title: null,
                description: null,
                meaning: null,
                mnemoDisc: null,
                img: null,
                mnemoImg: null,
                variants: null,

                associations: [],

                examLevel: null,
                translations: [],
                examples: [],

                attemptToLoad: false,
                lastField: null,
            };
            return removeCharacterNewState;

        case characterActionTypes.SET_ATTEMPT:
            return {
                ...state,
                attemptToLoad: true,
            };

        default:
            return state;
    }
};
