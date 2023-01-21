import { Card, Text } from "@chakra-ui/react";
import React from "react";
import { CardInterface } from "../../models/CardsInterfaces";



export const CardComponent: React.FC<CardInterface> = ({
  name,
  price,
  category,
  description
}) => {

  return(
    <>
      <Card>
        <Text>{name}</Text>
        <Text>{price}</Text>
        <Text>{category}</Text>
        <Text>{description}</Text>
      </Card>
    </>
  )
}