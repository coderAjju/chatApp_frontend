import React, { useEffect } from 'react';
import Registration from './RegistrationPage';
import RoomSelection from './RoomSelection';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
    const username = localStorage.getItem("username");
    console.log("username from registration page: ",username)
    const navigate = useNavigate();
    useEffect(()=>{
        if(!username){
            navigate('/register')
        }else{
            navigate('/roomSelection')
        }
    })
    return (
        <></>
    )
};

export default Layout;
