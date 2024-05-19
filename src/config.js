const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://iainchun03:yoohyun763@cluster0.n9kpaee.mongodb.net/db1");

connect.then(()=>{
  console.log("mongodb connected");
})
.catch(()=>{
  console.log("failed to connect");
});

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
});

const collection = new mongoose.model("users", userSchema)

module.exports = collection
