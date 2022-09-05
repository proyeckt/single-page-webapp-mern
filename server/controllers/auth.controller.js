const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const Role = require('../models/role.model');

const ROLES = ["user","company","admin"];

require('dotenv').config();

const Auth = {
  validateToken,
  isAdmin,
  isCompany,
  checkRolesExists,
  checkEmailExists
};

async function validateToken(req,res,next){
  const token = req.headers['x-access-token'];

  if(!token) return res.json({status:false,msg:"Unauthorized. You need to login first."});

  jwt.verify(token,process.env.SECURE_KEY, async function (err, decoded){
    if (err){
      return res.json({
        status:false,
        msg:"You don't have access to this resource. Invalid token."
      });
    }
    else{
      req.userID = decoded.id;
      const user = await User.findById(req.userID);
      if(!user) return res.json({ status:false, msg:"Token provided is not valid."});
      next();
    }
  });
}

async function isAdmin(req,res,next){
  const user = await User.findById(req.userID);
  const roles = await Role.find({_id:{$in:user.roles}});

  var auth = false;

  roles.forEach((rol) => {
    if (rol.name == "admin"){
      auth = true;
      next();
    }
  });
  if(!auth) return res.json({status:false, msg:"Admin role required."});
}

async function isCompany(req,res,next){
  const user = await User.findById(req.userID);
  const roles = await Role.find({_id:{$in:user.roles}});

  var auth = false;

  roles.forEach((rol) => {
    if (rol.name == "company"){
      auth = true;
      next();
    }
  });

  if(!auth) return res.json({status:false, msg:"Company role required."});
}


function checkRolesExists(req,res,next){
  if(req.body.user.roles){
    req.body.user.roles.forEach((rol) =>{
      if(!ROLES.includes(rol))
        return res.json({status: false, code: 2,msg:`Rol ${rol} no existe`});
    });
  }
  next();
}

async function checkEmailExists(req,res,next){
  const user = await User.findOne({email:req.body.user.email});
  if(user) return res.json({status:false, code: 1,msg:'El correo electrónico ingresado ya se encuentra registrado.'});
  next();
}


module.exports = Auth;