import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux/es/exports';

import { userCheckAuth } from './asyncActions/http/user';
import { setAuthActionCreator, setUserActionCreator } from './redux/reducers/user/userActionCreators';

import Main from './components/Main/Main';
import LoadingMain from './components/Main/LoadingMain';
import Start from './components/Start/Start';
import Quiz from './components/Quiz/Quiz';

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth
});

function App(props) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    userCheckAuth()
      .then((userData) => {
        if (userData) {
          console.log(userData)
          dispatch(setUserActionCreator(userData));
          dispatch(setAuthActionCreator());
        };
      })
      .finally(console.log('Page loaded!'));
    setTimeout((data) => { setLoading(false) }, 500);
  }, []);

  const isAuth = props.isAuth;

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/*' element={loading ? <LoadingMain /> : <Main />} />
        <Route path='/quiz' element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default connect(mapStateToProps)(App);