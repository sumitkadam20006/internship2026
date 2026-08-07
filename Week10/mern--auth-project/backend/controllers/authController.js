const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");




// Register

const register = async(req,res)=>{


try{


const {
name,
email,
password
}=req.body;



const existingUser =
await User.findOne({email});



if(existingUser){

return res.status(400).json({

message:"User already exists"

});

}




const hashedPassword =
await bcrypt.hash(password,10);



const user =
await User.create({

name,

email,

password:hashedPassword

});



res.status(201).json({

message:"Register Successful",

user

});



}
catch(error){

res.status(500).json({

message:error.message

});

}


};







// Login


const login = async(req,res)=>{


try{


const {
email,
password
}=req.body;



const user =
await User.findOne({email});



if(!user){

return res.status(404).json({

message:"User not found"

});

}



const match =
await bcrypt.compare(
password,
user.password
);



if(!match){

return res.status(400).json({

message:"Invalid Password"

});

}




const token =
jwt.sign(

{
id:user._id
},

process.env.JWT_SECRET,

{
expiresIn:"7d"
}

);



res.cookie(

"token",

token,

{

httpOnly:true,

maxAge:7*24*60*60*1000

}

);



res.json({

message:"Login Successful",

user

});



}
catch(error){

res.status(500).json({

message:error.message

});

}


};








// Logout

const logout=(req,res)=>{


res.clearCookie("token");


res.json({

message:"Logout Successful"

});


};







// Profile

const profile=(req,res)=>{


res.json({

user:req.user

});


};






module.exports={

register,

login,

logout,

profile

};