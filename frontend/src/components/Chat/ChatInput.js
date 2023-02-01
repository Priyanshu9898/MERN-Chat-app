import { Button, Grid, HStack, Input } from '@chakra-ui/react'
import React, {useState} from 'react'
import {GrEmoji} from "react-icons/gr";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
const ChatInput = ({handleMessage}) => {

    const [msg, setMsg] = useState("");

    const submitChat = async(e) => {
        e.preventDefault();
        handleMessage(msg);
        setMsg("");
    }
  return (
    <>
        <Grid templateColumns={"6%  94%"} width={"100%"} justifyContent={"space-between"} padding={["0px", "12px"]} alignItems={"center"}>
            <Button marginRight={["0px","7px"]} css={{backgroundColor: 'yellow'}} >
                <GrEmoji  />
            </Button>
            
                <form onSubmit={submitChat}>
                    <HStack >
                        <Input width={"100%"}  color="white" size='md' placeholder='Enter Your Message' value={msg} id="msg" name="msg" onChange={(e) => setMsg(e.target.value)} />
                        <Button type="submit" css={{backgroundColor:'#9a86f3'}} >
                            <IoMdSend  />    
                        </Button>
                    </HStack>
                </form>
           
        </Grid>
    </>
  )
}

export default ChatInput