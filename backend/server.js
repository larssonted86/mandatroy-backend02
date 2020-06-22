const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

const url = process.env.ATLAS_URL;
const boardsRoutes = require('./routes/boards-routes')
const listsRoutes = require('./routes/lists-routes')
const itemsRoutes = require('./routes/items-routes')
const HttpError = require('./models/http-error')

const app = express();

const port = process.env.PORT || 8090;

//MIDDLEWARES
app.use(express.json());

app.use('/api/', boardsRoutes, listsRoutes, itemsRoutes);

app.use((req,res,next) => {
  const error = new HttpError('could not find this route', 404)
  return next(error)
})

app.use((error,req,res,next) => {
  if(res.headerSent){
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'an unknown error occured'})
});

mongoose
.connect(url, { 
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
  useFindAndModify: false})
.then(() => {
  app.listen(port, () =>{
    console.log(`server is running on port: ${port}`)
  });
  console.log('Connected to database')
})
.catch( err => {
  console.log(err)
})