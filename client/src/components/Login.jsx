import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

 const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();


  const { user, isAuthenticated, isLoading } = useAuth0();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
  <div>
    <button onClick={() => loginWithRedirect()}>Login</button>

    <button onClick={() => logout({ returnTo: window.location.origin })}>
    Logout
    </button>
</div>
)};






export default LoginButton