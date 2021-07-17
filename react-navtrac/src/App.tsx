import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [res, setRes] = useState<any>({ lines: [] });
  console.log("Res:   ", res);

  const fetchData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    axios.get("/records").then((res) => {
      console.log(res.data);
      setRes(res.data);
    });
  };

  // useEffect(() => {
  //   axios.get("/records").then((res) => {
  //     console.log(res.data);
  //     setRes(res.data);
  //   });
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {res.lines.length &&
          res.lines.map((item: any) => <p key={uuidv4()}>{item}</p>)}
        <button onClick={fetchData}>Fetch Data</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
