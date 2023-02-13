import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import style from "./Saludos.module.css"

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={'h3'} fontSize={'3xl'} textAlign={'center'} marginStart="5" marginBottom={"5"}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={"2xl"}>
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string;
  name: string;
  title: string;
}) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} /* alt={name} */ mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={900}>{name}</Text>
        <Text fontSize={"2xl"} color={useColorModeValue('gray.600', 'gray.400')}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function Saludos() {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.700')}>
      <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading>¡Clientes satisfechos nos recomiendan!</Heading>
          <Text>¡Más de 1000 influencers gamers compran nuestros productos en el mundo!</Text>
        </Stack>
        <Stack 
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 10, md: 4, lg: 50 }}>
          <Box className={style.dialogos1}>
            <TestimonialContent>
              <TestimonialHeading>Espectaculares productos</TestimonialHeading>
              <TestimonialText>
              Desde que dejé el futbol y me dedique a los eSports, AllTech me acompaño con sus productos, no los cambio por nada.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://fotos.perfil.com/2022/02/08/trim/720/410/sergio-aguero-me-pusieron-un-chip-en-el-corazon-1310152.jpg'
              }
              name={'Kun Aguero'}
              title={'Ex Futbolista'}
            />
          </Box>
          <Box className={style.dialogos2}>
            <TestimonialContent>
              <TestimonialHeading>Calidad asegurada</TestimonialHeading>
              <TestimonialText>
              Desde que compro en AllTech nunca volvi a comprar en otro lado, relacion precio-calidad es excelente.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://images.hola.com/imagenes/actualidad/20220317206496/ibai-llanos-enfermedad-perdida-vision/1-64-547/ibai-llanos-getty-t.jpg'
              }
              name={'Ibai Llanos'}
              title={'Influencer y comentarista de eSport'}
            />
          </Box>
          <Box className={style.dialogos3}>
            <TestimonialContent>
              <TestimonialHeading>Aumentó la productividad de la Tukineta</TestimonialHeading>
              <TestimonialText>
              Mis días en Soy Henry son mucho más productivos con las sillas gammer de ultima generación que compré en AllTech, gracias totales.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://ca.slack-edge.com/TPRS7H4PN-U03ET2WAQ5C-523e825c9d00-512'
              }
              name={'Jorge Vega'}
              title={'Programador y profesor del Bootcamp Soy Henry'}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}