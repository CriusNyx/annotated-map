import React from 'react';
import logo from './logo.svg';
import './App.css';
import Stack from './Stack';
import Landing from './Landing';

function App() {
  return (
    <html className="App">
      <Stack root={<Landing/>}/>
    </html>
    
  );
}

export default App;
