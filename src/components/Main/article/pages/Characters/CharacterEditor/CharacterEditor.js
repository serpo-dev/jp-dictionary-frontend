import React from "react";
import { connect } from "react-redux";

const CharacterEditor = (props) => {



    return (
        <div className='grid grid-cols-12 gap-10'>
            <div className='col-span-8'>
                <div className='font-bold'>
                    кошка
                </div>
            </div>
            <div className='col-span-4'>
                <div className='text-6xl font-bold'>
                    猫
                </div>
            </div>
        </div>
    );
};

export default CharacterEditor;