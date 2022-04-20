import React, {useContext} from 'react';
import {Routes, Route} from "react-router-dom";
import App from "../App";
import Users from "../pages/Users/Users";
import Counter from "./Counter/Counter";
import Posts from "../pages/Posts/Posts";
import UserEdit from "../pages/Users/UserEdit";
import NotFound from "../pages/NotFound";
import AuthContext from "../context/context";
import Login from "./Login/Login";


const AppRouter = () => {
    const { auth } = useContext(AuthContext);
    return (
        auth ?
            <Routes>
                <Route path='/' element={<Users/>}/>
                <Route path='/users' element={<Users/>}/>
                <Route path='/users/:id' element={<UserEdit/>}/>
                <Route path='/counter' element={<Counter/>}/>
                <Route path='/posts' element={<Posts/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
            :
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='*' element={<Login/>}/>
            </Routes>

    );
};

export default AppRouter;