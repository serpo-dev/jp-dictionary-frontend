import React from 'react';
import stylesheet from './Association.module.css';


const Association = (props) => {
    const ids = [];
    for (const i in props.data) {
        ids.push(props.data[i].id);
    };
    const stringIds = ids.join(', ');
    // const change = () => {
    //     props.updateCharacterActionCreator([elemValue, elemNum]);
    // };

    return (
        <div>
            <h2>
                Total: {ids.length}
            </h2>
            <div className='flex items-center justify-start space-x-4 text-bold break-normal min-h-fit'>
                <label for={`${stylesheet}_ASSOCIATIONS`} className='basis-1/4 w-full text-sm cursor-pointer font-bold'>Translations:</label>
                <input id={`${stylesheet}_ASSOCIATIONS`} value={stringIds} type='text' className='basis-3/4 w-full pl-2 pr-2 font-semibold self-end text-center rounded-lg bg-rose-200 h-8' />
            </div>
        </div>
    );
};

export default Association;