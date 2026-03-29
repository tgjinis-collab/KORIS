const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

// GET /api/bookings/availability?barber=Alex P.&date=2026-04-01
router.get('/availability', async (req, res) => {
  try {
    const { barber, date } = req.query;
    const bookings = await Booking.find({ barber, date });
    const bookedSlots = bookings.map(b => b.time);
    res.json({ bookedSlots });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

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