import style from "./armado.module.css";
import NavBar from "../../components/NavBar/NavBar";
import { useState } from "react";
import cpu from "./armapcImages/cpu2.png";
import mother from "./armapcImages/mother1.png";
import cooler from "./armapcImages/cooler1.png";
import ramMemory from "./armapcImages/memo1.png";
import gpuI from "./armapcImages/gpu1.png";
import diskI from "./armapcImages/hhd1.png";
import powerI from "./armapcImages/poder1.png";
import gabinete from "./armapcImages/gabo1.png";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProductsApi } from "../../app/actionsCreators";
import { useEffect } from "react";
import { Divider, LightMode } from "@chakra-ui/react";
import interfaceProduct from "../../features/products/interfaceProduct";
import { Button } from "@chakra-ui/react";
import { addToCart } from "../../app/actionsCreators";
import Card from "./Card";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

function ArmaPC() {
  const [procesadorImg, setProcesadorImg] = useState(cpu);
  const [motherboardImg, setMotherboardImg] = useState(mother);
  const [coolerImg, setCoolerImg] = useState(cooler);
  const [ramImg, setRamImg] = useState(ramMemory);
  const [gpuImg, setGpuImg] = useState(gpuI);
  const [diskImg, setDiskImg] = useState(diskI);
  const [powerImg, setPowerImg] = useState(powerI);
  const [gabineteImg, setGabineteImg] = useState(gabinete);

  const [procesadorName, setProcesadorName] = useState("");
  const [motherboardName, setMotherboardName] = useState("");
  const [coolerName, setCoolerName] = useState("");
  const [ramName, setRamName] = useState("");
  const [gpuName, setGpuName] = useState("");
  const [diskName, setDiskName] = useState("");
  const [powerName, setPowerName] = useState("");
  const [gabineteName, setGabineteName] = useState("");

  const [componentsImg, setComponentsImg] = useState({
    procesador: procesadorImg,
    motherboard: motherboardImg,
    cooler: coolerImg,
    ram: ramImg,
    gpu: gpuImg,
    disk: diskImg,
    power: powerImg,
    gabinete: gabineteImg,
  });

  const [componentName, setComponentName] = useState({
    procesador: procesadorName,
    motherboard: motherboardName,
    cooler: coolerName,
    ram: ramName,
    gpu: gpuName,
    disk: diskName,
    power: powerName,
    gabinete: gabineteName,
  });

  const [total, setTotal] = useState(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsApi());
  }, [dispatch]);

  const products = useAppSelector((state: any) => state.products);

  const [procesadorCards, setProcesadorCards] = useState(true);
  const procesador = products.allProducts.filter(
    (product: interfaceProduct) => product.category?.name === "Procesadores"
  );

  const procesadorDescription = procesador.map((e: any) => e.description);

  const [motherCards, setMotherCards] = useState(false);
  const mothers = products.allProducts.filter(
    (product: interfaceProduct) => product.category?.name === "Motherboards"
  );

  const socket = mothers.filter(
    (m: interfaceProduct) => m.description === "Socket LGA1700"
  );

  const [coolerCards, setCoolerCards] = useState(false);
  const coolers = products.allProducts.filter(
    (product: interfaceProduct) => product.category?.name === "Cooling"
  );

  const [ramCards, setRamCards] = useState(false);
  const ram = products.allProducts.filter(
    (product: interfaceProduct) => product.category?.name === "Memorias"
  );

  const [gpuCards, setGpuCards] = useState(false);
  const gpu = products.allProducts.filter(
    (product: interfaceProduct) => product.category?.name === "Gráficas"
  );

  const [diskCards, setDiskCards] = useState(false);
  const disk = products.allProducts.filter(
    (product: interfaceProduct) => product.category?.name === "Almacenamiento"
  );

  const [powerCards, setPowerCards] = useState(false);
  const power = products.allProducts.filter(
    (product: interfaceProduct) => product.category?.name === "Fuentes"
  );

  const [gabineteCards, setGabineteCards] = useState(false);
  const gabinetes = products.allProducts.filter(
    (product: interfaceProduct) => product.category?.name === "Gabinetes"
  );

  const addToCartPC = (value: any) => {
    let card = {
      name: value.name,
      price: value.price,
      img: value.images[0],
      reviews: value.reviews,
      count: 1,
    };
    dispatch(addToCart(card));
  };

  const addToCartAlert = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Agregado Correctamente",
    });
  };

  return (
    <div className={style.armado}>
      <NavBar />
      <div className={style.build}>
        <div className={style.componentsPhotos}>
          {/* --------------------------------------------- */}
          <div className={style.box}>
            <img
              className={style.photoComponent}
              src={componentsImg.procesador}
              alt="procesador"
            />
            <div className={style.componentName}>
              {componentName.procesador}
            </div>
          </div>
          {/* --------------------------------------------- */}
          <div className={style.box}>
            <img
              className={style.photoComponent}
              src={componentsImg.motherboard}
              alt="motherboard"
            />
            <div className={style.componentName}>
              {componentName.motherboard}
            </div>
          </div>
          {/* ------------------------------------ */}
          <div className={style.box}>
            <img
              className={style.photoComponent}
              src={componentsImg.cooler}
              alt="cooler"
            />
            <div className={style.componentName}>{componentName.cooler}</div>
          </div>
          {/* ------------------------------------------ */}
          <div className={style.box}>
            <img
              className={style.photoComponent}
              src={componentsImg.ram}
              alt="ram"
            />
            <div className={style.componentName}>{componentName.ram}</div>
          </div>
          {/* ------------------------------------------ */}
          <div className={style.box}>
            <img
              className={style.photoComponent}
              src={componentsImg.gpu}
              alt="gpu"
            />
            <div className={style.componentName}>{componentName.gpu}</div>
          </div>
          {/* --------------------------------------------------  */}
          <div className={style.box}>
            <img
              className={style.photoComponent}
              src={componentsImg.disk}
              alt="disk"
            />
            <div className={style.componentName}>{componentName.disk}</div>
          </div>
          {/* --------------------------------------------------  */}
          <div className={style.box}>
            <img
              className={style.photoComponent}
              src={componentsImg.power}
              alt="power"
            />
            <div className={style.componentName}>{componentName.power}</div>
          </div>
          {/* --------------------------------------------------  */}
          <div className={style.box}>
            <img
              className={style.photoComponent}
              src={componentsImg.gabinete}
              alt="gabinete"
            />
            <div className={style.componentName}>{componentName.gabinete}</div>
          </div>
          {/* ---------------------------------------------------------- */}
          <div className={style.totalContainer}>
            <div className={style.subContainerTotal}>
              <Link to="/cart">
                <Button onClick={() => [addToCartAlert()]}>
                  Agregar al Carrito
                </Button>
              </Link>

              <div>
                <div className={style.total}>TOTAL: ${total}</div>
              </div>
            </div>
          </div>
          {/* -------------------------------------------- */}
        </div>
        {/* --------------------------PROCESADOR---------------------------------------*/}
        {procesadorCards === true ? (
          <div className={style.cardsProducts}>
            {procesador.map((e: any, index: any) => {
              return (
                <div
                  key={index}
                  onClick={() => [
                    setComponentsImg({
                      procesador: e.images[0],
                      motherboard: mother,
                      cooler: cooler,
                      ram: ramMemory,
                      gpu: gpuI,
                      disk: diskI,
                      power: powerI,
                      gabinete: gabinete,
                    }),
                    setProcesadorImg(e.images[0]),
                    setComponentName({
                      procesador: e.name,
                      motherboard: "",
                      cooler: "",
                      ram: "",
                      gpu: "",
                      disk: "",
                      power: "",
                      gabinete: "",
                    }),
                    setProcesadorName(e.name),
                    addToCartPC(e),
                    setTotal(total + e.price),
                    setProcesadorCards(false),
                    setMotherCards(true),
                  ]}
                >
                  <Card img={e.images[0]} name={e.name} price={e.price} />
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
        {/* -------------------------------------------------------------------------- */}
        {/* ------------------------------MOTHERBOARD-------------------------------- */}
        {motherCards === true ? (
          <div className={style.cardsProducts}>
            {socket.map((e: any, index: any) => {
              return (
                <div
                  key={index}
                  onClick={() => [
                    setComponentsImg({
                      procesador: procesadorImg,
                      motherboard: e.images[0],
                      cooler: cooler,
                      ram: ramMemory,
                      gpu: gpuI,
                      disk: diskI,
                      power: powerI,
                      gabinete: gabinete,
                    }),
                    setMotherboardImg(e.images[0]),
                    setComponentName({
                      procesador: procesadorName,
                      motherboard: e.name,
                      cooler: "",
                      ram: "",
                      gpu: "",
                      disk: "",
                      power: "",
                      gabinete: "",
                    }),
                    setMotherboardName(e.name),
                    addToCartPC(e),
                    setTotal(total + e.price),
                    setMotherCards(false),
                    setCoolerCards(true),
                  ]}
                >
                  <Card img={e.images[0]} name={e.name} price={e.price} />
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
        {/* --------------------------------------------------------------------------- */}
        {/* ------------------------------------COOLERS---------------------------------*/}
        {coolerCards === true ? (
          <div className={style.cardsProducts}>
            {coolers.map((e: any, index: any) => {
              return (
                <div
                  key={index}
                  onClick={() => [
                    setComponentsImg({
                      procesador: procesadorImg,
                      motherboard: motherboardImg,
                      cooler: e.images[0],
                      ram: ramMemory,
                      gpu: gpuI,
                      disk: diskI,
                      power: powerI,
                      gabinete: gabinete,
                    }),
                    setCoolerImg(e.images[0]),
                    setComponentName({
                      procesador: procesadorName,
                      motherboard: motherboardName,
                      cooler: e.name,
                      ram: "",
                      gpu: "",
                      disk: "",
                      power: "",
                      gabinete: "",
                    }),
                    setCoolerName(e.name),
                    addToCartPC(e),
                    setTotal(total + e.price),
                    setCoolerCards(false),
                    setRamCards(true),
                  ]}
                >
                  <Card img={e.images[0]} name={e.name} price={e.price} />
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
        {/* ------------------------------------------------------------------------------------- */}
        {/* -----------------------------------RAM--------------------------------------------- */}
        {ramCards === true ? (
          <div className={style.cardsProducts}>
            {ram.map((e: any, index: any) => {
              return (
                <div
                  key={index}
                  onClick={() => [
                    setComponentsImg({
                      procesador: procesadorImg,
                      motherboard: motherboardImg,
                      cooler: coolerImg,
                      ram: e.images[0],
                      gpu: gpuI,
                      disk: diskI,
                      power: powerI,
                      gabinete: gabinete,
                    }),
                    setRamImg(e.images[0]),
                    setComponentName({
                      procesador: procesadorName,
                      motherboard: motherboardName,
                      cooler: coolerName,
                      ram: e.name,
                      gpu: "",
                      disk: "",
                      power: "",
                      gabinete: "",
                    }),
                    setRamName(e.name),
                    addToCartPC,
                    setTotal(total + e.price),
                    setRamCards(false),
                    setGpuCards(true),
                  ]}
                >
                  <Card img={e.images[0]} name={e.name} price={e.price} />
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
        {/* -----------------------------------------------------------------------------------------------*/}
        {/* -------------------------------------GPU-------------------------------------------- */}
        {gpuCards === true ? (
          <div className={style.cardsProducts}>
            {gpu.map((e: any, index: any) => {
              return (
                <div
                  key={index}
                  onClick={() => [
                    setComponentsImg({
                      procesador: procesadorImg,
                      motherboard: motherboardImg,
                      cooler: coolerImg,
                      ram: ramImg,
                      gpu: e.images[0],
                      disk: diskI,
                      power: powerI,
                      gabinete: gabinete,
                    }),
                    setGpuImg(e.images[0]),
                    setComponentName({
                      procesador: procesadorName,
                      motherboard: motherboardName,
                      cooler: coolerName,
                      ram: ramName,
                      gpu: e.name,
                      disk: "",
                      power: "",
                      gabinete: "",
                    }),
                    setGpuName(e.name),
                    addToCartPC(e),
                    setTotal(total + e.price),
                    setGpuCards(false),
                    setDiskCards(true),
                  ]}
                >
                  <Card img={e.images[0]} name={e.name} price={e.price} />
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
        {/* ------------------------------------------------------------------------------------------------- */}
        {/* ------------------------------------------DISK--------------------------------------------------- */}
        {diskCards === true ? (
          <div className={style.cardsProducts}>
            {disk.map((e: any, index: any) => {
              return (
                <div
                  key={index}
                  onClick={() => [
                    setComponentsImg({
                      procesador: procesadorImg,
                      motherboard: motherboardImg,
                      cooler: coolerImg,
                      ram: ramImg,
                      gpu: gpuImg,
                      disk: e.images[0],
                      power: powerI,
                      gabinete: gabinete,
                    }),
                    setDiskImg(e.images[0]),
                    setComponentName({
                      procesador: procesadorName,
                      motherboard: motherboardName,
                      cooler: coolerName,
                      ram: ramName,
                      gpu: gpuName,
                      disk: e.name,
                      power: "",
                      gabinete: "",
                    }),
                    setDiskName(e.name),
                    addToCartPC(e),
                    setTotal(total + e.price),
                    setDiskCards(false),
                    setPowerCards(true),
                  ]}
                >
                  <Card img={e.images[0]} name={e.name} price={e.price} />
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
        {/* ------------------------------------------------------------------------------------------------------ */}
        {/* ---------------------------------------------FUENTE------------------------------------------------------ */}
        {powerCards === true ? (
          <div className={style.cardsProducts}>
            {power.map((e: any, index: any) => {
              return (
                <div
                  key={index}
                  onClick={() => [
                    setComponentsImg({
                      procesador: procesadorImg,
                      motherboard: motherboardImg,
                      cooler: coolerImg,
                      ram: ramImg,
                      gpu: gpuImg,
                      disk: diskImg,
                      power: e.images[0],
                      gabinete: gabinete,
                    }),
                    setPowerImg(e.images[0]),
                    setComponentName({
                      procesador: procesadorName,
                      motherboard: motherboardName,
                      cooler: coolerName,
                      ram: ramName,
                      gpu: gpuName,
                      disk: diskName,
                      power: e.name,
                      gabinete: "",
                    }),
                    setPowerName(e.name),
                    addToCartPC(e),
                    setTotal(total + e.price),
                    setPowerCards(false),
                    setGabineteCards(true),
                  ]}
                >
                  <Card img={e.images[0]} name={e.name} price={e.price} />
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
        {/* ----------------------------------------------------------------------------- */}
        {/* --------------------------------------GABINETES------------------------------------------ */}
        {gabineteCards === true ? (
          <div className={style.cardsProducts}>
            {gabinetes.map((e: any, index: any) => {
              return (
                <div
                  key={index}
                  onClick={() => [
                    setComponentsImg({
                      procesador: procesadorImg,
                      motherboard: motherboardImg,
                      cooler: coolerImg,
                      ram: ramImg,
                      gpu: gpuImg,
                      disk: diskImg,
                      power: powerImg,
                      gabinete: e.images[0],
                    }),
                    setGabineteImg(e.images[0]),
                    setComponentName({
                      procesador: procesadorName,
                      motherboard: motherboardName,
                      cooler: coolerName,
                      ram: ramName,
                      gpu: gpuName,
                      disk: diskName,
                      power: powerName,
                      gabinete: e.name,
                    }),
                    setGabineteName(e.name),
                    addToCartPC(e),
                    setTotal(total + e.price),
                    setGabineteCards(false),
                  ]}
                >
                  <Card img={e.images[0]} name={e.name} price={e.price} />
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={style.footer}>
      <LightMode><Footer /></LightMode>
      </div>
    </div>
  );
}

export default ArmaPC;
