const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongoose').Types;
const mongoose = require('mongoose');
const app = express();
require('./db')
const PORT = 3000;
app.use(bodyParser.json());


const notesModel = require('../backend/model/notesModel')

//code
const notes = []

//temp
app.get('/', (req, res) => {
    res.status(200).json('This is the message that i want to display at localhost:3000/')
})  

// Get all notes
app.get('/notes', async(req, res) => {
    try {
        const notes = await notesModel.find();  
        res.status(200).json({notes});
    } catch (err) {
        res.json({error : err.message})
    }
})

//Get a particular note
app.get('/notes/:id', async(req, res) => {   
    // Implement logic to retrieve a particular note
    const noteID = req.params.id;
    if (!ObjectId.isValid(noteID)) {
        return res.status(400).json({ error: 'Invalid note ID format' });
    }
    notesModel.findOne({_id:noteID})
    .then((data) => {
        res.status(200).json({note: data});
    })
    .catch((err) => {
        // console.log(err);
        res.status(400).json({error: err.message})
    })

});

// Create a new note
app.post('/notes', async(req, res) => {
    const {title, body} = req.body
    if(!title || !body){
      return res.status(400).json({error:'Please provide both title and body'});
    }
    try {
        const newNote = new notesModel({title, body});
        await newNote.save();   
        res.status(201).json({message: "Note created successfully with ID: " + newNote._id})
    } catch (err) {
        res.status(500).json({error: err.message})
    }   
});

// Update a note by ID
app.put('/notes/:id', (req, res) => {
    // Implement logic to update a note by ID
    const id = req.params.id
    const thingsToUpdate = {}
    const {title, body} = req.body
    if(title && body){
        if(title.length < 3){
            return res.status(422).json({error: "Title should be atleast 3 characters"})
        }
        if(body.length < 10){
            return res.status(422).json({error: "Body should be atleast 10 characters"})
        }
        thingsToUpdate.title = title
        thingsToUpdate.body = body
    }
    else if(title){
        if(title.length < 3){
            return res.status(422).json({error: "Title should be atleast 3 characters"})
        }
        thingsToUpdate.title = title
    }
    else if(body){
        if(body.length < 10){
            return res.status(422).json({error: "Body should be atleast 10 characters"})
        }
        thingsToUpdate.body = body
    }
    else{
        return res.status(422).json({error: "Please fill any one field"})
    }
    //-----------------If no Title or Body will be passed, then this code will not work---------------------------

    // if(title.length < 3){
    //     return res.status(422).json({error: "Title should be atleast 3 characters"})
    // }
    // if(body.length < 10){
    //     return res.status(422).json({error: "Body should be atleast 10 characters"})
    // }
    // thingsToUpdate.title = title
    // thingsToUpdate.body = body
    notesModel.findOneAndUpdate({_id:id}, {$set: thingsToUpdate})
    .then((data) => {
        if(!data){
            res.status(404).json({error: "No data found"})
        }
        else{
            res.status(200).json({message: "Note Updated Successfully"})
        }
    })
    .catch((err) => {
        res.status(500).json({error: err.message})
    })
});

// Delete a note by ID
app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    notesModel.findOneAndDelete({_id: id})
    .then((data) => {
        if (!data) {
            res.status(404).json({error: "No Data Found"})
        }
        else {
            res.status(200).json({message:"Deleted the Note!"})
        }
    })
        .catch((err) => {
        res.status(500).json({error: err.message})
        })
});


// const notesRouter = require('./router/notesRouter')
// app.use('/api/notes', notesRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
