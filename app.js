const express= require('express');
const app= new express();
const  cors =require("cors");
const jwt = require("jsonwebtoken");
const bodyparser=require('body-parser');
const port = process.env.PORT || 4000;
var Author =require("./src/model/author");
var Book =require("./src/model/book");
var User=require("./src/model/user");
const path=require('path');
app.use(express.static('./dist/Frontend'));

app.use(bodyparser.json())

app.use(express.json());

app.use(cors());


function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token == 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

app.post('/api/authoradd',function(req,res){
    // res.header("Access-Control-Allow-Origin","*");
    // res.header("Access-Control-Allow-Methods: GET, POST,PATCH,PUT,DELETE,OPTIONS");
    console.log(req.body)
    var author={
        authorName:req.body.author.authorName,
        famousBook:req.body.author.famousBook,
        nationality:req.body.author.nationality,
        imageUrl:req.body.author.imageUrl
    }
    console.log(author);
    var author=new Author(author);
    author.save();
})

app.post('/api/bookadd',function(req,res){
    // res.header("Access-Control-Allow-Origin","*");
    // res.header("Access-Control-Allow-Methods: GET, POST,PATCH,PUT,DELETE,OPTIONS");
    var book={
        bookTitle:req.body.book.bookTitle,
        bookAuthor:req.body.book.bookAuthor,
        genre:req.body.book.genre,
        imageUrl:req.body.book.imageUrl
    }
    var book=new Book(book);
    book.save();
})

app.get('/api/books',function(req,res){
    // res.header("Access-Control-Allow-Origin","*")
    // res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')
    Book.find()
                .then(function(books){
                    res.send(books);
                });
});
app.get('/api/authors', function(req,res){
    // res.header("Access-Control-Allow-Origin","*")
    // res.header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTIONS')
    Author.find()
    .then(function(authors)
    {
        res.send(authors);
    })
})

app.delete('/api/authordelete/:id',function(req,res){
    // res.header("Access-Control-Allow-Origin","*");
    // res.header("Access-Control-Allow-Methods: GET, POST,PATCH,PUT,DELETE,OPTIONS");

  let id= req.params.id;
  console.log(id);
    Author.findByIdAndRemove({"_id":id})
    .then(()=>
    { console.log("Success");
        res.send()
    })
})

app.delete("/api/bookdelete/:id", function(req,res){
    console.log("im in delete");
    // res.header("Access-Control-Allow-Origin","*");
    // res.header("Access-Control-Allow-Methods: GET, POST,PATCH,PUT,DELETE,OPTIONS");

    let id =req.params.id;
    console.log(id);
    Book.findByIdAndRemove({"_id":id})
    .then(()=>{
        console.log("Deleted book successsfully");
        res.send();
    })

})

app.get('/api/author/:id', function(req,res){
    // res.header("Access-Control-Allow-Origin","*");
    // res.header("Access-Control-Allow-Methods: GET, POST,PATCH,PUT,DELETE,OPTIONS");
    let id= req.params.id;
    console.log(id);
    Author.find({"_id":id})
    .then(function(author){
        console.log(author);
        res.send(author);
    })

})

app.get('/api/book/:id', function(req,res){
    // res.header("Access-Control-Allow-Origin","*");
    // res.header("Access-Control-Allow-Methods: GET, POST,PATCH,PUT,DELETE,OPTIONS");
    let id= req.params.id;
    
    Book.find({"_id":id})
    .then(function(book){
        console.log(book);
        res.send(book);
    })

})

app.post('/api/signup',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS")
     let userData= req.body;
     let user = new User(userData);
     user.save((err,registeredUser)=>{
         if(err){console.log(err)}
         else{
            // let payload = {subject:user._id}
            // let token = jwt.sign(payload,'secretKey') 
            let token ="user"
            res.status(200).send({token})}

     })
})
app.post('/api/login',(req,res)=>{
    let userData =req.body;
    User.findOne({uname: userData.uname},(err,user)=>{
        if(err)
            {
                console.log(err);
            }
        else{
            if(!user)
                {
                    res.status(401).send('Inavlid usename')
                }
            else {
               if(user.password !== userData.password)
                {
                    res.status(401).send('Invalid password')
                }
            else{
               
                    // let payload = {subject:user.uname+user.password}
                    // let token = jwt.sign(payload,'secretKey') 
                    let token = "user"
                    res.status(200).send({token})
                   
                }
               
            }
        }
    })

})

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
   });

app.listen(port, () => {
    console.log("Server ready at" + port)
});
