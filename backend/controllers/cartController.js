const Cart = require('../models/Cart');

// Get cart for user
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
        if (!cart) return res.json({ items: [] }); 
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart', error });
    }
};

// Add item to cart
exports.addItemToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }) || new Cart({ userId: req.params.userId, items: []});
        
        const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        
        if (productIndex > -1) {
            cart.items[productIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart', error });
    }
};

// Update product quantity in cart
exports.updateItemQuantity = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ userId: req.params.userId});
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (productIndex > -1) {
            if (quantity === 0 ) {
              cart.items.splice(productIndex, 1);
            } else {
              cart.items[productIndex].quantity = quantity;
            }
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating product quantity', error });
    }
};

// Delete item from cart
exports.deleteItemFromCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      if (!cart) return res.status(404).json({message: 'Cart not found '});
  
      cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
      await cart.save();
      res.json(cart);
    } catch(error) {
      res.status(500).json({ message: 'Error deleting item from cart', error });
    }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { items: [] },
      { new: true }
    );

    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error});
  }
};