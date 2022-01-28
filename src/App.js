import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home';

import 'normalize.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
}

export default App;
