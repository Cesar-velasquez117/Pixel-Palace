const Product = require('../models/Product');
const Category = require('../models/Category');
const cloudinary = require('../config/cloudinary');

// Get all products
exports.getAll = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    }catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

// Get a single product by id
exports.getItById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};

// Add a new product 
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, image } = req.body;
    const isProductExist = await Product.findOne({ name });
    if (isProductExist) return res.status(400).json({ message: 'Product already created'});

    const newProduct =  new Product({ name, description, price, stock, category, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    
    // Verify if the category ends up empty
    const productsInCategory = await Product.find({ category: deletedProduct.category });
    if (productsInCategory.lenght === 0) {
      await Category.findByIdAndDelete(deletedProduct.category);
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

// Upload a product image
exports.uploadImage = async (req, res) => {
  try {
    const file = req.file;
    const result = await cloudinary.uploader.upload_stream({
      folder: 'pixel-palace/products'
    }, (error, result) => {
      if (error) {
        return res.status(500).json({error});
      }
      res.status(200).json({ url: result.secure_url });
    });

    const stream = result;
    stream.end(file.buffer);
  } catch (error) {
    res.status(500).json({ error: 'Error uplaoding image' });
  }
};