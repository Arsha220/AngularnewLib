const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/libang');
const Schema = mongoose.Schema;
  var authorSchema= new Schema({
    authorName:String,
    famousBook:String,
    nationality:String,
    imageUrl:String
  })

  var Author=mongoose.model('author',authorSchema);
  module.exports=Author;