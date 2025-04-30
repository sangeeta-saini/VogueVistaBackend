import mongoose from "mongoose";
const schema = mongoose.Schema;

const editsSchema = new schema({

    name: String,
    mobile: String,
    email: String,
    gender: String,
    birth: Date,
    alternateMobile: String,

} ,{ timestamps: true })
export default mongoose.model("Edit" , editsSchema)