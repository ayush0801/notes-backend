const userModel = require('../models/UserModel');
const { isEmailValid } = require('../utility/validation');
const bcrypt = require('bcrypt');
require('../db')
// require('dotenv') = process.env.SECRET_TOKEN;
const {SECRET_TOKEN} = process.env;
const  jwt = require("jsonwebtoken");


module.exports.signup_get = (req, res) => {
   res.render('signup');
}

module.exports.login_get = (req, res) => {
   res.render('signup');
}

module.exports.signup_post = async (req, res) => {
   const {email, password} = req.body
   if(!email || !password){
      return res.status(422).json({error: "Please fill the details"});
   }
   if(!isEmailValid){
      return res.status(403).json({error: "Invalid Email"})
   }
   const hashedPassword = await bcrypt.hash(password, 12);
   const newUser = new userModel({email, password: hashedPassword});
   userModel.findOne({email})
   .then((data) => {
      if(!data) {
         newUser.save()
         .then((data) => {
            const maxAge = 3 * 24 * 60 * 60;
            const token = jwt.sign({id: data._id}, SECRET_TOKEN, {expiresIn:maxAge});
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000});
            return res.status(200).json({message: "Signed Up Successfully"});
         })
         .catch((err) => {
            return res.status(400).json({error: err});
         })
      }
      else{
         return res.status(409).json({error:"Email already in use."});
      }
   })
   .catch((err) => {
      return res.json({error: err});
   })
}

module.exports.login_post = async (req, res) => {
   const {email, password} = req.body
   if(!email || !password){
      return res.status(422).json({error: "Please fill the details"});
   }
   if(!isEmailValid){
      return res.status(403).json({error: "Invalid Email"})
   }
   userModel.findOne({email})
   .then((data) => {
      if(!data){
         return res.status(401).json({error: "Email not found"});
      }
      bcrypt.compare(password, data.password)
      .then((valid) => {
         if(!valid){
            return res.status(401).json("Invalid email or password");
         }
         else{
            const maxAge = 3 * 24 * 60 * 60;
            const token = jwt.sign({id: data._id}, SECRET_TOKEN, {expiresIn: maxAge});
            res.cookie('jwt', token,  { httpOnly: true, maxAge: maxAge });
            res.status(200).json({message:  `Logged In as ${data.email}`});
         }
      })
      .catch((err) => {
         console.log(err);
         return res.json({error: err})
      })
   })
   .catch((err) => {
      console.log(err);
      return res.status(500).json({error: err});
   }) 
}

module.exports.logout_get = (req, res) => {
   res.cookie('jwt', '', {maxAge: 1});
   res.json({message: "You have been successfully logged out"});
}