const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const uuid = uuidv4();

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials)
});

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.find((item) => item.id === req.params.id))
});

router.route('/testimonials').post((req, res) => {
  const newId = uuid;
  const newTestimonial = {
    id: newId,
    author: req.body.author,
    text: req.body.text
  };
  db.testimonials.push(newTestimonial);
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const testimonial = db.testimonials.find(item => item.id === req.params.id);
  if (!testimonial) {
    res.status(404).json({ message: 'Testimonial not found' });
  } else {
    if (author) testimonial.author = author;
    if (text) testimonial.text = text;
    res.json({ message: 'OK' });
  }
});

router.route('/testimonials/:id').delete((req, res) => {
  const index = db.testimonials.findIndex(item => item.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ message: 'Testimonial not found' });
  } else {
    db.testimonials.splice(index, 1);
    res.json({ message: 'OK' });
  }
});

module.exports = router;