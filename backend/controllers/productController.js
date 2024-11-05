const Product = require('../models/Product');

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
}