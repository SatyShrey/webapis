
require('dotenv').config()

const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const mongoUrl = process.env.mongoUrl;
const PORT = process.env.PORT;
const mongoClient = require('mongodb').MongoClient;


//default response.................................
app.get('/', (req, res) => {
    mongoClient.connect(mongoUrl).then(clientObject => {
        var database = clientObject.db('My-notes');
        res.send('Welcome to Note API.')
    })
})


//all notes....................................
app.get('/notes', (request, response) => {
    mongoClient.connect(mongoUrl).then(clientObject => {
        var database = clientObject.db('My-notes');
        database.collection('notes').find({}).toArray().then(documents => {
            response.send(documents);
            response.end();
        })
    })
})

//add notes.....................................
app.post('/addnote', (request, response) => {
    var newNote = {
        Title: request.body.Title,
        Descriptions: request.body.Descriptions,
        uid: Date.now().toString()
    }
    mongoClient.connect(mongoUrl).then(clientObject => {
        var database = clientObject.db('My-notes');
        database.collection('notes').insertOne(newNote);
        response.end();
    })
})


//delete notes.............................................
app.delete('/deletenote/:id', (request, response) => {
    var id = request.params.id;
    mongoClient.connect(mongoUrl).then(clientObject => {
        var database = clientObject.db('My-notes');
        database.collection('notes').deleteOne({ uid: id });
        response.end();
    })
})


//Listen///////////////////////////////////////////////
app.listen(PORT, () => console.log('Server started ' + PORT))