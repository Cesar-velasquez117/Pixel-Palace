const express = require('express');
const Cart = require('../models/Cart');
const { getCart, addItemToCart, updateItemQuantity, deleteItemFromCart } = require('../controllers/cartController');

const router = express.Router();

router.get('/:userId', getCart);
router.post('/:userId', addItemToCart);
router.put('/:userId', updateItemQuantity);
router.delete('/:userId/:producId', deleteItemFromCart);

module.exports = router;