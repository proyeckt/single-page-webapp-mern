const Auth = require('../controllers/auth.controller');

const User = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/api/users/login',User.loginUser);
    app.post('/api/users/logout',Auth.validateToken,User.logoutUser);
    app.post('/api/users/create',[Auth.checkEmailExists,Auth.checkRolesExists],User.createUser);
    app.delete('/api/users/delete/all',[Auth.validateToken,Auth.isAdmin],User.deleteAll);
    app.get('/api/users',[Auth.validateToken,Auth.isAdmin],User.getUsers);
    app.get('/api/users/:id',[Auth.validateToken,Auth.isAdmin],User.getUserById);
}