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
app.get('/notes', (req, res) => {
    // Implement logic to retrieve all notes
    res.status(200).json('This is the homepage where all the notes will be displayed')
});

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
        console.log(err);
        res.status(400).json({error: err.message})
    })

});

// app.get('/notes/:id', async (req, res) => {
//     const noteId = req.params.id;

//     notesModel.findOne({ _id: noteId })
//         .then((note) => {
//             if (!note) {
//                 return res.status(404).json({ message: 'Note not found' });
//             }

//             res.status(200).json({ note: note });
//         })
//         .catch((error) => {
//             res.status(500).json({ error: error.message });
//         });
// });

// Create a new note
app.post('/notes', async(req, res) => {
    // Implement logic to create a new note
    const {title, body} = req.body

    if(!title || !body){
      return res.status(400).json({error:'Please provide both title and body'});
    }

    try {
        const newNote = new notesModel({title, body});
        // console.log(newNote)
        // newNote.save()
        // .then((data) => {
        //     res.send(201).json({message: "Note created successfully with ID: " + data._id})
        // })
        // .catch((err) => {
        //     // console.log(err)
        //     res.status(500).json({error: err.message})
        // })
        await newNote.save();

        res.status(201).json({message: "Note created successfully with ID: " + newNote._id})
    } catch (err) {
        // console.log(err)
        // console.log(err)
        res.status(500).json({error: err.message})
        
    }   
});

// Update a note by ID
app.put('/notes/:id', (req, res) => {
    // Implement logic to update a note by ID
    
});

// Delete a note by ID
app.delete('/notes/:id', (req, res) => {
    // Implement logic to delete a note by ID
});


// const notesRouter = require('./router/notesRouter')
// app.use('/api/notes', notesRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
