import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';
import React,{useState,useEffect} from 'react';
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {server} from '../index';
import { ErrorComponent } from './Coins';
import Chart from './Chart';

const CoinDetails = () => {
  const [coin,setCoin] = useState({});
  const [loading,setLoading] = useState(true);
  const [errormsg,setError] = useState(false);
  const [currency,setCurrency] = useState("inr");
  const [days,setDays] = useState("24h");
  const [chartArray,setChartArray] = useState([]);

  const currencySymbol = (currency === "inr") ? "₹" : (currency === "usd") ? "$" : "€";

  const btns = ['24hr','7days','30days','60days','200days','365days','max'];

  const switchChartStats = (val) => {
    setDays(val);
    setLoading(true);
  }

  const params = useParams();

  useEffect(() => {
    // console.log('call');
    const fetchCoins = async ()=>{
      try{
          const {data} = await axios.get(`${server}/coins/${params.id}`);

          const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
          setChartArray(chartData.prices);
          setCoin(data);
          setLoading(false);
        }
      catch {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  },[currency,days]);
  if(errormsg)
  {
    return <ErrorComponent />
  }

  return (
    <Container maxW={'container.xl'}>
      {
        loading ? <Loader /> : <>
        <Box w={'full'} borderWidth={1}>
          <Chart arr={chartArray} currency={currencySymbol} days={days}/>
        </Box>
        <HStack p={4} overflowX={'auto'}>
          {
            btns.map((i)=>(
              <Button key={i} onClick={()=>switchChartStats(i)}>{i}</Button>
            ))
          }
        </HStack>          

          <RadioGroup value={currency} onChange={setCurrency} p={8}>
            <HStack spacing="4">
              <Radio value='inr'>inr</Radio>
              <Radio value='usd'>usd</Radio>
              <Radio value='eur'>eur</Radio>
            </HStack>
          </RadioGroup>
          <VStack spacing={4} p={16} alignItems={'flex-start'}>
            <Text fontSize={'small'} opacity={0.7} alignSelf={'center'}>
              Last updated on {Date(coin.market_data.last_updated)}
            </Text>
            <Image src={coin.image.large} w={16} h={16} objectFit={'contain'}></Image>
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
              <StatHelpText>
                <StatArrow type={coin.market_data.price_change_percentage_24h < 0 ? 'decrease' : 'increase'}/>
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge fontSize={'2xl'} bgColor={'blackAlpha.800'} color={'white'}>{`#${coin.market_cap_rank}`}</Badge>
            <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}/>
            <Box w={'full'} p='4'>
              <Item title='Max Supply' value={coin.market_data.max_supply} />
            </Box>
          </VStack>
        </>
      }
    </Container>
  )
}

const Item = ({title,value}) => (
  <HStack justifyContent={'space-between'} w={'full'} my={4}>
    <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
)

const CustomBar = ({high,low}) => (
  <VStack w={'full'}>
    <Progress value={50} colorScheme='teal' w={'full'}/>
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge colorScheme='red'>{low}</Badge>
      <Text fontSize={'sm'}>24 hr range</Text>
      <Badge colorScheme='green'>{high}</Badge>
    </HStack>

  </VStack>
)

export default CoinDetails