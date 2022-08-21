import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import stylesheet from './CharacterEditor.module.css';

import { setCharacterThunk } from '../../../../../../asyncActions/characterThunks';


const mapStateToProps = (state) => {
    const character = state.character;
    return {
        id: character.id,
        URI: character.URI,
        type: character.type,
        title: character.title,
        meaning: character.meaning,
        mnemoDisc: character.mnemoDisc,
        mnemoImg: character.mnemoImg,
        img: character.img,
        examLevel: character.examLevel,

        attemptToLoad: character.attemptToLoad,
    };
};

const CharacterEditor = (props) => {
    const params = useParams();
    const characterId = Number(params.name.split('-')[0]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCharacterThunk(characterId));
    }, []);
    const navigate = useNavigate();
    if (props.id) {
        if (params.name !== props.URI) {
            navigate(`../${props.URI}/edit`);
        };
    } else if (!props.id && props.attemptToLoad) {
        navigate(`../`);
    };

    const strokeOrderBg = 'https://sun9-8.userapi.com/impg/84dy_Vw6sKKsf_VKXzm35cvW7TazAB40saNurg/GnHB2b1LW0g.jpg?size=903x903&quality=95&sign=f202a7755616f6ea299bc8f1d437d088&type=album';
    const mnemoImgBg = 'https://sun9-60.userapi.com/impg/n2f52MwrospZ7bM27DxsbJX4gMFoc5D6WQwF2g/eS-hMUzWY_k.jpg?size=1710x967&quality=95&sign=414bccc84b916dbac85773a57a9f9caa&type=album';

    return (
        <div className='grid grid-cols-2 gap-10 m-4'>
            <div className='col-span-2'>
                <div className='flex flex-row'>
                    <div>
                        <p className='font-bold text-xl'>id: {props.id} </p>
                    </div>
                    <div className='grow' />
                    <button className='bg-rose-300 pr-6 pl-6 pt-2 pb-2 font-semibold rounded-full hover:bg-rose-400 hover:shadow'>{'Save & Publish'}</button>
                </div>
            </div>
            <div className='cols-span-1 space-y-3'>
                <div className='flex items-center justify-start space-x-4 text-bold break-normal min-h-fit'>
                    <label for={`${stylesheet}_SYMBOL`} className='basis-1/4 w-full text-sm cursor-pointer font-bold'>Symbol:</label>
                    <input id={`${stylesheet}_SYMBOL`} disabled type='text' className='basis-3/4 w-full font-semibold text-6xl text-center rounded-lg bg-rose-100 text-rose-300 h-22' value={props.title} />
                </div>
                <div className='flex items-center justify-start space-x-4 text-bold break-normal min-h-fit'>
                    <label for={`${stylesheet}_MEANING`} className='basis-1/4 w-full text-sm cursor-pointer font-bold'>Meaning:</label>
                    <input id={`${stylesheet}_MEANING`} type='text' className='basis-3/4 w-full pl-2 pr-2 font-semibold self-end text-center rounded-lg bg-rose-200 h-8' value={props.meaning} />
                </div>
                <div className='flex items-center justify-start space-x-4 text-bold break-normal min-h-fit'>
                    <label for={`${stylesheet}_MNEMO_DISC`} className='basis-1/4 w-full text-sm cursor-pointer font-bold'>Mnemo discription:</label>
                    <textarea id={`${stylesheet}_MNEMO_DISC`} className='basis-3/4 w-full p-2 font-semibold self-end text-center text-normal rounded-lg bg-rose-200 h-24' value={props.mnemoDisc} />
                </div>


            </div>
            <div className='cols-span-1'>
                <div className='flex flex-col space-y-6'>
                    <div>
                        <div className='flex justify-center'>
                            <div className='h-[200px] w-[200px] bg-contain bg-no-repeat bg-center mb-4 ' style={{ backgroundImage: `url(${strokeOrderBg})` }}>
                                <div className='grid place-content-center h-full w-full'>
                                    {props.img ? <img src={props.img} className='h-full w-full border-4 border-rose-900' /> : null}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col justify-start space-y-2 text-bold break-normal min-h-fit'>
                            <label for={`${stylesheet}_STROKE_ORDER_IMG`} className='w-full text-sm text-center cursor-pointer font-bold'>Stroke order image URL:</label>
                            <input id={`${stylesheet}_STROKE_ORDER_IMG`} type='text' className='w-full pl-2 pr-2 font-semibold self-end text-center rounded-lg bg-rose-200 h-8' value={props.img} />
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-center'>
                            <div className='h-[112.5px] w-[200px] bg-contain bg-no-repeat bg-center mb-4' style={{ backgroundImage: `url(${mnemoImgBg})` }}>
                                <div className='grid place-content-center h-full w-full'>
                                    {props.img ? <img src={props.mnemoImg} className='h-full w-full border-4 border-rose-900' /> : null}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col justify-start space-y-2 text-bold break-normal min-h-fit'>
                            <label for={`${stylesheet}_STROKE_ORDER_IMG`} className='w-full text-sm text-center cursor-pointer font-bold'>Mnemo image URL:</label>
                            <input id={`${stylesheet}_STROKE_ORDER_IMG`} type='text' className='w-full pl-2 pr-2 font-semibold self-end text-center rounded-lg bg-rose-200 h-8' value={props.mnemoImg} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(CharacterEditor);