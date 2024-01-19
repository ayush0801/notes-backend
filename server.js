const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());


//code
const notes = []

// Get all notes
app.get('/notes', (req, res) => {
    // Implement logic to retrieve all notes
    
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
