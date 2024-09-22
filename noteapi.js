
require('dotenv').config()

const express=require('express')
const app=express()
const mongoose=require('mongoose')
const mongoClient=require('mongodb').MongoClient;
app.use(express.json())

//initialize database............................
let database='Database'
mongoClient.connect(process.env.mongoUrl).then(clientObject=>{
    database=clientObject.db('My-notes');
})

//default response.................................
app.get('/',(req,res)=>{
    res.send('Welcome to NETFLIX API.')
})


//all notes....................................
app.get('/notes',(request,response)=>{
        database.collection('notes').find({}).toArray().then(documents=>{
        response.send(documents);
        response.end();
    })
})

//Listen///////////////////////////////////////////////
app.listen(process.env.PORT,()=>console.log('server started.'))