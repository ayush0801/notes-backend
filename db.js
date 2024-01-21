
const mongoose = require('mongoose');

const url = 'mongodb+srv://jha4:Valorant0@cluster0.60zyusp.mongodb.net/my-notes?retryWrites=true&w=majority';

mongoose.connect(url).then((db) => {
    console.log(`conection with db successfull with id ${db.connection.id}`)
}).catch((err) => {
    console.log(err)
})

// mongoose.connect('mongodb+srv://jha4:Valorant0@cluster0.60zyusp.mongodb.net/notes-app?retryWrites=true&w=majority');

// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log('MongoDB database connection established successfully');
// });