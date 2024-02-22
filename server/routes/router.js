// for creating API using router

const express = require('express');
const router = new express.Router();
const userdb = require("../models/userSchema");
const bcrypt = require('bcrypt');

//for user registration 
 
router.post("/register",async(req,res)=>{
    const {name,email,Password,Confirm_Password} = req.body;

    if(!name || !email || !Password || !Confirm_Password){
        res.status(422).json({error:"fill all the details"})
    }

    try {
        const preuser = await userdb.findOne({email:email})
        if(preuser){
            res.status(422).json({error:"email already exist"})
        }else if(Password != Confirm_Password){
            res.status(422).json({error:"password and confirm password doesn't match"})
        }else{
            const finalUser = new userdb({
                name,email,Password,Confirm_Password
            });

            //here hashing password

            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(201).json({status:201,storeData})
        }
        
    } catch (error) {
        res.status(422).json("error");
        console.log("catch error")
    }
});



//User login api

router.post('/login',async(req,res)=>{
    // console.log(req.body);

    const {email,Password} = req.body;

    if( !email || !Password){
        res.status(422).json({error:"fill all the details"})
    }

    try {
        const userValid  = await userdb.findOne({email:email})

        if(userValid){
            const isMatch = await bcrypt.compare(Password,userValid.Password);

            if(!isMatch){
                res.status(422).json({error:"Invalid Password"})
            }else{

                //token genetate
                const token = await userValid.generateAuthtoken();

                console.log(token);
            }
        }
    } catch (error) {
        
    }
})

module.exports = router;
