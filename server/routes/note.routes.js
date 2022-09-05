const Auth = require('../controllers/auth.controller');

const Note = require('../controllers/note.controller');

module.exports = (app) => {
    app.get('/api/notes',Note.getNotes);
    app.post('/api/notes/create',Note.createNote);
    app.get('/api/note/:id',Note.getNoteById);
    app.delete('/api/notes/delete/:id',Note.deleteNote);
    app.put('/api/notes/edit/:id',Note.updateNote);
    app.put('/api/note/archive/:id',Note.changeArchivedState);
}