import { Box, Button, Flex, Heading, List, ListItem, Stack } from '@chakra-ui/react'
import { useState } from 'react';
import { useEffect, useRef } from 'react'

export default function Timer() {
const[time,setTime]=useState(0);
const [laps, setLaps]=useState([]);
const [isRunning, setIsRunning]=useState(false);
const timeRef=useRef(null);


const StartTimer=()=>{
    timeRef.current=setInterval(()=>{
        setTime((prev)=>{
            if(prev>=0){
                return prev+1;
            }
        });
    },1000)
}

const pauseTimer=()=>{
    clearInterval(timeRef.current);
}

const resetTimer=()=>{
    clearInterval(timeRef.current);
    setTime(0);
}
const StopTimer=()=>{
    clearInterval(timeRef.current);
    setTime(0);
}

useEffect(()=>{
    if(time===60*60){
        clearInterval(timeRef.current);
    }
    if(time===60){
        alert("1 minute has been passed");
    }
},[time]);

const formatTime=(time) => {
    const seconds=time % 60;
    const totalMinutes=Math.floor(time/60);
    const minutes = totalMinutes%60;
    const hours = Math.floor(totalMinutes/60);
  
    const pad=(num)=>(num<10?'0':'')+num;
  
    return`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  
  const recordLap = () => {
    setLaps([...laps, formatTime(time)]);
  };
  return (
    <Stack
    margin="auto"
    borderRadius={10}
    spacing={3}
    padding={10}
    bg="blueviolet"
    height="auto"
    width="100%"
    maxWidth="400px"
    textAlign="center"
    fontSize="30px"
  >
    <Heading border="1px solid black" color="white" padding={4}>
      {formatTime(time)}
    </Heading>
    <Flex gap={5} justifyContent="center" marginTop={10}>
      <Button onClick={StartTimer} isDisabled={isRunning}>Start</Button>
      <Button onClick={pauseTimer} isDisabled={!isRunning}>Pause</Button>
      <Button onClick={StopTimer}>Stop</Button>
      <Button onClick={resetTimer}>Reset</Button>
      <Button onClick={recordLap} isDisabled={!isRunning}>Lap</Button>
    </Flex>
    <List spacing={3} marginTop={5}>
      {laps.map((lap, index) => (
        <ListItem key={index} color="white">
          Lap {index + 1}: {lap}
        </ListItem>
      ))}
    </List>
  </Stack>
  )
}
