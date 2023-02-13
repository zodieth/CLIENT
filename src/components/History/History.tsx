import React from 'react';
import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
  Button,
} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import style from "./History.module.css"

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps['marginTop'];
}

const BlogTags: React.FC<IBlogTags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

interface BlogAuthorProps {
  date: Date;
  name: string;
}

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const History = () => {
  return (
    <Container maxW={'7xl'} p="12">
      <Heading marginTop={"10"} marginBottom={"10"} as="h1">Productos relevantes:</Heading>
      <Box className={style.div1}
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between">
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center">
          <Box
            width={{ base: '100%', sm: '85%' }}
            zIndex="2"
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%">
                
            <Link to="/productos/Headset" /* textDecoration="none" _hover={{ textDecoration: 'none' }} */ >
              <Image 
                borderRadius="lg"
                src={
                  'https://media.istockphoto.com/id/1218726669/es/foto/el-joven-jugador-jugando-videojuego-en-l%C3%ADnea-en-su-ordenador-personal.jpg?s=612x612&w=0&k=20&c=z5fShlqtL08tov8y6mO8U8_uqjgz7CJ5nHajfVXEeKg='
                }
                alt="some good alt text"
                objectFit="contain"
              />
            </Link>
        
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                'radial(orange.600 1px, transparent 1px)',
                'radial(orange.300 1px, transparent 1px)'
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0' }}>
          <BlogTags tags={['Juegos', 'Auricular']} />
          <Heading marginTop="1">
            <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
              Implementá sonido de calidad en tus partidas
            </Text>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg">
            Entendemos que escuchar mal los sonidos de tu partida no es una opción,
            por eso te dejamos este auricular gamer de alta gama para que priorices ese sentido.
          </Text>

          
        </Box>
      </Box>
      <Box className={style.div2}
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between">
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center">
          <Box
            width={{ base: '100%', sm: '85%' }}
            zIndex="2"
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%">
                
            <Link to="/productos/Silla%20de%20escritorio" /* textDecoration="none" _hover={{ textDecoration: 'none' }} */ >
              <Image 
                borderRadius="lg"
                src={
                  'https://worldcomputers.com.ec/wp-content/uploads/2021/01/silla-Gamer-1.jpg'
                }
                alt="some good alt text"
                objectFit="contain"
              />
            </Link>
        
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                'radial(orange.600 1px, transparent 1px)',
                'radial(orange.300 1px, transparent 1px)'
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0' }}>
          <BlogTags  tags={['Salud', 'Silla gamer']} />
          <Heading marginTop="1">
            <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
              Dale prioridad a tu salud con una silla ergonómica
            </Text>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg">
            Tu salud depende muchas veces de tu postura, con nuestras sillas ergonómicas vas a 
            olvidarte de esos dolores que te afligen.
          </Text>

          
        </Box>
      </Box>
      <Heading as="h2" marginTop="10">
        
      </Heading>
      <Divider marginTop="550" color={useColorModeValue('black', 'gray.200')}/>
      
    </Container>
  );
};

export default History;