const express = require('express');
const { getAll, getItById, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getItById);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct)

module.exports = router;