import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./Home/Home";
import Auth from './Auth/Auth';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavLink to='/home'>Home</NavLink>
        <NavLink to='auth'>Auth</NavLink>
        <Routes>

            <Route path='home' element={<Home />} />
            <Route path='auth' element={<Auth />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;