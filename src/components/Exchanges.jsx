import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { server } from '..';
import { Container, HStack } from '@chakra-ui/react';
import Loader from './Loader';
import ExchangeCard from './ExchangeCard';

const Exchanges = () => {
  const [loading,setLoading] = useState(true);
  const [errormsg,setError] = useState(false);

  const [exchange,setExchange] = useState([]);
  useEffect(() => {
    const fetchExchanges = async ()=>{
      try{
          const {data} = await axios.get(`${server}/exchanges`);

          setExchange(data);
          setLoading(false);
        }
      catch {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  },[]);

  if(errormsg)
  {
    return <ErrorComponent />
  }

  return (
    <Container maxW={'container.xl'}>
      {loading ? <Loader /> :
        <>
          <HStack wrap={'wrap'}>
            {exchange.map((coin)=>(
              <ExchangeCard name={coin.name} url={coin.url} rank={coin.rank} image={coin.image} key={coin.id}/>
            ))}
          </HStack>
        </>
      }
    </Container>
  )
}


const ErrorComponent = () => {
  return (<div style={{color:'red'}}>Something went wrong</div>)
}

export default Exchanges;