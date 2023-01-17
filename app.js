const dotenv = require("dotenv");

const mongoose = require('mongoose');

const express = require('express');
const app = express();



dotenv.config({path: './config.env'});

require('./db/conn');
//const User = require('./model/userSchema');
app.use(express.json());

//link the router file
app.use(require('./router/auth'));
const PORT = process.env.PORT;



// middleware
const middleware =(req,res,next) =>{
console.log('Hello My Middle ware');
next();
}

//middleware();

//app.get('/',(req,res)=> {
  //  res.send('Hello World from server app.js')
   // });



app.get('/about',middleware,(req,res)=> {
  console.log('hello my about');
    res.send('Hello  about World from server')
    });



    app.get('/contact',(req,res)=> {
        res.send('Hello contact  World from server')
        });


        app.get('/signup',(req,res)=> {
            res.send('Hello signup World from server')
            });



            app.get('/signin',(req,res)=> {
                res.send('Hello signin World from server')
                });


app.listen(PORT,() =>{

    console.log('server is running at port '+PORT );
});