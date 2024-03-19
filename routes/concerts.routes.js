const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const uuid = uuidv4();

router.route('/concerts').get((req, res) => {
  res.json(db.concerts)
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.find((item) => item.id === req.params.id))
});

router.route('/concerts').post((req, res) => {
  const newId = uuid;
  const newConcert = {
    id: newId,
    day: req.body.day,
    concert: req.body.concert,
    client: req.body.client,
    email: req.body.email
  };
  db.concerts.push(newConcert);
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  const { day, performer, price  } = req.body;
  const singleConcert = db.concerts.find(item => item.id === req.params.id);
  if (!singleConcert) {
    res.status(404).json({ message: 'Concert not found' });
  } else {
    if (day) singleConcert.day = day;
    if (performer) singleConcert.performer = performer;
    if (price) singleConcert.price = price;
    res.json({ message: 'OK' });
  }
});

router.route('/concerts/:id').delete((req, res) => {
  const index = db.concerts.findIndex(item => item.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ message: 'Concert not found' });
  } else {
    db.concerts.splice(index, 1);
    res.json({ message: 'OK' });
  }
});

module.exports = router;