import commonActionTypes from "./commonActionTypes";

export const setTopBarLoading = () => ({
    type: commonActionTypes.SET_TOP_BAR_LOADING,
});

export const dropTopBarLoading = () => ({
    type: commonActionTypes.DROP_TOP_BAR_LOADING,
});

export const setPageLoading = () => ({
    type: commonActionTypes.SET_PAGE_LOADING,
});

export const dropPageLoading = () => ({
    type: commonActionTypes.DROP_PAGE_LOADING,
});
