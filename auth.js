const { response } = require('express');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
require('../db/conn');
const User = require("../model/userSchema");

router.get('/get',(req,res)=> {
    res.send('Hello World from server router js')
    });



    router.post('/register', (req, res) =>{  
        const { name , email, phone , work , Password , ConfirmPassword} = req.body;

if(!name || !email|| !phone|| !work|| !Password|| !ConfirmPassword){

    return res.status(422).json({error:"Please fill the all required fields"});
}
    
    



User.findOne({ email: email}).then((userExist) =>{

if(userExist){

    return res.status(422).json({error:"This Email has already registered"});
}
else if (Password != ConfirmPassword){
    return res.status(422).json({error:"Password is not Identical"});
}
else{

    const user = new User({name ,email , phone, work, Password, ConfirmPassword });

   user.save();
    res.status(201).json({message:"User Succesfully Registered"});
}


}).catch(err =>{console.log(err);});
//response.send("response");
//res.json({message:req.body});




    });

//Login Route

router.post('/SignIn', async(req, res) => {

   //console.log(req.body);
    //res.json({message: "awesome"})
    try{

        const {email,Password} = req.body;


        if(!email || !Password){
            return res.status(400).json({error:"Please fill the data"})
        }

        const userLogin = await User.findOne({email:email});
//console.log(userLogin);


if(userLogin){

    const isMatch = await bcrypt.compare(Password, userLogin.Password);
    if(!isMatch){
        res.status(400).json({ error:"Invalid Credidentials pass"});
    }
    else{
        res.json({ message:"User Sign In SuccesFully"});
    }


}
else{
    res.json({ error:"Invalid Credidentials"});
    
}


    } catch(err){
         console.log(err);
    }
});


    module.exports = router;