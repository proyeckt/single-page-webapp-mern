//const axios = require('axios');

export const authServices = {
  saveToken,
  loadToken,
  removeToken
};

function saveToken(token){
  console.log(token);

  localStorage.setItem('user',token);
}

function removeToken(){
  localStorage.removeItem('user');
  //localStorage.clear();
}

function loadToken(){
  const user = localStorage.getItem('user');
  console.log(user);
  return {'x-access-token':user};
}

/*async function loadToken(token) {
    console.log(token);
    
    const res = await axios.post('http://localhost:8080/api/auth/validate',{
    token});

    if(res.userID){
      navigate.
    }

  }
}*/