import * as React from 'react'
import NavBar from './NavBar'
import { Box, Typography } from '@mui/material'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/500.css';

const LoginGoogle=()=>{
    return(
    <>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
    <div id="g_id_onload"
         data-client_id="715638807647-7hjrrq0c7iqu0imiku0hc9nnmbo762h2.apps.googleusercontent.com"
         data-auto_prompt="false"
         data-callback="handleCredentialResponse">
            
    </div>
    <div class="g_id_signin"
         data-type="standard"
         data-size="large"
         data-theme="outline"
         data-text="sign_in_with"
         data-shape="rectangular"
         data-logo_alignment="left">
    </div>


    <script>
        {function handleCredentialResponse(response) {
            console.log("idtoken",response.credential)
        }}
    </script>

    </>
    )
}

export default LoginGoogle