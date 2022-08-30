import React from 'react';

const WindowSizeWarning = () => {
    return (
        <div className='flex justify-center items-center h-screen w-screen bg-gradient-to-r from-rose-200 to-pink-300'>
            <p className='text-center text-2xl font-bold m-10 text-rose-900'>
                Sorry, screens less than 450px wide and mobile devices are not supported!
            </p>
            <p className='text-center text-2xl font-bold m-10 text-rose-900'>
                You can download a free application for Android or iOS.
            </p>
        </div>
    );
};

export default WindowSizeWarning;