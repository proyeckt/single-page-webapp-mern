const { 
    validateToken,
 } = require('../controllers/auth.controller');

module.exports = (app) => {
    app.post('/api/auth/validate',validateToken);
}