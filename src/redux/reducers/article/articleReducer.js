const initialState = {
    likes: 10
};

export const articlesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'increment':
            return {
                ...state,
                likes: state.likes + action.number
            };
        default:
            return state;
    };
};
