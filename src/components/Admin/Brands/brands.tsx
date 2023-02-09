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
  LightMode,
  Box,
  Input,
  Spinner, 
  Card,
  CardHeader,
  CardBody
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import interfaceBrand from  "../../../features/brands/interfaceBrand";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { putBrand } from '../../../app/actionsCreators'
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useTable, usePagination } from 'react-table'
import { useState } from "react";


export default function BrandsAdmin() {
  const brandsStore = useAppSelector((state) => state.brands)
  const dispatch = useAppDispatch();

  const setActive = (id:string, active:Boolean) => {
    dispatch(putBrand(id, {active: !active}))
  }

  const data:any = [];

  brandsStore.allBrands.map((brand:interfaceBrand) => {
    data.push({name: brand.name, active: brand, acciones: brand._id})
  });

  const [searchTerm, setSearchTerm] = useState("")
  const handleSearch = (e:any) => {
    setSearchTerm(e.target.value);
  };

  const columns = [
    {
      Header: "Nombre",
      accessor: "name",
    },
    {
      Header: "Activo",
      accessor: "active",
    },
    {
      Header: "Acciones",
      accessor: "acciones",
    },
  ];

  const filteredData = data.filter((d:any) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function Table2({ columns, data }:any) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    })
  
    // Render the UI for your table
    return (
      <Table {...getTableProps()} variant='simple' key={Math.random()}>
        <TableCaption>Listado de marcas</TableCaption>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()} key={Math.random()}>
                {row.cells.map(cell => {
                  if(cell.column.Header === "Acciones"){
                    return <Td key={Math.random()}><LightMode><Button colorScheme='blue'><Link to={`/Admin/brands/edit/${cell.value}`}><HiOutlinePencilAlt size={20}/></Link></Button></LightMode></Td>
                  } else if(cell.column.Header === "Activo"){
                    return <Td key={Math.random()}><Switch id='email-alerts' isChecked={cell.value.active ? true : false} onChange={() => setActive(cell.value._id, cell.value.active)} /></Td>
                  }else{
                    return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                  }
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    )
  }
  
  if(brandsStore.isLoading){
    return (
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    )
  }else if(brandsStore.errMess){
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
      icon: "error",
      title: "Oops...",
      text: "Hubo un error inesperado, por favor intentelo mas tarde."
    });
  }else{
    return (
      <Card>
        <CardHeader>
          <div className={style.header}>
          <Link to="./create" className={style.btnPrimary}>Nuevo</Link>
          </div>
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Buscar"
          />
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table2
              data={filteredData}
              columns={columns}
            />
          </TableContainer>
        </CardBody>
      </Card>
    );
  }
}