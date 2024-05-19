const collection = require("./config");
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.render("login", { title: 'login' });
});

router.get('/signup', (req, res) => {
  res.render("signup", { title: 'signup' });
});

router.get('/login', (req, res) => {
  res.render("login", { title: 'login' });
});

router.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password
  }
  const existingUser = await collection.findOne({name: data.name});

  if(existingUser) {
    // res.send('Username already exists');
    res.render("signupFail", { title: 'signupFail' });

  } else {
    const userdata = await collection.insertMany(data);
    console.log(userdata);
  }

})

router.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({name: req.body.username});
    if(!check) {
      // res.send("user name cannot found");
      res.render("loginFail", { title: 'loginFail' });
    }
    if(req.body.password == check.password) {
      res.render("main", { title: 'main' });
    } else {
      res.render("loginFail", { title: 'loginFail' });
    }
  } catch {
    // res.send("wrong details")
    console.log(req.body.password);

  }
})
module.exports = router;
