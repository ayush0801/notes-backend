const express = require('express')
const app = express()
const router = express.Router()

const notesModel = require('../model/notesModel');

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
    if(!mongoose.Types.ObjectId.isValid(noteID)){
        res.status(400).json({message: 'Invalid Note ID'});
    }
    noteID.findById(noteID)
    .then((note) => {
        if(!note){
            return res.status(404).json({message: 'Note does not exist'});
        }
        res.json(note);
    })
    .catch((error) => {
        console.log(error);
    })

});

// Create a new note
app.post('/notes', (req, res) => {
    // Implement logic to create a new note
    const {title, body} = req.body

    if(!title || !body){
      return res.status(400).json({error:'Please provide both title and body'});
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



module.exports = router