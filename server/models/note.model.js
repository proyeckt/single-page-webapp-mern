const { Schema, model } = require('mongoose');

const NoteSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Debe ingrear el titulo de la nota'],
    },
    content: {
        type: String,
    },
    last_edited: {
        type: Date,
    },
    archived:{
      type: Number,
      default: 0
    },
    tags: [{
      ref: "Tag",
      type: Schema.Types.ObjectId
    }]
}, {versionKey: false});

const Note = model('Note', NoteSchema);

module.exports = Note;