import usermodel from "../model/usermodel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

//Get all ausers
export const getAllUsers = async(req,res)=>{
    try {
        let users = await usermodel.find();
        users = users.map((user)=>{
            const{password,...otherDetails}=user._doc
            return otherDetails



        })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}

//get a  user
export const getUser = async(req,res)=>{
    const id = req.params.id;
    try {
        const user = await usermodel.findById(id);
        if(user)
        {
            const {password, ...otherDetails} = user._doc
            res.status(200).json(otherDetails)
        }
        else{
            res.status(404).json("No User exist")
        }
    } catch (error) {
        res.status(500).json(error)
    }
};

// update a user

 export const updateUser = async(req,res)=>{
    const id = req.params.id
    const {_id, currentUserAdminStatus, password}=req.body

    if(id===_id )
    {
        try {
            if(password)
            {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password,salt)
            }
            const user = await usermodel.findByIdAndUpdate(id, req.body, {new:true})
            const token = jwt.sign(
                {username:user.username,id:user._id},
                process.env.JWT_KEY,
                {expiresIn:"1hr"}
            )

            res.status(200).json({user,token})
        } catch (error) {
            res.status(500).json(error)
        }

    }
else{
    res.status(403).json("Access denied")
}
}

//delete  a post
export const deleteUser = async(req,res)=>{
    const id = req.params.id

    const {_id, currentUserAdminStatus} = req.body
    if(_id===id || currentUserAdminStatus)
    {
        try {
            await usermodel.findByIdAndDelete(id)
            res.status(200).json("user deleted successfully")
            
        } catch (error) {
            res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("Access Denied!")
    }
}


// follow a user

export const followUser = async(req,res)=>{
    const id = req.params.id

    const {_id}= req.body
    if(_id ===id)
    {
        res.status(403).json("Action forbidden")

    }
    else{
        try {
            const followUser = await usermodel.findById(id)
            const followingUser =await usermodel.findById(_id)

            if(!followUser.followers.includes(_id))
            {
                await followUser.updateOne({$push:{ followers:_id}})
                await followingUser.updateOne({$push:{ following:id}})
                res.status(200).json("user followed!")
            }
            else
            {
                res.status(403).json("User is Already followed by it")
            }

            
        } catch (error) {
            res.status(500).json(error)

        }
    }
}


//unfollow 
export const UnfollowUser = async(req,res)=>{
    const id = req.params.id

    const {_id}= req.body
    if(_id ===id)
    {
        res.status(403).json("Action forbidden")

    }
    else{
        try {
            const followUser = await usermodel.findById(id)
            const followingUser =await usermodel.findById(_id)

            if(followUser.followers.includes(_id))
            {
                await followUser.updateOne({$pull:{ followers:_id}})
                await followingUser.updateOne({$pull:{ following:id}})
                res.status(200).json("user unfollowed!")
            }
            else
            {
                res.status(403).json("User is not followed by it")
            }

            
        } catch (error) {
            res.status(500).json(error)

        }
    }
}