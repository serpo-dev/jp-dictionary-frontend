import kanjisInitialState from "./kanjisInitialState";
import kanjisActionTypes from "./kanjisActionTypes";

const kanjisReducer = (state = kanjisInitialState, action) => {
    switch (action.type) {
        case kanjisActionTypes.GET_KANJIS:
            const getKanjisNewState = {
                ...action.payload.count,
                rows: [...action.payload.rows],
            };
            return getKanjisNewState;
        default:
            return state;
    }
};

export default kanjisReducer;
