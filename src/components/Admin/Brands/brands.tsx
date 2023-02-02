import style from "./brand.module.css"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button, 
  Switch,
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import interfaceBrand from  "../../../features/brands/interfaceBrand";
import { HiTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { deleteBrandApi, putBrand } from '../../../app/actionsCreators'
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function BrandsAdmin() {
  const brandsStore = useAppSelector((state) => state.brands)
  const dispatch = useAppDispatch();

  const deleteBrand = (id:string) => {
    try{
      dispatch(deleteBrandApi(id))
      
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
        title: "Eliminado Correctamente",
      });
    }catch(error){
      
    }
  }
  
  const setActive = (id:string, active:Boolean) => {
    dispatch(putBrand(id, {active: !active}))
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Link to="./create" className={style.btnPrimary}>Nuevo</Link>
      </div>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Listado de marcas</TableCaption>
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Activo</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            { brandsStore.allBrands.map((brand:interfaceBrand) => {
              return( 
                <>
                  <Tr key={brand.name}>
                    <Td>{brand.name}</Td>
                    <Td><Switch id='email-alerts' isChecked={brand.active ? true : false} onChange={() => setActive(brand._id, brand.active)} /></Td>
                    <Td style={{ display: "flex" }}>
                      <Button onClick={() => deleteBrand(brand._id)}>
                        <HiTrash size={20}/>
                      </Button>
                      <Button>
                        <Link to={`/Admin/brands/edit/${brand._id}`}>
                          <HiOutlinePencilAlt size={20}/>
                        </Link>
                      </Button>
                    </Td>
                  </Tr>
                </>)
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Nombre</Th>
              <Th>Activo</Th>
              <Th>Acciones</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
}