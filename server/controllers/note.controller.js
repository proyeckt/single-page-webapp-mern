const note = require('../models/note.model');


module.exports.createNote = (req, res) => {
    console.log(req.body.note);
    note.create(req.body.note)
        .then(newNote => res.json({ newNote }))
        .catch(err => res.status(500).json({ error: err, msg: 'Ups havent been able to create the note' }));
}

module.exports.getNotes = (req, res) => {
    console.log(req.userID);
    note.find()
        .then(notes => res.json({ notes }))
        .catch(err => res.status(500).json({ error: err, msg: 'Ups havent been able to bring the notes' }));
};

module.exports.getNoteById = (req, res) => {
    note.findById(req.params.id)
        .then(note => res.json({ note }))
        .catch(err => res.status(404).json({ error: err, msg: 'Ups havent been able to bring the note' }));
}

module.exports.deleteNote = (req, res) => {
    note.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json({ deleteConfirmation }))
        .catch(err => res.status(500).json({ msg: 'Ups havent been able to delete the note', error: err }));
}

module.exports.updateNote = (req, res) => {
    note.findByIdAndUpdate(req.params.id, req.body.note, { new: true })
        .then(updateNote => res.json({ updateNote }))
        .catch(err => res.status(500).json({ msg: 'Ups havent been able to update the note', error: err }));
}

module.exports.changeArchivedState = (req, res) => {
  note.findByIdAndUpdate(req.params.id, { $bit: { archived: { xor: 1 } }} )
    .then(archive => res.json({ archive }))
    .catch(err => res.status(500).json({ msg: 'No se pudo cambiar el estado de archivado', error: err }));
}
