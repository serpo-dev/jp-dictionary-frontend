import React, { useEffect } from 'react';
import stylesheet from './Start.module.css';

import animeGirl from '../../assets/images/logos/animeGirl.png'
import { NavLink } from 'react-router-dom';


const Start = (props) => {

    const canvas = function () {
        // geting canvas by Boujjou Achraf
        var c = document.getElementById("c");
        var ctx = c.getContext("2d");

        //making the canvas full screen
        c.height = window.innerHeight;
        c.width = window.innerWidth;

        //chinese characters - taken from the unicode charset
        var matrix = "ああ、そんな世界があるなら、俺達は、生まれる世界を間違えたわけだ";
        //converting the string into an array of single characters
        matrix = matrix.split("");

        var font_size = 50;
        var columns = c.width / font_size; //number of columns for the rain
        //an array of drops - one per column
        var drops = [];
        //x below is the x coordinate
        //1 = y co-ordinate of the drop(same for every drop initially)
        for (var x = 0; x < columns; x++)
            drops[x] = 1;

        //drawing the characters
        function draw() {
            //Black BG for the canvas
            //translucent BG to show trail
            ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
            ctx.fillRect(0, 0, c.width, c.height);

            ctx.fillStyle = "#f4427d";//green text
            ctx.font = font_size + "px arial";
            //looping over drops
            for (var i = 0; i < drops.length; i++) {
                //a random chinese character to print
                var text = matrix[Math.floor(Math.random() * matrix.length)];
                //x = i*font_size, y = value of drops[i]*font_size
                ctx.fillText(text, i * font_size, drops[i] * font_size);

                //sending the drop back to the top randomly after it has crossed the screen
                //adding a randomness to the reset to make the drops scattered on the Y axis
                if (drops[i] * font_size > c.height && Math.random() > 0.975)
                    drops[i] = 0;

                //incrementing Y coordinate
                drops[i]++;
            }
        }

        setInterval(draw, 60);
    };

    useEffect(() => {
        canvas();
    }, []);

    return (
        <div className={stylesheet.body}>
            <div className='flex flex-col'>
                <div className='h-0 z-20'>
                    <div className='h-screen w-screen bg-gradient-to-b from-slate-50/0 via-stone-900/80 to-stone-900
                    lg:bg-gradient-to-r lg:from-slate-50/0 lg:to-stone-900/80
                    ' />
                </div>
                <div className='h-0 z-0'>
                    <canvas id='c' className='w-screen h-screen' />
                </div>
                <div className='h-0 z-10'>
                    <img src={animeGirl} className='
                        invisible h-0 brightness-50 pointer-events-none  
                        lg:visible lg:h-screen
                    ' />
                </div>
                <div className='flex flex-col h-screen w-screen z-20'>
                    <nav className='
                        flex justify-center h-20 
                        lg:justify-end 
                    '>
                        <div className='flex flex-rows space-x-10 mt-10
                            lg:mr-[10vw]
                        '>
                            <NavLink to='/auth' className='flex flex-col justify-center bg-gradient-to-r from-pink-500 to-rose-500 h-14 pl-6 pr-6 font-bold text-2xl rounded-full text-slate-900 shadow-lg hover:text-rose-100 hover:bg-rose-700 hover:scale-110 transition ease-in-out duration-300'>
                                <p>
                                    Get started for free!
                                </p>
                            </NavLink>
                        </div>
                    </nav>
                    <title className='
                        flex flex-col justify-center grow mb-[10vh] text-center
                        lg:text-right lg:mr-[10vw]
                    '>
                        <div className='
                        font-extrabold text-[150px] drop-shadow-xl 
                        sm:text-[200px]
                        lg:text-[100px]
                        xl:text-[150px]
                        2xl:text-[200px]
                        '>
                            <div className={stylesheet.pointer_events_none}>
                                <spam className='bg-clip-text text-transparent bg-gradient-to-br from-red-300 to-red-500'>
                                    j
                                </spam>
                                <span className='bg-clip-text text-transparent bg-gradient-to-br from-rose-300 to-pink-700'>
                                    Pot
                                </span>
                            </div>
                        </div>
                        <div className='
                        font-extrabold bg-clip-text text-transparent text-xl bg-gradient-to-br from-violet-500 to-pink-500
                        xl:text-2xl 
                        2xl:text-3xl 
                        '>
                            <span className=''>
                                The first&nbsp;
                            </span>
                            <span className='bg-clip-text text-transparent bg-gradient-to-br from-red-500 to-red-400'>
                                ecosystem&nbsp;
                            </span>
                            <span>
                                for
                                <p>
                                    Japanese learners.
                                </p>
                            </span>
                        </div>
                    </title>
                    <footbar className='h-14'>
                        <p className='
                        flex justify-center font-extrabold mb-6 text-xl text-right text-slate-300
                        lg:justify-end lg:mr-20
                        2xl:text-center 2xl:ml-20 2xl:mr-0 2xl:justify-center
                        '>
                            <span className={stylesheet.pointer_events_none}>
                                © 2022,&nbsp;
                            </span>
                            <a href='https://github.com/yphwd' target='_blank' title='Github profile.' className='hover:text-rose-600 transition ease-in-out duration-300'>
                                yphwd
                            </a>
                        </p>
                    </footbar>
                </div>
                <div className='h-0 z-0 opacity-50'>
                    <ul class={stylesheet.circles}>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Start;