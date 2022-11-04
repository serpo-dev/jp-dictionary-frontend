import commonInitialState from "./commonInitialState";
import commonActionTypes from "./commonActionTypes";

export const commonReducer = (state = commonInitialState, action) => {
    switch (action.type) {
        case commonActionTypes.SET_TOP_BAR_LOADING:
            return {
                ...state,
                isTopBarLoading: true,
            };
        case commonActionTypes.DROP_TOP_BAR_LOADING:
            return {
                ...state,
                isTopBarLoading: false,
            };
        case commonActionTypes.SET_PAGE_LOADING:
            return {
                ...state,
                isPageLoading: true,
            };
        case commonActionTypes.DROP_PAGE_LOADING:
            return {
                ...state,
                isPageLoading: false,
            };
        default:
            return state;
    }
};
