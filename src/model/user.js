const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/libang');
const Schema = mongoose.Schema;
  var userSchema= new Schema({
    uname:String,
    password:String
  })

  var User=mongoose.model('user',userSchema);
  module.exports=User;