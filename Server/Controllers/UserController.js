import { User } from "../Models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {

    try{
        const {name, username, email, password} = req.body;
        
    

        if(!name || !password || !email || !username){
            return res.status(404).json({
                success: false,
                message: "Please enter All Fields",
            })
        }

        const usernameCheck = await User.findOne({username});

        if(usernameCheck){
            return res.status(400).json({
                success: false,
                message: "Username Already Exists",
            });
        }


        const emailCheck = await User.findOne({email});
        if(emailCheck){
            return res.status(400).json({
                success: false,
                message: "Email Already Exists",
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            name,
            email,
            password: hashPassword
        });

        delete user.password;

        if(user){
            return res.status(200).json({
                success: true,
                message: "User created successfully",
                user
            });
        }
        else{
            return res.status(404).json({
                success: false,
                message: "Error creating user",
            });
        }
    }
    catch(err){
        console.log(err);
        next(err);
    }

}

export const login = async (req, res, next) => {



    try{
        const {username, password} = req.body;

        const user = await User.findOne({username});

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Incorrect username or password",
            });
        }

        const passwordCheck = await bcrypt.compare(password, user.password);

        if(!passwordCheck){
            return res.status(404).json({
                success: false,
                message: "Incorrect username or password",
            });
        }

        delete user.password;

        return res.status(200).json({
            success: true,
            message: "Successfully Logged In",
            user
        });
    }
    catch(err){
        console.log(err);
        next(err);
    }
}

export const setAvatar = async (req, res, next)=> {
    try{

        const userId = req.params.id;
       
        const imageData = req.body.image;
      
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage: imageData,
        },
        { new: true });

        return res.status(200).json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
          });


    }catch(err){
        next(err);
    }
}

export const allUsers = async (req, res, next) => {
    try{
        const user = await User.find({_id: {$ne: req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);

        return res.json(user);
    }
    catch(err){
        next(err);
    }
}