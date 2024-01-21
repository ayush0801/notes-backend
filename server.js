const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());


//code
const notes = []


// Get all notes
app.get('/notes', (req, res) => {
    // Implement logic to retrieve all notes
    res.status(200).send('This is the homepage where all the notes will be displayed')
});

//Get a particular note
app.get('/notes/:id', (req, res) => {   
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
});

// Update a note by ID
app.put('/notes/:id', (req, res) => {
    // Implement logic to update a note by ID
    
});

// Delete a note by ID
app.delete('/notes/:id', (req, res) => {
    // Implement logic to delete a note by ID
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
