import mongoose from "mongoose";

const infoSchema = new mongoose.Schema(
  {
    title: { type: String, required: false, unique: false },
    slug: { type: String, required: true, unique: false },
    image: { type: String, required: false },
    source: { type: String, required: false },
    description: { type: String, required: false },
    type: { type: String, required: false },
    blog: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Info = mongoose.model("Info", infoSchema);
export default Info;
