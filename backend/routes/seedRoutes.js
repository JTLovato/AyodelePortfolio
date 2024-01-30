import express from "express";
import Product from "../models/productModel.js";
import data from "../data.js";
import User from "../models/userModel.js";
import Info from "../models/infoModel.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(data.products);

  await Info.deleteMany({});
  const createdInfos = await Info.insertMany(data.infos);

  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  res.send({
    createdProducts,
    createdUsers,
    createdInfos,
  });
});
export default seedRouter;
