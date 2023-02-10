import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue,
    
  } from '@chakra-ui/react';
  import style from "./armado.module.css";
  import { Link } from "react-router-dom";
  
  export default function ArmaPCHome() {
    return (
      <Flex
        w={2500}
        h={'100vh'}
        backgroundImage={
          'url(https://i0.wp.com/gamersroom.com.mx/wp-content/uploads/2020/09/hyperx-alloy-elite-2-news-1.jpg?fit=1100%2C661&ssl=1)'
        }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}>
          
        <VStack
          /* w={'full'} */
          className={style.totalpc}
          justify={'center'}
          /* px={useBreakpointValue({ base: 4, md: 8 })} */
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>

          <Stack maxW={'2xl'} /* align={'flex-start'} */ spacing={6} >
                                      <Text
                                        className={style.gammer}
                                        color={'white'}
                                        fontWeight={700}
                                        lineHeight={1.2}
                                        fontSize={80}
                                        
                                        /* fontSize={useBreakpointValue({ base: '3xl', md: '4x1' })} */ > 
                                        Arma tu PC GAMMER

                                      </Text>
                                      <Text 
                                      className={style.gammer}
                                      color={'white'}
                                        fontWeight={700}
                                        fontSize={40}
                                        lineHeight={1.2}
                                        /* fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })} */>
                                          Tu estilo, tu impronta, tu juego.
                                          </Text>
            <Stack direction={'row'}>

            <Link to="/armatupc">
                              <Button
                                      className={style.botonArmado}
                                      bg={'blue.700'}
                                      rounded={'full'}
                                      color={'white'}
                                      size="lg"
                                      padding="1.5rem"
                                      fontSize="2rem"
                                      _hover={{ bg: 'blue.500' }}
                                    >
                                      ARMAR
                              </Button>
                        </Link>

                        
            </Stack>
          </Stack>
        </VStack>
      </Flex>
    );
  }