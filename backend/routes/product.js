const express = require('express');
const { getAll, getItById, addProduct, updateProduct, deleteProduct, uploadImage } = require('../controllers/productController');
const multer = require('multer');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', getAll);
router.get('/:id', getItById);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct)
router.post('/upload', upload.single('image'), uploadImage)

module.exports = router;