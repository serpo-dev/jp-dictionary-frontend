import React from "react";

import Home from '../pages/Home/Home';
import Articles from '../pages/Articles/Articles';
import Characters from '../pages/Characters/Characters';
import Grammar from '../pages/Grammar/Grammar';
import Questions from '../pages/Questions/Questions';

import PageNotfoundError from "../pages/errors/PageNotFoundError";

const OnlyPage = (props) => {
    const page = props.page;
    const component = (page) => {
        switch (page) {
            case 'Home':
                return <Home />;
            case 'Articles':
                return <Articles />;
            case 'Characters':
                return <Characters />;
            case 'Grammar':
                return <Grammar />;
            case 'Questions':
                return <Questions />;
            case 'PageNotfoundError':
                return <PageNotfoundError />
            default:
                return <div>Uncommon error! Let me know about it by writting on email: sergey.potapov.2002@mail.ru</div>
        };
    };


    return (
        <div className="bg-white w-full h-fit rounded-lg">
            <div className="bg-rose-50 rounded-lg p-4">
                {component(page)}
            </div>
        </div>
    );
};

export default OnlyPage;