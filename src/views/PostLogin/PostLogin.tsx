import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../auth0.service";
import { 
  AUTH0_CALLBACK_URL,
  AUTH0_CLIENT_ID } from "../../auth0.config";
import Swal from "sweetalert2";

export default function PostLogin() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("email");
    localStorage.removeItem("accessToken");
    await auth.logout({
      returnTo: `${AUTH0_CALLBACK_URL}/signin`,
      clientID: AUTH0_CLIENT_ID
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
              const Toast = Swal.mixin({
                toast: false,
                position: "center",
                showConfirmButton: true
              });
              Toast.fire({
                icon: "error",
                title: "Oops...",
                text: "El proceso de autenticación no ha sido exitoso. Por favor, intenta más tarde."
              });
              await handleLogout();
            } else {
              if(!user.email_verified) {
                const Toast = Swal.mixin({
                  toast: false,
                  position: "center",
                  showConfirmButton: true
                });
                Toast.fire({
                  icon: "info",
                  title: "Ten en cuenta...",
                  text: "Debes verificar tu correo electrónico antes de ingresar por primera vez."
                });
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
    };
  }, []);
  return <></>; //En esta vista, el usuario no estará más de cinco segundos, por eso está en blanco...
};