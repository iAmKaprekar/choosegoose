import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import _style from '../assets/style.css';

import Authentication from './components/Authentication';
import ListManager from './components/ListManager';
import Loading from './components/Loading';
import Sorting from './components/Sorting';

const App = () => {
  const [page, setPage] = useState('loading');

  const authenticate = async() => {
    const response = await fetch('/api/auth');
    const body = await response.json();
    setPage(body.err ? 'authentication' : 'listManager')
  }

  useEffect(() => {
    authenticate();
  }, [])

  let renderedPage;
  switch (page) {
    case 'loading':
      renderedPage = <Loading/>;
      break;
    case 'authentication':
      renderedPage = <Authentication/>;
      break;
    case 'listManager':
      renderedPage = <ListManager/>;
      break;
    case 'sorting':
      renderedPage = <Sorting/>;
      break;
  }

  return (
    <div id='app'>
      <h1>App</h1>
      {renderedPage}
    </div>
  );
}

const root = createRoot(document.querySelector('#root'));
root.render(<App/>);