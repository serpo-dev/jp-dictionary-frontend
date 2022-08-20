import React from 'react';

const WindowSizeWarning = () => {
    return (
        <div className='flex justify-center items-center h-screen w-screen bg-gradient-to-r from-rose-200 to-pink-300'>
            <p className='text-center text-2xl font-bold m-10 text-rose-900'>
                Sorry, windows less than 450px wide are not supported!
            </p>
        </div>
    );
};

export default WindowSizeWarning;