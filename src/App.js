import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";

import { userCheckAuth } from "./asyncActions/http/user";
import {
    setAuthActionCreator,
    setUserActionCreator,
} from "./redux/reducers/user/userActionCreators";

import Main from "./components/Main/Main";
import LoadingMain from "./components/Main/LoadingMain";
import WindowSizeWarning from "./components/Main/windowSizeWarning";
import Start from "./components/Start/Start";
import Quiz from "./components/Quiz/Quiz";

function App() {
    const [loading, setLoading] = useState(true);
    const isPageLoading = useSelector((state) => state.common.isPageLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        userCheckAuth()
            .then((userData) => {
                if (userData) {
                    dispatch(setUserActionCreator(userData));
                    dispatch(setAuthActionCreator());
                }
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            });
    }, []);

    const [isWidthEnough, setIsWidthEnough] = useState(window.innerWidth > 450);
    window.addEventListener("resize", () => {
        if (window.innerWidth > 450 !== isWidthEnough) {
            setIsWidthEnough(window.innerWidth > 450);
        }
    });

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Start />} />
                <Route
                    path="/*"
                    element={
                        isWidthEnough ? (
                            loading ? (
                                <LoadingMain />
                            ) : (
                                <Main />
                            )
                        ) : (
                            <WindowSizeWarning />
                        )
                    }
                />
                <Route path="/quiz" element={<Quiz />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
