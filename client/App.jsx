import React, {useState, useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import _style from '../assets/style.css';

const App = () => {
  return <h1>Test</h1>
}

const root = createRoot(document.querySelector('#root'));
root.render(<App/>);