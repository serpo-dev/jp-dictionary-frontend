import kanjisActionTypes from "./kanjisActionTypes";

export const getKanjisActionCreator = (allKanjis) => ({
    type: kanjisActionTypes.GET_KANJIS,
    payload: allKanjis,
});
