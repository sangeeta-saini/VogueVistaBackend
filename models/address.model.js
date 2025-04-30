import mongoose from "mongoose";
const schema = mongoose.Schema;


const addressSchema = new mongoose.Schema({

    name: String,
    mobile: String,
    pincode: String,
    state: String,
    address: String,
    street: String,
    city: String,
    typeOfAddress: String
    
    

});
  
export default mongoose.model('address', addressSchema );