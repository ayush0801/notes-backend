const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
   title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title should be minimum 3 characters long"]
   },
   body: {
      type: String,
      required: [true, "Body is required"],
      minlength: [10,"The description should be minimum 10 characters long" ]
   }
});

noteSchema.index({body: 'text', title: 'text'})
const notesModel = mongoose.model('Note', noteSchema)
module.exports = notesModel