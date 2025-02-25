import usermodel from "../model/usermodel.js";
import bcrypt from 'bcrypt';


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
    const {currentUserId, currentUserAdminStatus, password}=req.body

    if(id===currentUserId || currentUserAdminStatus)
    {
        try {
            if(password)
            {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password,salt)
            }
            const user = await usermodel.findByIdAndUpdate(id, req.body, {new:true})

            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }

    }
else{
    res.status(403).json("Access denied")
}


}


export const deleteUser = async(req,res)=>{
    const id = req.params.id

    const {currentUserId, currentUserAdminStatus} = req.body
    if(currentUserId===id || currentUserAdminStatus)
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