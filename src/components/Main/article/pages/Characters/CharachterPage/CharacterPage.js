import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { NavLink, useParams } from 'react-router-dom';

import mnemoPic from './mnemoPic.png';

import PageNotfoundError from '../../errors/PageNotFoundError';

const CharacterPage = (props) => {
    const [_windowWidth, setWindowWidth] = useState();
    window.addEventListener('resize', event => {
        setWindowWidth(window.innerWidth);
    });
    let rectLeft = document.getElementById('dynamic_bg_article')
        ? document.getElementById('dynamic_bg_article').getBoundingClientRect().left - 16 + 'px'
        : '0px';
    const setBgImageSize = function () {
        if (_windowWidth < 768) {
            return `${_windowWidth}px ${_windowWidth * 0.5625}px`;
        } else if (_windowWidth < 1024) {
            return '500px 281px';
        } else if (_windowWidth < 1280) {
            return '600px 338px';
        } else {
            return '700px 394px';
        };
    };


    const params = useParams();
    const characterId = Number(params.name.split('-')[0]);

    const {
        id,
        type,
        title,
        meaning,
        mnemoDisc,
        mnemoImg,
        img,
        components
    } = useSelector(state => state.characters.lastCharacter);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'GET_ONE', payload: characterId });
    }, []);



    if (characterId) {
        return (
            <div id='dynamic_bg_article'>
                <div className='grid grid-cols-12 -m-4'>
                    <div className='col-span-12'>
                        <div className='h-[250px] bg-no-repeat bg-fixed rounded-lg' style={{
                            backgroundImage: `url(${mnemoPic})`,
                            backgroundPositionY: '78px',
                            backgroundPositionX: `${rectLeft}`,
                            backgroundSize: `${setBgImageSize()}`
                        }} />
                    </div>
                    <div className='col-span-4 mt-4 mb-4'>

                    </div>
                    <div className='col-span-4 text-center mt-4 mb-4'>
                        <p className='text-7xl font-bold'>
                            皆
                        </p>
                        <p className='text-2xl font-bold '>
                            все (о людях)
                        </p>
                    </div>
                    <div className='col-span-4 mt-4 mb-4'>

                    </div>

                    <div className='col-span-12'>

                    </div>
                </div>
            </div>
        );
    } else {
        return <PageNotfoundError />;
    };
};

export default CharacterPage;