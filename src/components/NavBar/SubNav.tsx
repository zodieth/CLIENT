import React from "react";
import { Select, Button } from "@chakra-ui/react";
import style from "./navBar.module.css";
import { MdCall } from "react-icons/md";

function SubNav() {
  return (
    <div className={style.subNav}>
      <div className={style.selects}>
        <div className={style.options}>
          <Select
            className={style.select}
            placeholder="Productos"
            color="Gray"
            borderColor="Gray"
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </div>
        <div className={style.options}>
          <Select
            className={style.select}
            placeholder="Placas de Video"
            color="Gray"
            borderColor="Gray"
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </div>
        <div className={style.options}>
          <Select
            className={style.select}
            placeholder="Procesadores"
            color="Gray"
            borderColor="Gray"
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </div>
        <div className={style.options}>
          <Select
            className={style.select}
            placeholder="Monitores"
            color="Gray"
            borderColor="Gray"
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </div>
      </div>
      <div className={style.ayuda}>
        <Button rightIcon={<MdCall />} colorScheme="blue" variant="outline">
          Call us
        </Button>
      </div>
    </div>
  );
}

export default SubNav;
