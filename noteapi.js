
require('dotenv').config()

const express=require('express')
const app=express()
app.use(express.json())

const cors= require('cors');
app.use(cors());

const mongoClient=require('mongodb').MongoClient;

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