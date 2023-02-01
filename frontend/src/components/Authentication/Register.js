import React, {useState, useEffect} from 'react'
import {Container, Box, VStack, Heading, Button , FormControl,
  FormLabel, Input} from "@chakra-ui/react";
import {Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerAPI } from '../utils/API_Request';


const Register = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('chat-user')){
      navigate('/');
    }
  }, []);

  const [values, setValues] = useState({
    username: "",
    name : "",
    email : "",
    password : "",
    cpassword : "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }

  const handleChange = (e) => {
    setValues({...values , [e.target.name]: e.target.value});
  }

  const handleValidation = ()=>{
    const {username,name, email, password, cpassword} = values;
    
    if(!username || !name || !email || !password || !cpassword) {
      toast.error("Enter All Fields", toastOptions);
      return false;
    }

    else if(name.length < 3){
      toast.error("Name should be greater than or equal to 3 characters", toastOptions);
      return false;
    }

    else if(username.length < 3){
      toast.error("Username should be greater than or equal to 3 characters", toastOptions);
      return false;
    }


    else if(email.length < 6){
      toast.error("Email should be greater than or equal to 6 characters", toastOptions);
      return false;
    }

    else if(password.length < 6){
      toast.error("Password should be greater than or equal to 6 characters", toastOptions);
      return false;
    }

    else if(password !== cpassword){
      toast.error("Password does not match", toastOptions);
      return false;
    }

    return true;

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    if(handleValidation()){
      const {name, email, username, password} = values;

      const {data} = await axios.post(registerAPI, {
        name,
        username,
        email,
        password
      });

      if(data.success === true){
        localStorage.setItem("chat-user", JSON.stringify(data.user));
        navigate("/");
      }
      else{
        toast.error(data.message, toastOptions);
      }
    };
    



  }

  return (
    <>
    <Container h={"100vh"}>
      
      
      <VStack h={"full"} spacing={["6", "8"]} alignItems="center" justifyContent={"center"} my={"4"}>
        <Heading textAlign={"center"}>Register</Heading>

        <form style={{width: '100%'}} onSubmit={handleSubmit}>

                  
                    <Box my={"4"}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="name" >Name</FormLabel>
                            <Input placeholder='Enter your name' id="name" name="name" focusBorderColor='teal.400' value={values.name} onChange={handleChange} type={"text"} />
                        </FormControl>
                    </Box>

                    <Box my={"4"}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="name" >User Name</FormLabel>
                            <Input placeholder='Enter your Username' id="username" name="username" focusBorderColor='teal.400' value={values.username} onChange={handleChange} type={"text"} />
                        </FormControl>
                    </Box>

                    <Box my={"4"}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="email" >Email Address</FormLabel>
                            <Input placeholder='abc@gmail.com' id="email" name="email" focusBorderColor='teal.400' value={values.email} onChange={handleChange} type={"email"} />
                        </FormControl>
                    </Box>
                    <Box my={"4"}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="password" >Password</FormLabel>
                            <Input placeholder='Enter Your Password' id="password" name="password" focusBorderColor='teal.400' value={values.password} onChange={handleChange} type={"password"} />
                        </FormControl>
                    </Box>
                    <Box my={"4"}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="confirm password" >Confirm Password</FormLabel>
                            <Input placeholder='Enter Your Password Again' id="cpassword" name="cpassword" focusBorderColor='teal.400' value={values.cpassword} onChange={handleChange} type={"password"} />
                        </FormControl>
                    </Box>
                    
                    
                    <VStack my={"6"} alignItems="center" justifyContent={"center"}>
                        
                        <Button colorScheme='teal' variant='solid' type="submit" >Register</Button>
                        
                    
                        <Box my={"4"} >
                            <span>Existing User?{"  "}</span>
                            <Link to="/login">
                                <Button variant="link" color={"teal"} className="registerTxt" style={{textDecoration: "none"}}>{"\t"}Login</Button>
                            </Link>
                            {" "}here
                        </Box>
                    </VStack>
                </form>
      </VStack>
      <ToastContainer />
    </Container>
    
    
    
    </>
  )
}

export default Register