import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { NavLink, useParams } from 'react-router-dom';

import PageNotfoundError from '../../errors/PageNotFoundError';

const CharacterPage = (props) => {

    const params = useParams();
    const characterId = Number(params.name.split('-')[0]);

    const {
        id,
        type,
        title,
        meaning,
        mnemoDisc,
        mnemoImg,
        img,
        components
    } = useSelector(state => state.characters.lastCharacter);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'GET_ONE', payload: characterId });
    }, []);

    if (characterId) {
        return (
            <div>
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <div className="grid grid-cols-2">
                            <span>{title}</span>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <span>{ }</span>
                    </div>
                    <div className="col-span-4">
                        <span>

                        </span>
                    </div>
                    <div className="col-span-4">
                        <span>

                        </span>
                    </div>
                    <div className="col-span-12">
                        { }
                        { }
                    </div>
                    <div className="col-span-12">
                        {/* Other */}
                    </div>
                </div>
            </div>
        );
    } else {
        return <PageNotfoundError />;
    };
};

export default CharacterPage;