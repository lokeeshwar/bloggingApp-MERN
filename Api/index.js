const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser')
dotenv.config();

const app = express()
app.use(express.json())
app.use(cookieParser())

const userRoutes = require('./routes/userRoutes')
const authRoute = require('./routes/authRoute')
const postRoute = require('./routes/postRoute')

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });


const port = 3000;
app.listen(port, () => {
  console.log(`server started at ${port}`);
});

app.use('/api/user', userRoutes )
app.use('/api/auth', authRoute )
app.use('/api/post', postRoute)


app.use((err,req,res,next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error'

  res.status(statusCode).json({
    sucess : false,
    statusCode,
    message
  })

}) 