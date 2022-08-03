const initialState = {
    allLoadedCharacters: [],
    lastCharacter: {
        id: 0,
        type: 'kanji',
        title: '猫',
        meaning: 'cat',
        components: [
            {
                title: '犬',
                meaning: 'dog'
            },
            {
                title: '苗',
                meaning: 'seeding'
            }
        ],
        mnemoDisc: 'the seedling (苗) dog (犭) is a cat',
        img: 'https://sun9-37.userapi.com/impg/lCwjn020CJyRP9OmslPbzANwn0TsP3R3BxkrBQ/HmW9KPqbXxg.jpg?size=401x401&quality=95&sign=fd8ba27655abd77809cb115a7ff76bc6&type=album',
        mnemoImg: 'https://sun9-29.userapi.com/impg/K7qN07OV3VVK8MM-GbMXtEyIy2bbskSNNvQwEg/j_YxdSMe1bw.jpg?size=1400x788&quality=95&sign=f6411025c855a379025b4d28214db188&type=album',
    }
};

export const characterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ONE':
            console.log(action.payload)
            return {
                ...state,
                allLoadedCharacters: [
                    ...state.allLoadedCharacters
                ],
                lastCharacter: {
                    ...state.lastCharacter,
                    title: action.payload
                }
            };
        default:
            return state;
    };
};
