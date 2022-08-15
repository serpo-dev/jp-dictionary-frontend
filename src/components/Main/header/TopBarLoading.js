import React from 'react';
import stylesheet from './TopBarLoading.module.css';

const TopBarLoading = (props) => {

    return (
        <div className='w-full h-2'>
            <div className={stylesheet.barBody}>
                <div className={stylesheet.well}>
                    <div className={stylesheet.progress_bar} />
                </div>
            </div>
        </div>
    );
};

export default TopBarLoading;