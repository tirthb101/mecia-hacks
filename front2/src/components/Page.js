import React from "react";
import axios from 'axios';
import {
    Container,
    Flex,
    VStack,
    Heading,
    Text,
    SimpleGrid,
    GridItem,
    FormControl,
    FormLabel,
    Input, 
    Select,
    Button,
    useColorMode,
    useColorModeValue,
    useBreakpointValue,
    Image,
    Box
} from '@chakra-ui/react';

import { SunIcon } from "@chakra-ui/icons";
import { useState } from "react";
var base_url = "http://127.0.0.1:4100/";
var tempbool = false;

function Page () {
    const { toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue('gray.200', 'whiteAlpha.50');
    const colSpan = useBreakpointValue({base: 2, md: 1});
    const [state, setState] = useState("");
    const [mode, setMode] = useState("");

function handleData(event){
    setState(event.target.value);
    console.log(state);
}
function handleMode  (event) {
    setMode(event.target.value);
    console.log(mode);
}

async function sendData(){
   const bodyFormData = new FormData();
            bodyFormData.append('mode', mode);
            bodyFormData.append('data', state);
            const data = await axios({method:'post',url:`${base_url}`, data: bodyFormData})
            console.log(data);
}
if (mode === 'm'){
    tempbool = false;
}
else {
    tempbool = true;
}
    return (
        <Container maxWidth='container.xl' padding={0}>
            <Flex height={{'base': 'auto', 'md':'100vh'}} paddingY={{'base': 0, 'md': 10}} direction={{'base':'column-reverse', 'md':'row'}}>
                <VStack
                spacing={10}
                padding={10}
                w='full'
                h='full'
                alignItems='flex-start'>
                    <VStack spacing={2} alignItems='flex-start'>
                        <Heading size='2xl'>ROBOTIC ARM</Heading>
                        <Text>Click here if you want to change theme.</Text>
                        <Button onClick={toggleColorMode}><SunIcon /></Button>
                    </VStack>
                <SimpleGrid columns={2} columnGap={3} rowGap={6}>
                    <GridItem colSpan={colSpan}>
                        <FormControl>
                            <FormLabel>Mode</FormLabel>
                                <Select onChange={handleMode}>
                                    <option value='d'>Deep learning</option>
                                    <option value='m'>Manual</option>
                                </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={colSpan}>
                        <FormControl>
                            <FormLabel>Data</FormLabel>
                                <Input placeholder="Data" onChange={handleData} disabled={tempbool} />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={colSpan}>
                         <Button colorScheme='teal' variant='outline' onClick={sendData}>
                            Submit
                        </Button>
                    </GridItem>
                    
                    
                </SimpleGrid>
                
                </VStack>
                <VStack>
                   <Box boxSize='2xl'>
                        <Image boxSize='550px'
    objectFit='cover' src='ro_without_back.PNG' alt='Dan Abramov' />
                    </Box>
                </VStack>
                
            </Flex>
        </Container>
    )
}
export default Page;