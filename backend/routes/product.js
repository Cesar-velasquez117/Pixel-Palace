const express = require('express');
const { getAll, getItById } = require('../controllers/productController');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getItById);

module.exports = router;