const tag = require('../models/tag.model');


module.exports.createTag = (req, res) => {
    console.log(req.body.tag);
    note.create(req.body.tag)
        .then(newTag => res.json({ newTag }))
        .catch(err => res.status(500).json({ error: err, msg: 'Ups havent been able to create the tag' }));
}

module.exports.getTags = (req, res) => {
    tag.find()
        .then(tags => res.json({ tags }))
        .catch(err => res.status(500).json({ error: err, msg: 'Ups havent been able to bring the tags' }));
};

module.exports.getTagById = (req, res) => {
    tag.findById(req.params.id)
        .then(tag => res.json({ tag }))
        .catch(err => res.status(404).json({ error: err, msg: 'Ups havent been able to bring the tag' }));
}

module.exports.getTagByName = (req, res) => {
    tag.find({name:req.params.name})
        .then(tag => res.json({ tag }))
        .catch(err => res.status(404).json({ error: err, msg: 'Ups havent been able to bring the tag' }));
}

module.exports.deleteTag = (req, res) => {
    tag.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json({ deleteConfirmation }))
        .catch(err => res.status(500).json({ msg: 'Ups havent been able to delete the note', error: err }));
}

module.exports.updateNote = (req, res) => {
    note.findByIdAndUpdate(req.params.id, req.body.note, { new: true })
        .then(updateNote => res.json({ updateNote }))
        .catch(err => res.status(500).json({ msg: 'Ups havent been able to update the tag', error: err }));
}
