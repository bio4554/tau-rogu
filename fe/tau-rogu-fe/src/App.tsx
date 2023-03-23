import React from 'react';
import logo from './logo.svg';
import { Card, CardBody, ChakraProvider, Input, Text } from '@chakra-ui/react';
import './App.css';

function App() {
  return (
    <ChakraProvider>
      <div>
        <Card>
          <CardBody>
            <Text>Hello</Text>
            <Input placeholder='Basic usage' />
          </CardBody>
        </Card>
        
      </div>
    </ChakraProvider>
  );
}

export default App;
