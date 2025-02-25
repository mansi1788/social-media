import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Authroute from './router/Authroute.js'
import UserRoute from './router/UserRoute.js'

//Routes

const app =  express();
app.use(bodyParser.json({limit: '30mb', extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))

dotenv.config()

mongoose.connect(
    process.env.MONGO_URI)


  .then(() => app.listen(process.env.PORT, () => console.log(`Listening at ${process.env.PORT}`)))
  .catch(err => console.error("Connection error:", err));


  //usage of route
  app.use('/auth',Authroute)
  app.use('/user',UserRoute)



