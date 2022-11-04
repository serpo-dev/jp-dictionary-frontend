import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import stylesheet from "./CharacterPage.module.css";

import { setCharacterThunk } from "../../../../../../asyncActions/characterThunks";

import Dropdown from "./dropdowns/index";
import { removeCharacterActionCreator } from "../../../../../../redux/reducers/character/characterActionCreators";
import {
    dropPageLoading,
    setPageLoading,
} from "../../../../../../redux/reducers/common/commonActionCreators";

const mapStateToProps = (state) => {
    const character = state.character;
    return {
        id: character.id,
        URI: character.URI,
        type: character.type,
        title: character.title,
        meaning: character.meaning,
        mnemoDisc: character.mnemoDisc,
        mnemoImg: character.mnemoImg,
        img: character.img,
        examLevel: character.examLevel,

        attemptToLoad: character.attemptToLoad,
    };
};

const CharacterPage = (props) => {
    const [_windowWidth, setWindowWidth] = useState(window.innerWidth);
    window.addEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
    });
    let rectLeft = document.getElementById("dynamic_bg_article")
        ? `${
              document
                  .getElementById("dynamic_bg_article")
                  .getBoundingClientRect().left - 16
          }px`
        : "0px";
    const setBgImageSize = function () {
        if (_windowWidth < 768) {
            return `${_windowWidth}px ${_windowWidth * 0.5625}px`;
        } else if (_windowWidth < 1024) {
            return "500px 281px";
        } else if (_windowWidth < 1280) {
            return "600px 338px";
        } else {
            return "700px 394px";
        }
    };

    const params = useParams();
    const characterId = Number(params.name.split("-")[0]);
    const {
        id,
        URI,
        type,
        title,
        meaning,
        mnemoDisc,
        img,
        mnemoImg,
        examLevel,

        attemptToLoad,
    } = props;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageLoading());
        props.setCharacterThunk(characterId);
        return () => dispatch(removeCharacterActionCreator());
    }, []);

    const navigate = useNavigate();
    if (id) {
        if (params.name !== URI) {
            navigate(`../${URI}`);
        }
    } else if (!id && attemptToLoad) {
        navigate(`../`);
    }

    const isPageLoading = useSelector(state => state.common.isPageLoading);
    const pseudoImgOnload = (e) => {
        const div = document.querySelector("#bgCharacterImg");
        const img = new Image();
        img.onload = () => {
            div.style.backgroundImage = `url(${img.src})`;
        };
        img.src = e.target.src;
        setTimeout(() => {
            dispatch(dropPageLoading());
        }, 1000);
    };

    return (
        <div id="dynamic_bg_article">
            <div className="grid grid-cols-12 -m-4">
                <div className="col-span-12">
                    <div className="flex flex-col">
                        <div className="h-0">
                            <div
                                className="h-[250px] bg-fixed bg-gradient-to-r from-rose-200 to-pink-300 rounded-lg"
                                style={{
                                    backgroundPositionX: "0px",
                                    backgroundSize: "100vw",
                                }}
                            />
                        </div>
                        <img
                            src={mnemoImg}
                            onLoad={pseudoImgOnload}
                            style={{
                                height: "0",
                                width: "0",
                                opacity: "0",
                            }}
                        />
                        <div
                            id="bgCharacterImg"
                            className="h-[250px] bg-no-repeat bg-fixed rounded-lg"
                            style={{
                                backgroundPositionY: "78px",
                                backgroundPositionX: `${rectLeft}`,
                                backgroundSize: `${setBgImageSize()}`,
                            }}
                        ></div>
                        <div className="self-center text-7xl font-bold w-[140px] h-[140px] -mt-12 bg-rose-50 rounded-full">
                            <p className="flex h-full justify-center pb-6 items-center">
                                {title}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col col-span-4 ml-8 mr-0 mb-4 -mt-16">
                    <span>
                        <p className="text-center font-bold text-xl mb-4">
                            犭 • 艹 • 田
                        </p>
                        <p className="text-center text-sm m-2 font-semibold">
                            {mnemoDisc}
                        </p>
                    </span>
                </div>
                <div className="col-span-4 text-center -m-4 mb-4">
                    <p className="text-2xl font-bold ">{meaning}</p>
                </div>
                <div className="col-span-4 ml-4 mr-4 mb-4 -mt-16 text-sm font-bold">
                    <div className="flex flex-wrap justify-end w-full">
                        <button className="m-1 p-2 bg-green-200 hover:bg-green-300 w-fit rounded-lg">
                            <p className={stylesheet.pointer_events_none}>
                                stroke order
                            </p>
                        </button>
                        <button className="m-1 p-2 bg-red-200 hover:bg-red-300 w-fit rounded-lg">
                            <p className={stylesheet.pointer_events_none}>
                                video
                            </p>
                        </button>
                        <button className="m-1 p-2 bg-blue-200 hover:bg-blue-300 w-fit rounded-lg">
                            <p className={stylesheet.pointer_events_none}>
                                map
                            </p>
                        </button>
                        <button className="m-1 p-2 bg-violet-200 hover:bg-violet-300 w-fit rounded-lg">
                            <p className={stylesheet.pointer_events_none}>
                                search
                            </p>
                        </button>
                        <button className="m-1 p-2 bg-yellow-200 hover:bg-yellow-300 w-fit rounded-lg">
                            <p className={stylesheet.pointer_events_none}>
                                {" "}
                                ...{" "}
                            </p>
                        </button>
                    </div>
                </div>
                {isPageLoading && <h1 className="m-10 text-xl font-extrabold text-amber-700">Loading...</h1>}
                <div className="col-span-12 ml-8 mr-8 mb-8">
                    <div className="flex-flex-col space-y-4">
                        <Dropdown type="translations" props={props} />
                        <Dropdown type="examples" props={props} />
                        <Dropdown type="detal_params" props={props} />
                    </div>
                </div>
                <div className="col-span-12 ml-8 mr-8 mb-8">
                    <span className={stylesheet.pointer_events_none}>
                        <b>Type: </b>
                        {type}
                    </span>
                    {examLevel ? (
                        <span className={stylesheet.pointer_events_none}>
                            <b>JLPT level:</b> {examLevel}
                        </span>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, {
    setCharacterThunk,
})(CharacterPage);
