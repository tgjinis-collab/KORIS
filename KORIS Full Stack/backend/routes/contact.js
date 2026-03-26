const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// SEND contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = await Contact.create({ name, email, message });
    res.json({ message: 'Message received!', contact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all messages (admin)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;