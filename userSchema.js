 const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

 const userSchema = new mongoose.Schema({
    
name:{
    type: String,
    required: [true,"Please Add a Name"],

},
email:{
    type: String,
    required: [true,"Please Add An Email"],
    unique: true,
   
    match:[
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please Enter a Valid Email"

    ]
},

phone:{
    type: Number,
    required: [true,"Please Add a Number"],

},
work:{
    type: String,
    required: [true,"Please Add a Work"],

},

Password:{
    type: String,
    required: [true,"Please Add a Password"],
   
},

ConfirmPassword:{
    type: String,
    required: [true,"Please Add a Confirm Password"],
   
}

 })

 // hashing of password

 userSchema.pre('save', async function(next){
console.log("hi from inside");
    if(this.isModified('Password')){

            this.Password = await bcrypt.hash(this.Password,12);
            this.ConfirmPassword = await bcrypt.hash(this.ConfirmPassword,12);
    }
    next();
 });

 const User = mongoose.model('DB',userSchema);
 module.exports = User;