import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { server } from '../index';
import { Container, HStack } from '@chakra-ui/react';
import Loader from './Loader';
import CoinCard from './CoinCard';

const Coins = () => {
  const [loading,setLoading] = useState(true);
  const [errormsg,setError] = useState(false);
  const [page,setPage] = useState(1);
  const [coins,setCoins] = useState([]);
  const [currency,setCurrency] = useState("inr");
  const [currencySym,setCurrencySym] = useState("₹");

  useEffect(() => {
    const fetchCoins = async ()=>{
      try{
          const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);

          setCoins(data);
          setLoading(false);
        }
      catch {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  },[currency,page]);

  if(errormsg)
  {
    return <ErrorComponent />
  }

  return (
    <Container maxW={'container.xl'}>
      {loading ? <Loader /> :
        <>
          <HStack wrap={'wrap'}>
            {coins.map((coin)=>(
              <CoinCard id={coin.id} name={coin.name} price={coin.current_price} symbol={coin.symbol} img={coin.image} key={coin.id} currencySymbol={currencySym}/>
            ))}
          </HStack>
        </>
      }
    </Container>
  )
}


export const ErrorComponent = () => {
  return (<div style={{color:'red'}}>Something went wrong in fetching.</div>)
}

export default Coins