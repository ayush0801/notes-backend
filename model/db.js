const mongoose = require('mongoose');

const url = 'mongodb+srv://jha4:Valorant0@cluster0.60zyusp.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(url).then((db) => {
   console.log(`conection with db successfull with id ${db.connection.id}`)
}).catch((err) => {
   console.log(err)
})