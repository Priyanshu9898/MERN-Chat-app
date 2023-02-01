import { Avatar, HStack, VStack, Text, Box, Container, Stack } from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import ChatInput from './ChatInput';
import Logout from './Logout';

const ChatContainer = ({currentChat}) => {

  const [currChat, setCurrChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {

    const setChat = async() => {
      if(currentChat){
        setCurrChat(currentChat);
        setIsLoaded(true);
        // console.log(currentChat);
      }
    }


    setChat();
  }, [currentChat]);

  const handleMessage = async() => {
    console.log("gaga");
  }

  return (
    <>
    { isLoaded  && currChat  ? (
      
          <>

            <VStack  justifyContent={"space-between"} padding={["12px", "10px"]}>
              <HStack width={"100%"} justifyContent={"space-between"}>
                <HStack spacing={"2"}>
                  <Avatar src={currentChat.avatarImage} alt="" size={"md"} />
                  <Text>{currentChat.username}</Text>
                </HStack>
                <Logout />
              </HStack>

              {/* Chat Messages */}
              <Box>
                
              </Box>

              {/* ChatInput */}
              <ChatInput handleMessage={handleMessage} />


            </VStack>
           
          </>
      ):(
        <></>
      )
    }
      
    </>
  )
}

export default ChatContainer