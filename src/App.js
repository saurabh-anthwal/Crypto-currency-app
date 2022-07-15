import React from "react";
import "./App.css";
import Home from "./pages/Home";
import CoinPage from "./pages/CoinPage";
import Navbar from "./component/Navbar";

import { BrowserRouter, Route, Routes } from "react-router-dom";


export default function App() {

  return (

    <BrowserRouter>
    <div className="app">
    <Navbar/>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/coins/:id" element={<CoinPage/>} />
    </Routes>
    </div>
    </BrowserRouter>
  );
}
