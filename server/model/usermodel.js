import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username:{
            type:String,
            required: true
        },
        password:{
            type:String,
            required: true
        },
        firstname:{
            type:String,
            required: true
        },
        lastname:{
            type:String,
            required: true
        },
        isAdmin:{
            type:Boolean,
            default: false
        },
        profilepicture:String,
        coverpicture:String,
        about:String,
        livesin:String,
        worksAt:String,
        relationship: String,
        followers:[],
        following:[]

        
    },
    {timestamps: true}
)

const usermodel = mongoose.model("Users",userSchema);

export default usermodel;
