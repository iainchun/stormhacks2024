const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


// Set EJS as the templating engine

app.use(express.json());

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(express.urlencoded({extended: false}));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexRouter = require('./src/routes');
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`server running on Port: ${port}`)
});