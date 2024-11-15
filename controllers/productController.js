// function for add product
import { v2 as cloudinary } from "cloudinary";
import productModal from "../models/productModal.js";
const addProduct = async (req, res) => {
  try {
    console.log(req.files); // Add this line
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      latestProduct,
    } = req.body;

    // Access the files
    const image1 = req.files.image1 ? req.files.image1[0] : null;
    const image2 = req.files.image2 ? req.files.image2[0] : null;
    const image3 = req.files.image3 ? req.files.image3[0] : null;
    const image4 = req.files.image4 ? req.files.image4[0] : null;
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== null
    );
    const imagesUrl = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      latestProduct: latestProduct === "true" ? true : false,
      sizes: JSON.parse(sizes) || [],
      images: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModal(productData);
    await product.save();
    res.json({ success: true, message : "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for list products

const listProducts = async (req, res) => {};

// function for remove product

const removeProduct = async (req, res) => {};

// function for single product info

const singleProduct = async (req, res) => {};

export { addProduct, removeProduct, listProducts, singleProduct };
