const Category = require('../models/Category');
const Product = require('../models/Product');

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const isCategoryExist = await Category.findOne({ name });
    if (isCategoryExist) return res.status(400).json({ message: 'Category already in created'});

    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (errro) {
    res.status(500).json({ message: 'Error creating category', error });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategory) return res.status(404).json({ message: 'Category not fonud' });
    res.json(updatedCategory);
  } catch(error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    // Verify if there are any products in the category
    const products = await Product.find({ category: category._id });
    if (products.lenght > 0) {
      return res.status(400).json({ message: 'Cannot delete category with associated products' });
    }

    await category.deleteOne();
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};