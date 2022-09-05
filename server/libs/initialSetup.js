const Role = require('../models/role.model');

const ROLES = ["user","company","admin"];

module.exports.createRoles = async () => {
  try{
    
    const count = await Role.estimatedDocumentCount();
    if(count >0) return;
    
    const values = await Promise.all([
      new Role({name:ROLES[0]}).save(),
      new Role({name:ROLES[1]}).save(),
      new Role({name:ROLES[2]}).save()
    ]);
    
    console.log(values);
  }
  catch(err){
    console.error(err);
  }
  
}