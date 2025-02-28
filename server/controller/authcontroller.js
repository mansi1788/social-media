import usermodel from "../model/usermodel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const registerUser = async(req,res)=>{

    // const {username, password, firstname, lastname} = req.body;
    //salt = amount of hashing or altering the given string
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt)


    req.body.password=hashedPass

    const newUser = new usermodel(req.body )
    const{username} = req.body


    try {
        const oldUser = await usermodel.findOne({username})
        if(oldUser)
        {
             try {
        const oldUser = await usermodel.findOne({username})
        if(oldUser)
        {
            return res.status(400).json({message:"username is already register!"})

        }
       const user= await newUser.save();

       const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWTKEY,
        { expiresIn: "1h" }
      );

        res.status(200).json(user,token)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

        }
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};
//login User
export const loginUser = async(req, res)=>{
    const {username, password} = req.body
    try {
        const user = await usermodel.findOne({username:username})
        if(user)
        {
            const validity = await bcrypt.compare(password, user.password) 
            if(!validity)
                {
                    res.status(400).json("Wrong Password and username")
                } 
                else{
                    
       const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
       
      );
      res.status(200).json({user,token})

                }
        }
        else{
            res.status(404).json("User and password does not exit")
        }
    } catch (error) {
        res.status(500).json({message: error.message}) 
    }
}


