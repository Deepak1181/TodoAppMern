import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Alltask from './pages/Alltask';
import ImportantTask from './pages/ImportantTask';
import InCompleteTask from './pages/InCompleteTask';
import CompleteTask from './pages/CompleteTask';
import Signup from './pages/signup';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
const App = () => {
const navigate= useNavigate()
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
  console.log(isLoggedIn)
 
  const dispatch= useDispatch()
  useEffect(()=>{
    if(localStorage.getItem("id")&& localStorage.getItem("token")){
      dispatch(authActions.login())
    }
    else if(!isLoggedIn){
      navigate("/signup");

    }
  },[])
  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
      <Routes>
        <Route exact path="/" element={<Home />} >
        
        
        <Route index element={<Alltask />} />
        <Route path="/importantTask" element={<ImportantTask />} />
        <Route path="/inCompleteTask" element={<InCompleteTask />} />
        <Route path="/completeTask" element={<CompleteTask />} />
        
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />


      </Routes>
    </div>
  );
};

export default App;
