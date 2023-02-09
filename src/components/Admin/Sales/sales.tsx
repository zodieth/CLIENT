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
  Input,
  Spinner,
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ImEye, ImTruck } from "react-icons/im";
import { BiBarcodeReader } from "react-icons/bi";
import { AiFillPrinter } from "react-icons/ai";
import { putSale } from "../../../app/actionsCreators";
import Swal from "sweetalert2";
import { useTable, usePagination } from "react-table";
import { useState } from "react";
import Barcode from "react-barcode";

export default function SalesAdmin() {
  const salesStore = useAppSelector((state) => state.sales);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saleId, setSaleId] = useState("");
  const [showModalBarCode, setShowModalBarCode] = useState(false);
  const [selectedSale, setSelectedSale] = useState<any>({});

  const handleOpenBarCodeModal = (sale: any) => {
    setSelectedSale(sale);
    setShowModalBarCode(true);
  };

  const handleCloseBarCodeModal = () => {
    setShowModalBarCode(false);
  };

  const setActive = (id: string, active: Boolean) => {
    dispatch(putSale(id, { active: !active }));
  };

  const handleClickOpenModal = (id: string) => {
    setIsModalOpen(true);
    setSaleId(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSaleId("");
  };

  const data: any = [];

  salesStore.allSales.map((sale: any) => {
    data.push({
      name: sale._id,
      status: sale.status,
      count: sale.products.length,
      total: sale.total,
      active: sale,
      code: sale,
      send: sale,
      details: sale._id,
    });
  });

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const columns = [
    {
      Header: "Nro compra",
      accessor: "name",
    },
    {
      Header: "Estado",
      accessor: "status",
    },
    {
      Header: "cantidad de productos",
      accessor: "count",
    },
    {
      Header: "Total $",
      accessor: "total",
    },
    {
      Header: "Activo",
      accessor: "active",
    },
    {
      Header: "Codigo de Envio",
      accessor: "code",
    },
    {
      Header: "Enviar",
      accessor: "send",
    },
    {
      Header: "Ver detalles",
      accessor: "details",
    },
  ];

  const filteredData = data.filter(
    (d: any) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangeStatus = (id: string) => {
    const status = { status: "shipped" };
    dispatch(putSale(id, status));
  };

  function Table2({ columns, data }: any) {
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({
        columns,
        data,
      });

    // Render the UI for your table
    return (
      <Table {...getTableProps()} variant="simple" key={Math.random()}>
        <TableCaption>Listado de compras</TableCaption>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={Math.random()}>
                {row.cells.map((cell) => {
                  if (cell.column.Header === "Ver detalles") {
                    return (
                      <Td key={Math.random()}>
                        <LightMode>
                          <Button
                            colorScheme="blue"
                            onClick={() => handleClickOpenModal(cell.value)}
                          >
                            <ImEye size={20} />
                          </Button>
                        </LightMode>
                      </Td>
                    );
                  } else if (cell.column.Header === "Enviar") {
                    return (
                      <Td key={Math.random()}>
                        <LightMode>
                          <Button
                            isDisabled={cell.value.status === "shipped"}
                            colorScheme="blue"
                            onClick={() => handleChangeStatus(cell.value._id)}
                          >
                            <ImTruck size={20} />
                          </Button>
                        </LightMode>
                      </Td>
                    );
                  } else if (cell.column.Header === "Activo") {
                    return (
                      <Td key={Math.random()}>
                        <Switch
                          id="email-alerts"
                          isChecked={cell.value.active ? true : false}
                          onChange={() =>
                            setActive(cell.value._id, cell.value.active)
                          }
                        />
                      </Td>
                    );
                  } else if (cell.column.Header === "Estado") {
                    return (
                      <Td {...cell.getCellProps()}>
                        {cell.value === "ordered"
                          ? "Ordenado"
                          : cell.value === "shipped"
                          ? "Enviado"
                          : cell.value === "claim"
                          ? "Reclamado"
                          : cell.value === "closed"
                          ? "Cerrado"
                          : ""}
                      </Td>
                    );
                  } else if (cell.column.Header === "Codigo de Envio") {
                    return (
                      <Td {...cell.getCellProps()}>
                        <LightMode>
                          <Button
                            isDisabled={cell.value.status === "shipped"}
                            colorScheme="blue"
                            onClick={() => handleOpenBarCodeModal(cell.value)}
                          >
                            <BiBarcodeReader size={20} />
                          </Button>
                        </LightMode>
                      </Td>
                    );
                  } else {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
                  }
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    );
  }

  if (salesStore.isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  } else if (salesStore.errMess) {
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
      text: "Hubo un error inesperado, por favor intentelo mas tarde.",
    });
  } else {
    return (
      <Card>
        <Modal
          isOpen={showModalBarCode}
          onClose={handleCloseBarCodeModal}
          size={"xl"}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <h2>Código de barras de la venta</h2>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedSale._id ? (
                <>
                  <Barcode value={`${selectedSale._id}`} width={1} />
                  <p>
                    Nombre: {selectedSale.user.firstName}{" "}
                    {selectedSale.user.lastName}
                  </p>
                  <p>Teléfono: {selectedSale.user?.phoneNumber}</p>
                  <p>
                    Dirección: {selectedSale.user?.location?.address} -{" "}
                    {selectedSale.user?.location?.province} -{" "}
                    {selectedSale.user?.location?.city}
                  </p>
                  <Button
                    id="imprimir"
                    rightIcon={<AiFillPrinter />}
                    onClick={() => window.print()}
                  >
                    Imprimir
                  </Button>
                </>
              ) : (
                ""
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal isOpen={isModalOpen} size={"xl"} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Detalle de la compra #{saleId}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Nombre</Th>
                    <Th>Cantidad</Th>
                    <Th>Total (USD)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {salesStore.allSales.map((sale: any) =>
                    sale?._id === saleId
                      ? sale.products.map((product: any) => (
                          <Tr key={product.product._id}>
                            <Td>{product.product.name}</Td>
                            <Td>{product.quantity}</Td>
                            <Td>{product.product.price * product.quantity}</Td>
                          </Tr>
                        ))
                      : ""
                  )}
                </Tbody>
              </Table>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
        <CardHeader>
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Buscar"
          />
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table2 data={filteredData} columns={columns} />
          </TableContainer>
        </CardBody>
      </Card>
    );
  }
}
