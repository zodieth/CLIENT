import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../auth0.service";

export const PostLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleHash = async (hash: String) => {
    auth.parseHash({
      hash
    }, (error : Auth0ParseHashError | null, result : Auth0DecodedHash | null) => {
      if(error) {
        console.log("Error: ", error);
      } else {
        const { accessToken, expiresIn, scope, state } = result;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("expiresIn", expiresIn);
        localStorage.setItem("scope", scope);
        localStorage.setItem("state", state);
        if(accessToken) {
          auth.client.userInfo(accessToken, async (error : Auth0Error | null, user : Auth0UserProfile) => {
            if(error) {
              console.log("Error: ", error);
            } else {
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
    } else {
      console.log("El proceso de autenticación no puede continuar");
    };
  }, [location, navigate]);
  return <></>; //Este componente será más bonito...
};