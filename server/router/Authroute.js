import express from 'express';
import { loginUser, registerUser } from '../controller/authcontroller.js';


const router = express.Router();

router.get('/',async(req,res)=>{res.send("Auth Route")})

router.post('/register',registerUser)
router.post('/login',loginUser)






export default router
