import { Button } from '@chakra-ui/react';
import React from 'react'
import {BiPowerOff} from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate();

    const handleClick = async() => {
        localStorage.clear();
        navigate("/login");
    }

    const btnCSS = {
        cursor : "pointer",
        fontSize : "1.5rem",
        backgroundColor: "#9a86f3",

    }

  return (
    <>
        <Button css= {btnCSS}> 
            <BiPowerOff onClick={handleClick} />
        </Button>
    </>
  )
}

export default Logout