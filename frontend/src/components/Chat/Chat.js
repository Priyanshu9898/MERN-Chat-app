import React, {useState, useEffect} from 'react'
import {Container, VStack, HStack, Grid, Stack} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { allUsersAPI } from '../utils/API_Request';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contact from './Contact';
import Welcome from './Welcome';
import ChatContainer from './ChatContainer';

const Chat = () => {

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
};

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect( () => {

    const getCurrentUser = async () => {
      if(!localStorage.getItem("chat-user")){
        navigate("/login");
      }
      else{
        const user = await JSON.parse(localStorage.getItem("chat-user"))
        setCurrentUser(user);
        setIsLoaded(true);
      }
    }

    getCurrentUser();

  } , []);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const containerCss = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "1rem",
    alignItems: "center",
    backgroundColor: "#131324",
  }

  const gridCss = {
    // height: "85vh",
    // width: "85vw",
    backgroundColor: "#00000076",
    
    gridTemplateColumns : "25% 75%",
  }

  useEffect( () => {

    const getContacts = async () => {

      if(currentUser){
        if (currentUser) {
          if (currentUser.isAvatarImageSet) {
            const data = await axios.get(`${allUsersAPI}/${currentUser._id}`);
            console.log(data.data);
          
            setContacts(data.data);
          } else {
            navigate("/setAvatar");
          }
        }
      }
    }

    getContacts();

  }, [currentUser]);


  const handleChatChange = (chat) => {
    console.log("Change Chat called", chat);
    setCurrentChat(chat);
  };


  return (
    <>
    <Stack   css={containerCss}>
      <Grid css={gridCss} w={["100vw", "85vw"]} h={["100vh", "85vh"]} templateColumns={["1fr 3fr", "1fr 3fr"]}  >
        <Contact contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        {setIsLoaded && currentChat === undefined ? (

          <Welcome currentUser = {currentUser}/>
        ):(
          <ChatContainer currentChat = {currentChat} />
        )
          
        }
      </Grid>
      <ToastContainer/>
    </Stack>
    </>
  )
}

export default Chat