const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keysecret = "surajkumarshubhamkumarsarojkumar"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("not valid Email")
            }
        }
    },
    Password:{
        type:String,
        required:true,
        minlength:6
    },
    Confirm_Password:{
        type:String,
        required:true,
        minlength:6
    },
    tokans:[
        {
            tokan:{
                type:String,
                required:true,
            }
        }
    ]
});



//pasword hash

userSchema.pre("save",async function(next){
    this.Password = await bcrypt.hash(this.Password,12);
    this.Confirm_Password = await bcrypt.hash(this.Confirm_Password,12);

    next( )
})


// token generate

userSchema.methods.generateAuthtoken = async function(){

    try {
        let token2 = jwt.sign({_id:this._id},keysecret,{
            expiresIn:'2d'
        });

        this.tokens = this.tokens.concat({tokan:token2})
        await this.save();
        return token2;
    } catch (error) {
            res.status(422).json(error)
    }
}

//creating model

const userdb = new mongoose.model("User",userSchema);

module.exports =  userdb;








