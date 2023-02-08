import style from "./products.module.css"
import {
  Table,
  Thead,
  Tbody,
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
import interfaceCategory from  "../../../features/categories/interfaceCategory";
import { HiTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { deleteCateogry, putCateogry } from '../../../app/actionsCreators'
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTable } from "react-table";

export default function CategoriesAdmin() {
  const categoriesStore = useAppSelector((state) => state.categories)
  const dispatch = useAppDispatch();
  
  const setActive = (id:string, active:Boolean) => {
    dispatch(putCateogry(id, {active: !active}))
  }

  const data:any = [];

  categoriesStore.allCategories.map((category:interfaceCategory) => {
    data.push({name: category.name, description: category.description, father: category.father?.name,  active: category, acciones: category._id})
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
      Header: "Descripcion",
      accessor: "description",
    },
    {
      Header: "Categoría Padre",
      accessor: "father",
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
      <Table {...getTableProps()} variant='simple'>
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
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  if(cell.column.Header === "Acciones"){
                    return <Td><LightMode><Button colorScheme='blue'><Link to={`/Admin/categories/edit/${cell.value}`}><HiOutlinePencilAlt size={20}/></Link></Button></LightMode></Td>
                  } else if(cell.column.Header === "Activo"){
                    return <Td><Switch id='email-alerts' isChecked={cell.value.active ? true : false} onChange={() => setActive(cell.value._id, cell.value.active)} /></Td>
                  } else if(cell.column.Header === "Descripcion"){
                    return <Td {...cell.getCellProps()}>{cell.value.substring(0,50)+"..."}</Td>
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

  if(categoriesStore.isLoading){
    return (
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    )
  }else if(categoriesStore.errMess){
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
          <Box className={style.header}>
            <Link to="./create" className={style.btnPrimary}>Nuevo</Link>
          </Box>
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