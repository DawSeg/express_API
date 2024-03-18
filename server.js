const express = require('express');
const cors = require('cors');
const db = require('./db');
const { v4: uuidv4 } = require('uuid');

const app = express();
const uuid = uuidv4();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/testimonials', (req, res) => {
  res.json(db)
});

app.get('/testimonials/random', (req, res) => {
  res.json(db[Math.floor(Math.random() * db.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.find((item) => item.id === req.params.id))
});

app.post('/testimonials', (req, res) => {
  const newId = uuid;
  const newTestimonial = {
    id: newId,
    author: req.body.author,
    text: req.body.text
  };
  db.push(newTestimonial);
  res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  const testimonial = db.find(item => item.id === req.params.id);
  if (!testimonial) {
    res.status(404).json({ message: 'Testimonial not found' });
  } else {
    if (author) testimonial.author = author;
    if (text) testimonial.text = text;
    res.json({ message: 'OK' });
  }
});

app.delete('/testimonials/:id', (req, res) => {
  const index = db.findIndex(item => item.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ message: 'Testimonial not found' });
  } else {
    db.splice(index, 1);
    res.json({ message: 'OK' });
  }
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});