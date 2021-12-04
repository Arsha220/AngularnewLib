const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/libang');
const Schema = mongoose.Schema;
  var bookSchema= new Schema({
    bookTitle:String,
    bookAuthor:String,
    genre:String,
    imageUrl:String
  })

  var Book=mongoose.model('book',bookSchema);
  module.exports=Book;