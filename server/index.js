import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Authroute from './router/Authroute.js'
import UserRoute from './router/UserRoute.js'
import PostRoute from './router/PostRoute.js';
import UploadRoute from './router/UploadRoute.js'
import cors from 'cors';
//Routes

const app =  express();

//to server

app.use(express.static('public'))
app.use('/images',express.static('images'))
app.use(bodyParser.json({limit: '30mb', extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors())
dotenv.config()

mongoose.connect(
    process.env.MONGO_URI)


  .then(() => app.listen(process.env.PORT, () => console.log(`Listening at ${process.env.PORT}`)))
  .catch(err => console.error("Connection error:", err));


  //usage of route
  app.use('/auth',Authroute)
  app.use('/user',UserRoute)
  app.use('/post',PostRoute)
  app.use('/upload',UploadRoute)

  



