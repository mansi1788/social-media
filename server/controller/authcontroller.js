import usermodel from "../model/usermodel.js";
import bcrypt from 'bcrypt';

export const registerUser = async(req,res)=>{

    const {username, password, firstname, lastname} = req.body;
    //salt = amount of hashing or altering the given string
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt)


    const newUser = new usermodel({username,password:hashedPass,firstname,lastname})

    try {
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
            validity? res.status(200).json(user):res.status(400).json("Wrong User and  Password")
        }
        else{
            res.status(404).json("User and password does not exit")
        }
    } catch (error) {
        res.status(500).json({message: error.message}) 
    }
}


