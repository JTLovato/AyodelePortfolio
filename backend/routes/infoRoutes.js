import express from "express";
import expressAsyncHandler from "express-async-handler";
import Info from "../models/infoModel.js";
import { isAuth, isAdmin } from "../utils.js";

const infoRouter = express.Router();
infoRouter.get("/", async (req, res) => {
  const info = await Info.find();
  res.send(info);
});
infoRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newInfo = new Info({
      title: "sample name " + Date.now(),
      slug: "sample_name_" + Date.now(),
      image: "/images/p1.jpg",
      description: "Sample Description",
      source: "Sample Source",
      type: "Sample Type",
      blog: "Sample Blog",
    });
    const info = await newInfo.save();
    res.send({ message: "Info Created", info });
  })
);
infoRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const infoId = req.params.id;
    const info = await Info.findById(infoId);
    if (info) {
      info.name = req.body.name;
      info.slug = req.body.slug;
      info.image = req.body.image;
      info.description = req.body.description;
      info.source = req.body.source;
      info.type = req.body.type;
      info.blog = req.body.blog;
      await info.save();
      res.send({ message: "Info Updated" });
    } else {
      res.status(404).send({ message: "Info Not Found" });
    }
  })
);
infoRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const info = await Info.findById(req.params.id);
    if (info) {
      await info.deleteOne();
      res.send({ message: "Info Deleted" });
    } else {
      res.status(404).send({ message: "Info Not Found" });
    }
  })
);

const PAGE_SIZE = 9;

infoRouter.get(
  "/admin",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;
    const info = await Info.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countInfos = await Info.countDocuments();
    res.send({
      info,
      countInfos,
      page,
      pages: Math.ceil(countInfos / pageSize),
    });
  })
);
infoRouter.get(
  "/searchinfos",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || "";
    const price = query.price || "";
    const rating = query.rating || "";
    const order = query.order || "";
    const searchQuery = query.query || "";
    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? {
            name: {
              $regex: searchQuery,
              $options: "i",
            },
          }
        : {};
    const categoryFilter = category && category !== "all" ? { category } : {};
    const ratingFilter =
      rating && rating !== "all"
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== "all"
        ? {
            // 1-50
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};
    const sortOrder =
      order === "featured"
        ? { featured: -1 }
        : order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : order === "newest"
        ? { createdAt: -1 }
        : { _id: -1 };
    const infos = await Info.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countInfos = await Info.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      infos,
      countInfos,
      page,
      pages: Math.ceil(countInfos / pageSize),
    });
  })
);
infoRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Info.find().distinct("category");
    res.send(categories);
  })
);

infoRouter.get("/slug/:slug", async (req, res) => {
  const info = await Info.findOne({ slug: req.params.slug });
  if (info) {
    res.send(info);
  } else {
    res.status(404).send({ message: "Info Not Found" });
  }
});
infoRouter.get("/:id", async (req, res) => {
  const info = await Info.findById(req.params.id);
  if (info) {
    res.send(info);
  } else {
    res.status(404).send({ message: "Info Not Found" });
  }
});
export default infoRouter;
