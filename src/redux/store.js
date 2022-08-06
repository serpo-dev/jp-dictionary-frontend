import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { userReducer } from "./reducers/user/userReducer";

import { articlesReducer } from './reducers/article/articleReducer'
import { characterReducer } from "./reducers/character/characterReducer";
import { grammarReducer } from './reducers/grammar/grammarReducer';
import { questionsReducer } from './reducers/questions/questionsReducer';

const rootReducer = combineReducers({
    user: userReducer,

    articles: articlesReducer,
    characters: characterReducer,
    grammar: grammarReducer,
    questions: questionsReducer
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;