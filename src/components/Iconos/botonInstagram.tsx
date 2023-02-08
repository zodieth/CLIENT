import { Avatar, Box, Flex, keyframes } from '@chakra-ui/react';

export default function BotonInstagram() {
  const size = '96px';
  const color = 'teal';

  const pulseRing = keyframes`
	0% {
    transform: scale(0.33);
  }
  40%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
	`;

  return (
    <Flex
      justifyContent="center"

      overflow="hidden">
      {/* Ideally, only the box should be used. The <Flex /> is used to style the preview. */}
      <Box
        as="div"
        position="relative"
        w={10}
        h={10}
        _before={{
          content: "''",
          position: 'relative',
          display: 'block',
          boxSizing: 'border-box',
          borderRadius: '50%',
          bgColor: color,
          animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
        }}>
        <Avatar
          src="https://images.vexels.com/media/users/3/137380/isolated/preview/1b2ca367caa7eff8b45c09ec09b44c16-logotipo-de-icono-de-instagram.png"
          size="full"
          position="absolute"
          top={0}
          onClick={() => window.location.href = 'https://instagram.com/alltechgamming?igshid=ZDdkNTZiNTM='}
        />
      </Box>
    </Flex>
  );
}