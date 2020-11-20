import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Stack from "./Stack";
import Login from "./Login";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Stack root={<Login />} />
      </header>
    </div>
  );
}

export default App;
