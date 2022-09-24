import React from "react";
import { ChakraProvider } from '@chakra-ui/react';
import Page from './components/Page';
import theme from "./themes/theme";
import './themes/style.css';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Page />
    </ChakraProvider>
  );
}

export default App;