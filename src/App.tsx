import React from 'react';
import logo from './logo.svg';
import './App.css';
import Stack from './Stack';
import Landing from './Landing';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Stack root={<Landing/>}/>
      </header>
    </div>
  );
}

export default App;
