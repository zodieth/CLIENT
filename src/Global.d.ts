declare module "*.module.css";
declare module "*.module.scss";
declare module "*.css";
declare module "*.jpg";
declare module "*.png";
declare module "*.webp";
declare module "auth0"; //Probablemente NO lo necesitemos más...
declare module "auth0-js"
declare type Auth0Error = typeof import("auth0");
declare type Auth0ParseHashError = typeof import("auth0");
declare type Auth0DecodedHash = typeof import("auth0");
declare type Auth0UserProfile = typeof import("auth0");