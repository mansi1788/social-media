import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app =  express();
app.use(bodyParser.json({limit: '30mb', extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))

dotenv.config()
mongoose.connect(
     process.env.MONGO_URI
     ,{ useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => app.listen(process.env.PORT, () => console.log(`Listening at ${process.env.PORT}`)))
  .catch(err => console.error("Connection error:", err));
  