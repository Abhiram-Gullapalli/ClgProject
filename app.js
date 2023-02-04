const express = require('express');
const mongoose = require('mongoose');

const app = express();
const authRoutes = require('../Project/routes/authRoutes')
// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');
app.use(express.json())
// // database connection
const dbURI = 'mongodb+srv://Abhiram:Abhiram@project.8rt9ty8.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// // routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.use(authRoutes)