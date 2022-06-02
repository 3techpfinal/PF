import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'

 const LoginButton = () => {
  const { loginWithRedirect,getAccessTokenWithPopup,getAccessTokenSilently,getIdTokenClaims } = useAuth0();
  const { logout } = useAuth0();


  const { user, isAuthenticated, isLoading } = useAuth0();
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
  <div>
    <button onClick={() =>{ 
      //loginWithRedirect()
      loginWithRedirect().then(()=>getIdTokenClaims()).then(r=>axios.post('http://localhost:3000/users/login',{token:r.__raw}))
      }
      }>Login</button>

<button onClick={() =>{ 
      //loginWithRedirect()
      //console.log(getIdTokenClaims())
      const data={token:'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdoUGVnbzRYOUZsRHp3QmJhamcxeiJ9.eyJnaXZlbl9uYW1lIjoiRGFuaWVsIE5pY29sYXMiLCJmYW1pbHlfbmFtZSI6IkFtaWNvbmUiLCJuaWNrbmFtZSI6Im5pY29hbWljb25lMSIsIm5hbWUiOiJEYW5pZWwgTmljb2xhcyBBbWljb25lIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdpX2l3TlVJaTBlMFl6czlEbUVfa1Fza2lSelVPeDVFVUs5SXdzbFZBPXM5Ni1jIiwibG9jYWxlIjoiZXMtNDE5IiwidXBkYXRlZF9hdCI6IjIwMjItMDYtMDFUMjI6MzA6NDguMzQ1WiIsImVtYWlsIjoibmljb2FtaWNvbmUxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2Rldi1lanlmanJocC51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDg1NDg0NDQ1Mzc0NjE4MTU5ODMiLCJhdWQiOiJUMWgzcnRhWlVub0JuZTVnWHFTSFRzTWQxOEw2ZG00UiIsImlhdCI6MTY1NDEyMjY0OSwiZXhwIjoxNjU0MTU4NjQ5LCJub25jZSI6IlV6azFVVFpJWkRRellrSkVNbjV0TURsa1prVndhMVozTkcxQ1RESjBjVlYwU2sxU2RrdzFUMkp1WVE9PSJ9.ZMTyThBIJDHG--WuJwkle7_kfOrAwEPVJC_W46D_1YvM0XGEas8v4eUGnYpN7k5EYIDCgW_5qD9ZNZqDV2kiVGKzLGQV9XvpdoCN76eIFIEO7zPB-90JLAIO96iiITM8EbLL6sibymrUtJiFDJO5obtKWvG_MOkQWSYEizLGIzWfr6zDRJsAEfCB9phPnTH6H90M0c8NWx49hL9ao6WVI_ddW5Dgmv9lIREYMo0lMrngBOa47mV3r4Ah7rQkF5XQ9t8N6dsBkoqKDrQNvcmzdQN8fWAvIiU_HYW3KTc_PGRWNMTmifazeIUiyGe5N0veRQn71CfjP5Pi0bxweTS7NA'}
      axios.post('http://localhost:3000/authGoogle',data).then((r)=>console.log(r.data)).catch((e)=>console.log(e))
      }
      }>Console</button>

    <button onClick={() => logout({ returnTo: window.location.origin })}>
    Logout
    </button>
</div>
)};






export default LoginButton