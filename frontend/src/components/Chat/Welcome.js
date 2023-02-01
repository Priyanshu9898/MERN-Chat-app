import { Container, VStack, HStack, Heading, Text, Image } from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import robot from "../../assets/robot.gif";

const Welcome = ({currentUser}) => {

const [currentUsername, setCurrentUsername] = useState(undefined);

useEffect(() => {
    if(currentUser){
        setCurrentUsername(currentUser.username);
    }
} , [currentUser]);
  return (
    <>
    <Container>
        <VStack spacing={"4"} alignItems={"center"} justifyContent={"center"}>
            <Image src={robot} alt="" height={"20rem"}/>
            <Heading color={"whiteAlpha.800"}>Welcome, <span style={{color: "#ffffff39"}}>{currentUsername}!</span></Heading>
            <Text color={"whiteAlpha.800"}>Please Select a chat to start Chatting</Text>
        </VStack>
    </Container>
    </>
  )
}

export default Welcome