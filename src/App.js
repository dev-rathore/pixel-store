import React from "react";
import { Routes, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage/>} />
      <Route exact path="/shop" element={<ShopPage/>} />
      {/* <Route exact path="/hats" component={HatsPage} /> */}
    </Routes>
  );
}

export default App;
