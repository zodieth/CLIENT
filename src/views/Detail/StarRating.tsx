import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useState } from "react";
import { saveReview } from "../../app/actionsCreators";
import { useAppDispatch } from "../../app/hooks";
import style from "./style.module.css";


const Star = ({ selected, onClick }: any) => (
  <div className={style.star } onClick={onClick}>
    {selected ? (
      <span className={style.starSelected}>★</span>
    ) : (
      <span className={style.starNotSelected}>☆</span>
    )}
  </div>
);

const StarRating = (product: any) => {
  const [rating, setRating] = useState<any>(0);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  
  const handleClickOpenModal = (id: string) => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveReview = () => {
    dispatch(saveReview(description, product.product, rating));
    setDescription("");
    setIsModalOpen(false);
  };

  const handleChange = (e: any) => {
    setDescription(e.target.value)
  }

  return (
    <div className={style.starRatingContainer}>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ingrese un detalle de su review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="answer">Respuesta</FormLabel>
              <Input id="answer" type="text" onChange={handleChange}/>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button color="blue" mr={3} onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="ghost" onClick={handleSaveReview}>Enviar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div>
        {[...Array(5)].map((star, i) => (
          <Star
            key={i}
            selected={i < rating}
            onClick={() => {setRating(i + 1); handleClickOpenModal("a")}}
          />
        ))}
      </div>
      <p>{rating} de 5 estrellas</p>
    </div>
  );
};

export default StarRating;