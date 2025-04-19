import mongoose from "mongoose";
const schema = mongoose.Schema;

const profileschema = new schema({

    orders:{
        userId: String,
        productId: String,
        status: String,
        date: String,
    },

    wishlist:{
        productId: String,
        userId: String,

    },

    address:{
    fullName: String,
    street: String,
    city: String,
    state: String,
    pinCode: String,
    country: String,
    phone: Number,
    },

    profileDetails:[
        {
        fullName: String,
        mobileNumber:Number,
        email: String,
        gender:String,
        dateOfBirth: String,
        location:String,
        alternateMobileNumber: Number,
    }
]
})
export default mongoose.model("Profile" , profileschema)