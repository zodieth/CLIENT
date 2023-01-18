import React from "react";
import style from "./navBar.module.css";

import { Button } from "@chakra-ui/react";
import SearchBar from "../SearchBar/SearchBar";
import { HamburgerIcon } from "@chakra-ui/icons";

function NavBar() {
  return (
    <div className={style.navBar}>
      <div className={style.logo}>
        <HamburgerIcon boxSize={8} color="black" />
        <h1 className={style.h1Logo}> AllTech</h1>
      </div>
      <div>
        <SearchBar />
      </div>
      {/* --------------buttons */}
      <div className={style.buttons}>
        <Button className={style.button} colorScheme="teal" variant="solid">
          Arma tu PC
        </Button>
        <Button className={style.button} colorScheme="teal" variant="solid">
          Ingresar
        </Button>
      </div>
      {/* --------------buttons */}
    </div>
  );
}

export default NavBar;
