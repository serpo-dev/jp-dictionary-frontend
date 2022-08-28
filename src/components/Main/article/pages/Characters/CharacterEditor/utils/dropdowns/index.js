import React, { useEffect, useState } from 'react';
import stylesheet from './index.module.css';

import Association from '../Association';
import Translation from '../Translation';
import Example from '../Example';


const Dropdown = (props) => {
    const dropdownType = props.name;
    let newData = [];
    let data;
    let valueType;
    switch (dropdownType) {
        case 'associations':
            data = props.associations;
            valueType = 'ASSOCIATONS_NEW_ONE';
            break;
        case 'translations':
            data = props.translations;
            valueType = 'TRANSLATIONS_NEW_ONE';
            break;
        case 'examples':
            data = props.examples;
            valueType = 'EXAMPLES_NEW_ONE'
            break;
    };
    switch (dropdownType) {
        case 'associations':
            newData = <Association updateCharacterActionCreator={props.updateCharacterActionCreator} data={data} />
            break;
        case 'translations':
            for (const i in data) {
                newData.push(<Translation updateCharacterActionCreator={props.updateCharacterActionCreator} data={data[i]} num={i} />);
            };
            break;
        case 'examples':
            for (const i in data) {
                newData.push(<Example updateCharacterActionCreator={props.updateCharacterActionCreator} data={data[i]} num={i} />);
            };
            break;
    };
    const add = () => {
        props.updateCharacterActionCreator([null, valueType])
    };

    useEffect(() => {
        const isLastField =
            props.lastField === undefined
            || (props.lastField === 'ASSOCIATIONS' && dropdownType === 'associations')
            || (props.lastField === 'TRANSLATIONS' && dropdownType === 'translations')
            || (props.lastField === 'EXAMPLES' && dropdownType === 'examples')
            || (props.lastField === 'ASSOCIATIONS_NEW_ONE' && dropdownType === 'associations')
            || (props.lastField === 'TRANSLATIONS_NEW_ONE' && dropdownType === 'translations')
            || (props.lastField === 'EXAMPLES_NEW_ONE' && dropdownType === 'examples');

        const isChangedField = isLastField
        if (isChangedField) {
            const contentSize = document.querySelector(`#${dropdownType}_${stylesheet.containerText_body}`).offsetHeight;
            document.querySelector(`#${dropdownType}_${stylesheet.dropdown_body}`).style.maxHeight = `${contentSize}px`;
        };
    }, [props]);

    const [heightToggle, setHeightToggle] = useState(true);
    const click = () => {
        const dropElem = document.querySelector(`#${dropdownType}_${stylesheet.dropdown_body}`);
        const textElem = document.querySelector(`#${dropdownType}_${stylesheet.containerText_body}`);
        const triangleElem = document.querySelector(`#${dropdownType}_${stylesheet.triangle_down}`);
        dropElem.classList.toggle(stylesheet.dropdown_hide);
        textElem.classList.toggle(stylesheet.containerText_hide);
        triangleElem.classList.toggle(stylesheet.triangle_right);
        if (heightToggle) {
            document.querySelector(`#${dropdownType}_${stylesheet.dropdown_body}`).style.maxHeight = `0px`;
        } else {
            const contentSize = document.querySelector(`#${dropdownType}_${stylesheet.containerText_body}`).offsetHeight;
            document.querySelector(`#${dropdownType}_${stylesheet.dropdown_body}`).style.maxHeight = `${contentSize}px`;
        };
        setHeightToggle(!heightToggle);
    };


    return (
        <div>
            <div className='flex flex-row items-center space-x-4 h-14'>
                <h2>
                    <input type='checkbox' id={`${dropdownType}_${stylesheet.containerCheckbox}`} onClick={click} className={stylesheet.containerCheckbox} defaultChecked={true} />
                    <label for={`${dropdownType}_${stylesheet.containerCheckbox}`} className={stylesheet.containerTitle}>
                        <div className='flex flex-row'>
                            <p className='w-4'>
                                <div id={`${dropdownType}_${stylesheet.triangle_down}`} className={stylesheet.triangle_down} />
                            </p>
                            <h2 className='text-xl font-bold p-0 -mt-2 ml-2'>{dropdownType}</h2>

                        </div>
                    </label>
                </h2>
                <div onClick={add} className='flex flex-col justify-center hover:scale-110 active:bg-rose-100 hover:bg-rose-500 transition ease-in-out duration-200 bg-rose-400 h-8 w-8 rounded-full text-center font-black text-2xl text-rose-900 cursor-pointer'>
                    <p className='-mt-1'>
                        +
                    </p>
                </div>
            </div>
            <div id={`${dropdownType}_${stylesheet.dropdown_body}`} className={stylesheet.dropdown_body}>
                <div id={`${dropdownType}_${stylesheet.containerText_body}`} className={stylesheet.containerText_body}>
                    {newData}
                </div>
            </div>
        </div>
    );
};

export default Dropdown;