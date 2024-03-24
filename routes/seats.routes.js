const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const uuid = uuidv4();

router.route('/seats').get((req, res) => {
  res.json(db.seats)
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.find((item) => item.id === req.params.id))
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;

  const seatExists = db.seats.some(item => item.day === day && item.seat === seat);
  if (seatExists) {
    return res.status(400).json({ message: 'The slot is already taken...' });
  }

  const newId = uuid;
  const newSeat = {
    id: newId,
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email
  };
  db.seats.push(newSeat);
  res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const singleSeat = db.seats.find(item => item.id === req.params.id);
  if (!singleSeat) {
    res.status(404).json({ message: 'Seat not found' });
  } else {
    if (day) singleSeat.day = day;
    if (seat) singleSeat.seat = seat;
    if (client) singleSeat.client = client;
    if (email) singleSeat.email = email;
    res.json({ message: 'OK' });
  }
});

router.route('/seats/:id').delete((req, res) => {
  const index = db.seats.findIndex(item => item.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ message: 'Seat not found' });
  } else {
    db.seats.splice(index, 1);
    res.json({ message: 'OK' });
  }
});

module.exports = router;