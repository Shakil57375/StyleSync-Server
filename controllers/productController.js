// function for add product
import { v2 as cloudinary } from "cloudinary";
import productModal from "../models/productModal.js";
const addProduct = async (req, res) => {
  try {

    const {
      name,
      description,
      price,
      category,  // Make sure this is being sent and logged
      subCategory,
      sizes,
      bestseller,
      latestProduct,
    } = req.body;

    // Handle file uploads (as you already have)
    const image1 = req.files.image1 ? req.files.image1[0] : null;
    const image2 = req.files.image2 ? req.files.image2[0] : null;
    const image3 = req.files.image3 ? req.files.image3[0] : null;
    const image4 = req.files.image4 ? req.files.image4[0] : null;
    const images = [image1, image2, image3, image4].filter((item) => item !== null);

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
    console.log(productData)
    const product = new productModal(productData);
    await product.save();
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// function for list products

const listProducts = async (req, res) => {
  try {
    const products = await productModal.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for remove product

const removeProduct = async (req, res) => {
  try {
    await productModal.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully " });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for single product info

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModal.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, removeProduct, listProducts, singleProduct };
