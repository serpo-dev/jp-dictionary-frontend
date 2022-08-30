import React from 'react';
import stylesheet from './Example.module.css';


const Example = (props) => {
    const updateCharacterActionCreator = props.updateCharacterActionCreator;
    const num = props.num;

    const change = (event) => {
        let elemTypeSplitted = event.target.id;
        elemTypeSplitted = elemTypeSplitted.split('_');
        const field = elemTypeSplitted[2];
        const elemType = elemTypeSplitted[1];
        const value = event.target.value;
        let elemValue;
        switch (field) {
            case '1':
                elemValue = { jpNormalText: value };
                break;
            case '2':
                elemValue = { jpFuriganaText: value };
                break;
            case '3':
                elemValue = { enText: value };
                break;
            case '4':
                elemValue = { ruText: value };
                break;
        };
        updateCharacterActionCreator([elemValue, elemType, num]);
    };

    const deleting = () => {
        updateCharacterActionCreator([null, 'EXAMPLES_DELETE_ONE', num]);
    };

    return (
        <div className='flex flex-col space-y-4 bg-rose-200 rounded-md p-4'>
            <div className='flex flex-row justify-center h-10'>
                <h2>
                    Example {Number(props.num) + 1}
                </h2>
                <div className='flex-grow' />
                <div onClick={deleting} className='flex flex-col pb-1 justify-center w-6 h-6 text-xl font-bold text-pink-900 bg-pink-400 rounded-full text-center cursor-pointer active:scale-110 hover:bg-pink-500 active:bg-pink-300 transition ease duration-200'>
                    <p>x</p>
                </div>
            </div>
            <div className='flex items-center justify-start space-x-4 text-bold break-normal min-h-fit'>
                <label for={`${stylesheet}_EXAMPLES_1`} className='basis-1/4 w-full text-sm cursor-pointer font-bold'>Normal:</label>
                <input id={`${stylesheet}_EXAMPLES_1`} onChange={change} value={props.data.jpNormalText} type='text' className='basis-3/4 w-full pl-2 pr-2 font-semibold self-end text-center rounded-lg bg-rose-50 h-8' />
            </div>
            <div className='flex items-center justify-start space-x-4 text-bold break-normal min-h-fit'>
                <label for={`${stylesheet}_EXAMPLES_2`} className='basis-1/4 w-full text-sm cursor-pointer font-bold'>Furigana:</label>
                <input id={`${stylesheet}_EXAMPLES_2`} onChange={change} value={props.data.jpFuriganaText} type='text' className='basis-3/4 w-full pl-2 pr-2 font-semibold self-end text-center rounded-lg bg-rose-50 h-8' />
            </div>
            <div className='flex items-center justify-start space-x-4 text-bold break-normal min-h-fit'>
                <label for={`${stylesheet}_EXAMPLES_3`} className='basis-1/4 w-full text-sm cursor-pointer font-bold'>English:</label>
                <input id={`${stylesheet}_EXAMPLES_3`} onChange={change} value={props.data.enText} type='text' className='basis-3/4 w-full pl-2 pr-2 font-semibold self-end text-center rounded-lg bg-rose-50 h-8' />
            </div>
            <div className='flex items-center justify-start space-x-4 text-bold break-normal min-h-fit'>
                <label for={`${stylesheet}_EXAMPLES_4`} className='basis-1/4 w-full text-sm cursor-pointer font-bold'>Russian:</label>
                <input id={`${stylesheet}_EXAMPLES_4`} onChange={change} value={props.data.ruText} type='text' className='basis-3/4 w-full pl-2 pr-2 font-semibold self-end text-center rounded-lg bg-rose-50 h-8' />
            </div>
        </div>
    );
};

export default Example;