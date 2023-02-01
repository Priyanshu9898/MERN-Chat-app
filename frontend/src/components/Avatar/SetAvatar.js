import React, {useState, useEffect} from 'react'
import {Container, VStack, Heading, Button , 
   HStack, Avatar, Image, Select} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setAvatarAPI } from '../utils/API_Request';
import spinner from '../../assets/gg.gif';
import "./avatar.css";

// import Buffer from "buffer";
const { uniqueNamesGenerator, colors, animals, countries, names, languages  } = require('unique-names-generator');




const SetAvatar = () => {



    const sprites = [
        "adventurer",
        "micah",
        "avataaars",
        "bottts",
        "initials",
        "gridy",
        "adventurer-neutral",
        "male",
        "female",
        "human",
        "jdenticon",
        "big-ears",
        "big-ears-neutral",
        "big-smile",
        "croodles",
        "croodles-neutral",
        "identicon",
        "miniavs",
        "open-peeps",
        "personas",
        "pixel-art",
        "pixel-art-neutral",
        "identicon",
      ];
      

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

    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [selectedSprite, setSelectedSprite] = React.useState(sprites[0]);

    useEffect(()=>{
        if(!localStorage.getItem("chat-user")){
            navigate("/login");
        }
    }, [])

    const randomName = ()=>{
        let shortName = uniqueNamesGenerator({
            dictionaries: [ animals, colors, countries, names, languages ], // colors can be omitted here as not used
            length: 2
        }); 
        // console.log(shortName);

        return shortName;
    }
    


    const [imgURL, setImgURL] = React.useState([
        `https://avatars.dicebear.com/api/${sprites[0]}/${randomName()}.svg`,
        `https://avatars.dicebear.com/api/${sprites[0]}/${randomName()}.svg`,
        `https://avatars.dicebear.com/api/${sprites[0]}/${randomName()}.svg`,
        `https://avatars.dicebear.com/api/${sprites[0]}/${randomName()}.svg`,
    ]);

    const handleSpriteChange = (e) => {
        setSelectedSprite(() => {
          if (e.target.value.length > 0) {

            setLoading(true);
            const imgData = [];
            for(let i = 0; i < 4; i++){
                imgData.push(`https://avatars.dicebear.com/api/${e.target.value}/${randomName()}.svg`);
            }

            setImgURL(imgData);
            console.log(imgData);
            setLoading(false);
          }

          return e.target.value;
        });
      };
    
      const setProfilePicture = async () => {
        if(selectedAvatar === undefined){
            toast.error("Please select an avatar", toastOptions);
        }else{
            const user = JSON.parse(localStorage.getItem("chat-user"));
            console.log(user);

            const {data} = await axios.post(`${setAvatarAPI}/${user._id}`, {
                image: imgURL[selectedAvatar]
            })

            
            
            if(data.isSet){
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-user", JSON.stringify(user));
                navigate("/");
            }else{
                toast.error("Error Setting avatar, Please Try again", toastOptions);
            }
        }

    }
      
      
  return (
    <>

    {loading === true? (
        <>
            {/* <Container></Container> */}
            <Container h ={"100vh"}>
            <VStack h={"full"} alignItems={"center"} justifyContent={"center"}>
                <Image src={spinner} alt="Loading"></Image>
            </VStack>
            </Container>
        </>
    ) : (
        <>
            <Container h={"100vh"}>
                <VStack h={"full"} spacing={["8", "12"]} alignItems="center" justifyContent="center">
                    <Heading textAlign={"center"} >Choose Your Avatar</Heading>
                    <HStack spacing={["4", "16"]}>
                        
                        {imgURL.map((image, index)=> {
                            return(
                                <Avatar key={index} src={image} alt="" size="xl" className={`avatar ${selectedAvatar === index ? "selected" : ""}`} onClick={() => setSelectedAvatar(index)} />
                            )
                        })}
                            
                        

                    </HStack>
                    <Select onChange={handleSpriteChange} className="form-select">
                        {sprites.map((sprite, index) => (
                            <option value={sprite} key={index}>
                            {sprite}
                            </option>
                        ))}
                    </Select>
                    <Button my={"4"} onClick={setProfilePicture} colorScheme='teal' variant='solid' type="submit" >Set as Profile Picture</Button>
                </VStack>
                
                <ToastContainer />
            </Container>
        </>
    )}
    
    
    </>
  )
}

export default SetAvatar