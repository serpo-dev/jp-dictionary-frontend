import React, { useEffect } from "react";
import stylesheet from "./CharacterEditor.module.css";

import strokeOrderBg from "../../../../../../assets/images/characters/characterEditor/1x1.png";
import mnemoImgBg from "../../../../../../assets/images/characters/characterEditor/16x9.png";
import Dropdown from "./utils/dropdowns/index";

const CharacterEditor = (props) => {
    const isNewOne = props.containerType === "create";
    useEffect(() => {
        isNewOne && props.updateCharacterActionCreator(["KANJI", "TYPE"]);
    }, [isNewOne]);

    const publish = () => {
        props.toPublish();
    };

    const change = (event) => {
        const elemValue = event.target.value;

        let elemType = event.target.id;
        console.log(event.taeget);
        elemType = elemType.split("_");
        elemType.shift();
        elemType = elemType.join("_");

        props.updateCharacterActionCreator([elemValue, elemType]);
    };

    const disabledStyle = isNewOne
        ? "bg-rose-200"
        : "bg-rose-100 text-rose-300";

    return (
        <div className="grid grid-cols-2 gap-10 m-4">
            <div className="col-span-2">
                <div className="flex flex-row">
                    <div>
                        <p className="font-bold text-xl">id: {props.id}</p>
                    </div>
                    <div className="grow" />
                    <button
                        onClick={publish}
                        className="bg-rose-300 pr-6 pl-6 pt-2 pb-2 font-semibold rounded-full hover:bg-rose-400 hover:shadow"
                    >
                        {"Save & Publish"}
                    </button>
                </div>
            </div>
            <div className="cols-span-1 space-y-3">
                <div className="flex items-center justify-start space-x-4 text-bold break-normal min-h-fit">
                    <label
                        for={`${stylesheet}_TITLE`}
                        className="basis-1/4 w-full text-sm cursor-pointer font-bold"
                    >
                        Symbol:
                    </label>
                    <input
                        id={`${stylesheet}_TITLE`}
                        onChange={change}
                        type="text"
                        className="basis-3/4 w-full font-semibold text-6xl text-center rounded-lg bg-rose-200 h-22"
                        value={props.title}
                    />
                </div>
                <div className="flex items-center justify-start space-x-4 text-bold break-normal min-h-fit">
                    <label
                        for={`${stylesheet}_TYPE`}
                        className="basis-1/4 w-full text-sm cursor-pointer font-bold"
                    >
                        Type:
                    </label>
                    <select
                        id={`${stylesheet}_TYPE`}
                        onChange={change}
                        name={`${stylesheet}_TYPE`}
                        disabled={!isNewOne}
                        type="text"
                        className={`basis-3/4 w-full font-semibold text-center rounded-lg ${disabledStyle} h-22`}
                        value={props.title}
                    >
                        <option value="KANJI" selected="selected">
                            kanji
                        </option>
                        <option value="COMPONENT">component</option>
                    </select>
                </div>
                <div className="flex items-center justify-start space-x-4 text-bold break-normal min-h-fit">
                    <label
                        for={`${stylesheet}_VARIANTS`}
                        className="basis-1/4 w-full text-sm cursor-pointer font-bold"
                    >
                        Variants:
                    </label>
                    <input
                        id={`${stylesheet}_VARIANTS`}
                        onChange={change}
                        type="text"
                        className="basis-3/4 w-full pl-2 pr-2 font-semibold self-end text-center rounded-lg bg-rose-200 h-8"
                        value={props.variants}
                    />
                </div>
                <div className="flex items-center justify-start space-x-4 text-bold break-normal min-h-fit">
                    <label
                        for={`${stylesheet}_MEANING`}
                        className="basis-1/4 w-full text-sm cursor-pointer font-bold"
                    >
                        Meaning:
                    </label>
                    <input
                        id={`${stylesheet}_MEANING`}
                        onChange={change}
                        type="text"
                        className="basis-3/4 w-full pl-2 pr-2 font-semibold self-end text-center rounded-lg bg-rose-200 h-8"
                        value={props.meaning}
                    />
                </div>
                <div className="flex items-center justify-start space-x-4 text-bold break-normal min-h-fit">
                    <label
                        for={`${stylesheet}_DESCRIPTION`}
                        className="basis-1/4 w-full text-sm cursor-pointer font-bold"
                    >
                        Description:
                    </label>
                    <textarea
                        id={`${stylesheet}_DESCRIPTION`}
                        onChange={change}
                        className="basis-3/4 w-full p-2 font-semibold self-end text-center text-normal rounded-lg bg-rose-200 h-24"
                        value={props.description}
                    />
                </div>
                <div className="flex items-center justify-start space-x-4 text-bold break-normal min-h-fit">
                    <label
                        for={`${stylesheet}_MNEMO_DISC`}
                        className="basis-1/4 w-full text-sm cursor-pointer font-bold"
                    >
                        Mnemo description:
                    </label>
                    <textarea
                        id={`${stylesheet}_MNEMO_DISC`}
                        onChange={change}
                        className="basis-3/4 w-full p-2 font-semibold self-end text-center text-normal rounded-lg bg-rose-200 h-24"
                        value={props.mnemoDisc}
                    />
                </div>
                {props.type === "KANJI" && (
                    <div className="flex flex-col space-y-4">
                        <div>
                            <div className="flex items-center justify-start space-x-4 text-bold break-normal min-h-fit">
                                <label
                                    for={`${stylesheet}_EXAM_LEVEL`}
                                    className="basis-1/4 w-full text-sm cursor-pointer font-bold"
                                >
                                    Exam level:
                                </label>
                                <select
                                    id={`${stylesheet}_EXAM_LEVEL`}
                                    value={props.examLevel}
                                    onChange={change}
                                    name={`${stylesheet}_EXAM_LEVEL`}
                                    type="text"
                                    className={`basis-3/4 w-full font-semibold text-center rounded-lg bg-rose-200 h-22`}
                                >
                                    <option value={null} selected="selected">
                                        none
                                    </option>
                                    <option value={5}>5</option>
                                    <option value={4}>4</option>
                                    <option value={3}>3</option>
                                    <option value={2}>2</option>
                                    <option value={1}>1</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <Dropdown
                                name="associations"
                                updateCharacterActionCreator={
                                    props.updateCharacterActionCreator
                                }
                                {...props}
                            />
                            <div className="mt-2 bg-rose-100 rounded-lg w-full h-10"></div>
                        </div>
                        <div>
                            <Dropdown
                                name="translations"
                                updateCharacterActionCreator={
                                    props.updateCharacterActionCreator
                                }
                                {...props}
                            />
                        </div>
                        <div>
                            <Dropdown
                                name="examples"
                                updateCharacterActionCreator={
                                    props.updateCharacterActionCreator
                                }
                                {...props}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="cols-span-1">
                <div className="flex flex-col space-y-6">
                    <div>
                        <div className="flex justify-center">
                            <div
                                className="h-[200px] w-[200px] bg-contain bg-no-repeat bg-center mb-4"
                                style={{
                                    backgroundImage: `url(${strokeOrderBg})`,
                                }}
                            >
                                <div className="grid place-content-center h-full w-full">
                                    {props.img ? (
                                        <img
                                            src={props.img}
                                            className="h-[200px] w-[200px] border-4 border-rose-900"
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-start space-y-2 text-bold break-normal min-h-fit">
                            <label
                                for={`${stylesheet}_STROKE_ORDER_IMG`}
                                className="w-full text-sm text-center cursor-pointer font-bold"
                            >
                                Stroke order image URL:
                            </label>
                            <input
                                id={`${stylesheet}_STROKE_ORDER_IMG`}
                                onChange={change}
                                type="text"
                                className="w-full pl-2 pr-2 font-semibold self-end text-center rounded-lg bg-rose-200 h-8"
                                value={props.img}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-center">
                            <div
                                className="h-[112.5px] w-[200px] bg-contain bg-no-repeat bg-center mb-4"
                                style={{
                                    backgroundImage: `url(${mnemoImgBg})`,
                                }}
                            >
                                <div className="grid place-content-center h-full w-full">
                                    {props.mnemoImg ? (
                                        <img
                                            src={props.mnemoImg}
                                            className="h-[112.5px] w-[200px] border-4 border-rose-900"
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-start space-y-2 text-bold break-normal min-h-fit">
                            <label
                                for={`${stylesheet}_MNEMO_IMG`}
                                className="w-full text-sm text-center cursor-pointer font-bold"
                            >
                                Mnemo image URL:
                            </label>
                            <input
                                id={`${stylesheet}_MNEMO_IMG`}
                                onChange={change}
                                type="text"
                                className="w-full pl-2 pr-2 font-semibold self-end text-center rounded-lg bg-rose-200 h-8"
                                value={props.mnemoImg}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterEditor;
