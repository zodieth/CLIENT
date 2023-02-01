import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../auth0.service";

export const PostLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleHash = (hash: String) => {
    auth.parseHash({
      hash
    }, (error : Auth0ParseHashError | null, token : Auth0DecodedHash | null) => {
      if(error) {
        console.log("Ups, algo salió, mal.");
        console.log(error);
      } else {
        const { accessToken } = token;
        console.log(token);
        //Este token hay que guardarlo en LocalStorage y usarlo para proteger las rutas del frontend...
        if(accessToken) {
          auth.client.userInfo(accessToken, (error : Auth0Error | null, user : Auth0UserProfile) => {
            if(error) {
              console.log("No fue posible acceder a la información del usuario.");
            } else {
              console.log(user);
              navigate("/");
            };
          });
        };
      };
    });
  };

  useEffect(() => {
    if(location.hash) {
      handleHash(location.hash);
      // navigate(window.location.origin); // ¿Dónde debería ir esta línea?
    } else {
      console.log("El proceso de autenticación no puede continuar");
    };
  }, [location, navigate]);
  return <>Loading...</>; //Este componente será más bonito...
};