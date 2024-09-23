
require('dotenv').config()

var cors= require('cors');
const app=express()
const mongoose=require('mongoose')
const mongoClient=require('mongodb').MongoClient;
app.use(express.json())
app.use(cors());
const express=require('express')


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://webapis-j8hu.onrender.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  

//initialize database............................
let database='Database'
mongoClient.connect(process.env.mongoUrl).then(clientObject=>{
    database=clientObject.db('My-notes');
})

//default response.................................
app.get('/',(req,res)=>{
    res.send('Welcome to Note API.')
})


//all notes....................................
app.get('/notes',(request,response)=>{
        database.collection('notes').find({}).toArray().then(documents=>{
        response.send(documents);
        response.end();
    })
})

//add notes.....................................

app.post('/addnote',(request,response)=>{
    var newNote={
        Title:request.body.Title,
        Descriptions:request.body.Descriptions,
        uid:Date.now().toString()
    }
    database.collection('notes').insertOne(newNote);
    response.end();
})


//delete notes.............................................
app.delete('/deletenote/:id',(request,response)=>{
    var id=request.params.id;
    database.collection('notes').deleteOne({uid:id});
        response.end();
})

//Listen///////////////////////////////////////////////
app.listen(process.env.PORT,()=>console.log('server started.'))