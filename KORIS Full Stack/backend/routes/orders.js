const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// CREATE order
router.post('/', auth, async (req, res) => {
  try {
    const { items, total } = req.body;
    const order = await Order.create({
      user: req.user.id,
      items,
      total
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET user's orders
router.get('/my', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CANCEL order
router.delete('/:id', auth, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;