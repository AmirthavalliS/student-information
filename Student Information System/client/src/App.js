//import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import React from 'react'
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from "./pages/Home";
import Addedit from "./pages/AddEdit";

function App() {
  return (
<BrowserRouter>
<div className="APP">
  <ToastContainer position="top-center" />
  <Routes>
    <Route exact path="/" Component={Home} />
    <Route exact path="/addEdit" Component={Addedit} />
    <Route exact path="/update/:id" Component={Addedit} />

  </Routes>
</div>
</BrowserRouter>
  );
}

export default App;
