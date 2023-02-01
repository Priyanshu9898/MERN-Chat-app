import React,{useState, useEffect} from 'react'

import { VStack, HStack, Text, Heading, Box, Avatar} from "@chakra-ui/react";
import './Contact.css';


const Contact = ({contacts, currentUser, changeChat }) => {


  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentUserAvatar, setCurrentUserAvatar] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() =>{

    
    const setUser = async () => {
      if(currentUser){
        setCurrentUsername(currentUser.username);
        setCurrentUserAvatar(currentUser.avatarImage);
      }
      // else{
      //   toast.error("Error connecting....", toastOptions);
      // }
    }

    setUser();

  }, [currentUser]);


  const handleChat = (index , contact) => {
    setCurrentChat(index);
    changeChat(contact);
  }

  return (
    <>
      <Box css={{backgroundColor: "#080420"}}  className="container">

      <HStack mb={"12px"}>
          <img src="" alt="Logo" />
          <Heading  color="white">SNAPPY</Heading>
        </HStack >

      <Box className="contacts">
      <VStack   alignItems="flex-start"  spacing={["4", "4"]}  css={{backgroundColor: "#080420"}} p={["0px", "10px"]} >

        


        {contacts.map((contact, index) => {
          return(
            <>
              <Box  key={contact._id} className={`contactBox ${
                    index === currentChat ? "selected" : ""
                  }`}

                   onClick = {() => handleChat(index, contact)}>
                <HStack spacing={["2", "3"]} >
                  <Avatar size={"lg"} src={contact.avatarImage} alt="" />
                  <Text color="whiteAlpha.800">{contact.username}</Text>
                
                </HStack>
              </Box>
            </>
          )
        })}

            

      </VStack>
      </Box>
      <Box className="admin">
          <HStack spacing={["2", "2"]} alignItems={"center"} justifyContent={"center"}>
              <Avatar size={"xl"} src={currentUserAvatar} alt="" />
              <Text fontSize={"25px"} color="whiteAlpha.900">{currentUsername}</Text>
                
          </HStack>
      </Box>
      </Box>
    </>
  )
}

export default Contact