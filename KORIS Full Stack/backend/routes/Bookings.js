const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

// CREATE booking
router.post('/', auth, async (req, res) => {
  try {
    const { service, barber, date, time } = req.body;
    const booking = await Booking.create({
      user: req.user.id,
      service,
      barber,
      date,
      time
    });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET user's bookings
router.get('/my', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CANCEL booking
router.delete('/:id', auth, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;