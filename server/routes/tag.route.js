const Tag = require('../controllers/tag.controller');

module.exports = (app) => {
    app.get('/api/tags',Tag.getTags);
    app.post('/api/tags/create',Tag.createTag);
    app.get('/api/tag/:id',Tag.getTagById);
    app.get('/api/tag/:id',Tag.getTagByName);
    app.delete('/api/tags/delete/:id',Tag.deleteTag);
    app.put('/api/tags/edit/:id',Tag.updateTag);
}