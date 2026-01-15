import { Box, Image, Text } from '@chakra-ui/react';
import {motion} from 'framer-motion';
import React from 'react'

const Home = () => {
  return (
    <Box bgColor={'blackAlpha.900'} w={'full'} h={'85vh'}>
      <motion.div 
      style={{
        height: '80vh',
      }}
      animate={{
        translateY: "20px",
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse'
      }}
      >
        <Image w={'full'} h={'60vh'} objectFit={'contain'} src='https://www.freepnglogos.com/uploads/bitcoin-png/bitcoin-futures-options-trading-for-risk-management-cme-group-18.png' filter={'grayscale(1)'}/>
      </motion.div>

      <Text fontSize={'6xl'} textAlign={'center'} fontWeight={'thin'} color={'whiteAlpha.700'} mt={-20}>CRYPTOLL</Text>

    </Box>
  )
}

export default Home