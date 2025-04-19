import mongoose from "mongoose";
import bcrypt from "bcrypt";

const schema = mongoose.Schema;

const UserSchema = new schema({

    name:{
        type:String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"password is must"],
        lowercase:true,
        trim:true
    },

})

// UserSchema.prev("save" , async function(next){
//     if(!this.isModified("password") ) return next()
//     await bcrypt.hash(this.password,10)
//     next()
// })


export default mongoose.model("user" , UserSchema, "user");