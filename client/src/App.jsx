import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";


function App() {
  return (
    <BrowserRouter>
    <div className="App">   
     <Navbar></Navbar>
   </div>
    </BrowserRouter>
    
  );
}

export default App;