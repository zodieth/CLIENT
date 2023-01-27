import style from "./products.module.css"
import { Input } from "@chakra-ui/input";
import { SetStateAction, useState } from "react";

export default function ProductAdmin() {

  return (
    <div className={style.container}>
      <div className={style.groupInputs}>
        <label>HOLA</label>
        <Input 
          type="text"
          name="name"
          placeholder="Nombre del producto"
          width='auto' 
        />
      </div>
      <div className={style.groupInputs}>
        <label>HOLA2</label>
        <Input width='auto' type="text"/>
      </div>
      <hr className={style.hrLineDashed}/>
      <div className={style.groupButtons}>
        <button className={style.btnWhite}>Cancelar</button>
        <button className={style.btnPrimary}>Guardar</button>
      </div>
    </div>
  );
}