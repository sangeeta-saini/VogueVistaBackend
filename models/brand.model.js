import mongoose from "mongoose";
const schema = mongoose.Schema;

const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  slug: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Brands", BrandSchema);
