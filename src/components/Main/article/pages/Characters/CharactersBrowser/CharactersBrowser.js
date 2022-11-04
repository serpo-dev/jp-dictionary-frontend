import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCharactersListThunk } from "../../../../../../asyncActions/characterThunks";
import Cell from "./Cell";

const CharactersBrowser = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCharactersListThunk());
    }, []);

    const { rows } = useSelector((state) => state.kanjis);
    const content = rows.map((kanji) => <Cell kanji={kanji} />);

    return (
        <div>
            <h1>CharactersBrowser</h1>
            <div style={{ display: "flex", flexDirection: "row" }}>
                {content}
            </div>
        </div>
    );
};

export default CharactersBrowser;
