import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../auth0.service";

export default function PostLogin() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("scope");
    localStorage.removeItem("state");
    await auth.logout({
      returnTo: `${window.location.origin}/signin`,
      clientID: "2EHZJm086BzkgwY5HXmPeK5UnbHegBXl"
    });
  };
  
  const handleHash = async (hash: String) => {
    await auth.parseHash({
      hash
    }, async (error : Auth0ParseHashError | null, result : Auth0DecodedHash | null) => {
      if(error) {
        console.log("Error: ", error);
      } else {
        const { accessToken } = result;
        localStorage.setItem("accessToken", accessToken);
        if(accessToken) {
          await auth.client.userInfo(accessToken, async (error : Auth0Error | null, user : Auth0UserProfile) => {
            if(error) {
              console.log("Error: ", error);
            } else {
              if(!user.email_verified) {
                window.alert("Debes verificar tu correo electrónico antes de ingresar por primera vez.");
                await handleLogout();
              } else {
                navigate("/");
              };
            };
          });
        };
      };
    });
  };

  useEffect(() => {
    if(location.hash) {
      handleHash(location.hash);
    } else {
      window.alert("El proceso de autenticación no ha sido exitoso. Por favor, intenta más tarde.");
      navigate("/");
    };
  }, [location, navigate]);
  return <></>; //En esta vista, el usuario no estará más de cinco segundos, por eso está en blanco...
};