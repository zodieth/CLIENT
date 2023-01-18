import React, { useState } from "react";
import style from "./navBar.module.css";
import { Button } from "@chakra-ui/react";
import SearchBar from "../SearchBar/SearchBar";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaShoppingCart } from "react-icons/fa";
import { MdComputer } from "react-icons/md";
import { Link } from "react-router-dom";

function NavBar() {
  const [cartItems, setCartItems] = useState(1);

  return (
    <div className={style.navBar}>
      <div className={style.logo}>
        <HamburgerIcon boxSize={8} color="black" />
        <h1 className={style.h1Logo}> AllTech</h1>
      </div>
      <div>
        <SearchBar />
      </div>
      <div className={style.buttons}>
        <Link to="/cart" className={style.cartI}>
          {/* <Icon
            className={style.cart}
            as={FaShoppingCart}
            color="black"
            boxSize={8}
          /> */}
          <Button
            leftIcon={<FaShoppingCart />}
            className={style.items}
            colorScheme="blue"
            variant="solid"
          >
            {cartItems}
          </Button>
        </Link>

        <Button
          rightIcon={<MdComputer />}
          className={style.button}
          colorScheme="blue"
          variant="solid"
        >
          Arma tu PC
        </Button>
        <Button className={style.button} colorScheme="teal" variant="solid">
          Ingresar
        </Button>
      </div>
    </div>
  );
}

export default NavBar;
