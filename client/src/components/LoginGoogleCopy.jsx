import React from 'react';
import ReactDOM from 'react-dom';
import {GoogleLogin} from 'react-google-login';
import {createRoot} from 'react-dom/client'



//const root =createRoot(document.getElementById('root'))
const root = ReactDOM.createRoot(document.getElementById('root'));
const LoginGoogleCopy=()=>{

   const responseGoogle = (response) => {
      console.log(response);
    }
    

root.render(
  <GoogleLogin
    clientId="715638807647-7hjrrq0c7iqu0imiku0hc9nnmbo762h2.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />,
  document.getElementById('googleButton')
);



}
export default LoginGoogleCopy