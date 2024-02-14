const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { ObjectId } = require('mongoose').Types;
const mongoose = require('mongoose');

const authRoutes = require('./router/authRouter');
const notesModel = require('../backend/models/notesModel')
const isEmailValid = require('./utility/validation');
const {requireAuth} = require('../backend/middleware/authMiddleware')

require('./db')
require('dotenv').config();
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT;
app.use(bodyParser.json());




// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

    
//code
const notes = []

//temp
app.get('/', (req, res) => {
    res.status(200).json('This is the message that I want to display at localhost:3000/')
})  

// Get all notes
app.get('/notes', requireAuth, async(req, res) => {
    try {
        const notes = await notesModel.find();  
        res.status(200).json({notes});
    } catch (err) {
        res.json({error : err.message})
    }
})

//Get a particular note
app.get('/notes/:id', requireAuth, async(req, res) => {   
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
app.post('/notes', requireAuth, async(req, res) => {
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
app.put('/notes/:id', requireAuth, (req, res) => {
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
app.delete('/notes/:id', requireAuth, (req, res) => {
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

app.post('/notes/:id/share', requireAuth, (req, res) => {
    const id = req.params.id;
    const {email} = req.body

    if(!email){
        return res.status(422).json({error: "Please enter an Email ID"})
    }
    if(!isEmailValid){
        return res.status(422).json({error: "Invalid Email"})
    }
    notesModel.findOne({email})
    .then((shareUser) => {
        if (!shareUser) {
            return res.status(404).json({error: "Email not found. Please Enter a valid Email ID"})
        }
        notesModel.findOne({_id: id})
        .then((data) => {
            if(!data){
                res.status(404).json({error: "Note not found"})
            }
            if (data.sharedWith.includes(shareUser._id)){
                return res.status(422).json({error: "Note has been already shared with this user"})
            }
            data.sharedWith.push(shareUser._id)
            data.save()
            .then((successNote) => {
                res.status(201).json({message: "Note shared successfully"});
            })
            .catch((err) => {
                res.status(500).json({error: err.message})
            })
        })
        .catch((err) => {
            res.status(500).json({error: err.message})
        })
    })
    .catch((err) => {
        res.status(500).json({error: err.message})
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// routes
// app.get('/', (req, res) => res.render('home'));
// app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);