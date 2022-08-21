import React from 'react';
import stylesheet from './index.module.css';

const Dropdown = (props) => {
    const dropdownType = props.type;

    const click = () => {
        const dropElem = document.querySelector(`#${dropdownType}_${stylesheet.dropdown_body}`);
        const textElem = document.querySelector(`#${dropdownType}_${stylesheet.containerText_body}`);
        const triangleElem = document.querySelector(`#${dropdownType}_${stylesheet.triangle_down}`);
        dropElem.classList.toggle(stylesheet.dropdown_hide);
        textElem.classList.toggle(stylesheet.containerText_hide);
        triangleElem.classList.toggle(stylesheet.triangle_right);
    };

    return (
        <div >
            <input type='checkbox' id={`${dropdownType}_${stylesheet.containerCheckbox}`} onClick={click} className={stylesheet.containerCheckbox} defaultChecked={true} />
            <label for={`${dropdownType}_${stylesheet.containerCheckbox}`} className={stylesheet.containerTitle}>
                <div className='flex flex-row'>
                    <p className='w-4'>
                        <div id={`${dropdownType}_${stylesheet.triangle_down}`} className={stylesheet.triangle_down} />
                    </p>
                    <h2 className='text-xl font-bold p-0 -mt-2 ml-2'>{dropdownType}</h2>
                </div>
            </label>
            <div id={`${dropdownType}_${stylesheet.dropdown_body}`} className={stylesheet.dropdown_body}>
                <div id={`${dropdownType}_${stylesheet.containerText_body}`} className={stylesheet.containerText_body}>
                    <p>1. Cat</p>
                    <p>2. Kitten</p>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;