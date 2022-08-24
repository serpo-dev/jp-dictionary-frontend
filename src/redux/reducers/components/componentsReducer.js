import componentsInitialState from './componentsInitialState';
import componentsActionTypes from './componentsActionTypes';

const componentsReducer = (state = componentsInitialState, action) => {
    switch (action.type) {
        case componentsActionTypes.GET_COMPONENTS:
            const getComponentsNewState = {
                ...action.payload.count,
                rows: [...action.payload.rows]
            };
            return getComponentsNewState;
        default:
            return state;
    };
};

export default componentsReducer;