const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");
const port = 3000;


const app = express();

app.use(express.json());

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.render("login");
});

app.get('/signup', (req, res) => {
  res.render('signup');
});
app.get('/login', (req, res) => {
  res.render('login');
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password
  }
  const existingUser = await collection.findOne({name: data.name});

  if(existingUser) {
    res.send('Username already exists');
  } else {
    const userdata = await collection.insertMany(data);
    console.log(userdata);
  }

  // res.sendFile(path.join(__dirname, 'public', 'main.html'));
})

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({name: req.body.username});
    if(!check) {
      res.send("user name cannot found");
    }
    if(req.body.password == check.password) {
      res.render("main");
    } else {
      req.send("wrong password");
    }
  } catch {
    res.send("wrong details")
    console.log(req.body.password);

  }
})

app.listen(port, () => {
  console.log(`server running on Port: ${port}`)
});