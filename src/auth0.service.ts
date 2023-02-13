import auth0 from "auth0-js";
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN, AUTH0_USER_SCOPE, AUTH0_AUDIENCE } from "./auth0.config";
export const auth = new auth0.WebAuth({
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID,
  scope: AUTH0_USER_SCOPE,
  audience: AUTH0_AUDIENCE
});