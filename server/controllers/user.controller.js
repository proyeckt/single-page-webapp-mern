const User = require('../models/user.model');
const Role = require('../models/role.model');

const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports.loginUser = async (req, res) => {

    const {email, password} = req.body;  
    
    const user = await User.findOne({email:email}).populate("roles");

    if(user){
      const auth = await user.verifyPassword(password);
      if(auth){
        const token = jwt.sign({id:user._id},process.env.SECURE_KEY,{
          expiresIn:86400 // value in ms equal to 24h
        });

        if(!token){
          return res.json({
            auth:false,
            code: 3,
            msg:'La solicitud no ha podido ser confirmada. Intentalo más tarde.',
          });
        }
        return res.json({
          auth:true,
          code:0,
          msg:'Ingreso exitoso.',
          token:token
        });
      }
      return res.json({
        auth:false,
        code: 1,
        msg:'La contraseña ingresada es incorrecta. Intenta nuevamente.',
      });
    }
    return res.json({
      auth:false,
      code: 2,
      msg:'El correo electrónico ingresado no se encuentra registrado.',
    });

}

module.exports.logoutUser = (req, res) => {
    
}

module.exports.createUser = async (req, res) => {
    try{
      const newUser = new User(req.body.user);
      if (req.body.user.roles){
        const foundRoles = await Role.find({name:{$in: req.body.user.roles}});
        newUser.roles = foundRoles.map(role => role._id);
      }
      else{
        const defaultRole = await Role.findOne({name:"user"});
        newUser.roles = [defaultRole._id];
      }

      const savedUser = await newUser.save();
      console.log(savedUser);
      return res.json({status:true,code: 0, msg: "El registro se ha completado  exitosamente.",user:savedUser});
    }
    catch(err){
      res.status(500).json({status:false, code: 3, msg: 'No ha podido realizarse el registro. Intenta nuevamente',error: err});
    }
}

module.exports.deleteAll = async (req, res) => {
    await User.deleteMany()
        .then(deleted => res.json({deleted}))
        .catch(err => res.status(500).json({ error: err, msg: 'Ups havent been able to create the user' }));
}

module.exports.getUsers = (req, res) => {
  User.find()
      .then(users => res.json({ users }))
      .catch(err => res.status(500).json({ error: err, msg: 'Ups havent been able to bring the users' }))
}

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
      .then(user => res.json({ user }))
      .catch(err => res.status(404).json({ error: err, msg: 'Ups havent been able to bring the user' }));
}
