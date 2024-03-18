const express = require('express');
const cors = require('cors');
const db = require('./db');
const { v4: uuidv4 } = require('uuid');

const app = express();
const uuid = uuidv4();

app.use(express.urlencoded({extended: false}));
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
  res.json({message: 'OK'});
});

app.put('/testimonials/:id', (req, res) => {
	const { author, text } = req.body;
	const id = +req.params.id;
	const testimontial = db.find((testimontial) => testimontial.id === id);
	testimontial.author = author;
	testimontial.text = text;
	res.json({ message: 'ok!' })}
);

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});