import data from "./database/data.json";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Error from "./components/Error/Error";
import Settings from "./components/Settings/Settings";
import Home from "./components/Home/Home";
import Sidebar from "./components/Sidebar/Sidebar";
import './App.css'
import { BrowserRouter,Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

 

function App() {
 
 const [login,setLogin] = useState(sessionStorage.getItem('login'))
   
  const logoutfun =()=>{
    sessionStorage.clear()
    setLogin(sessionStorage.getItem('login'))
  }
  useEffect(()=>{

  },[login])

  return (
    <div className="App">

<div className="app-content">
    <Sidebar logoutfun={logoutfun} />
    <div className="content">

      <Routes>
        {login? <Route path="*" element={<Error log={login}  />} /> : <Route path="/"  element={<Login data={data}  />} /> }
         
        <Route path="/profile" element={<Profile log={login} />} /> 
        <Route path="/home" element={<Home />} /> 
        <Route path="/settings" element={<Settings />} /> 
         
      </Routes>
    </div>
</div>

    </div>
  );
}

export default App;
