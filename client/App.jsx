import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import _style from '../assets/style.scss';

import Authentication from './components/Authentication';
import ListManager from './components/ListManager';
import Loading from './components/Loading';
import Sorting from './components/Sorting';

const App = () => {
  const [page, setPage] = useState('loading');
  const [listId, setListId] = useState(null);

  const authenticate = async() => {
    const response = await fetch('/api/auth');
    setPage(response.ok ? 'listManager' : 'authentication')
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
      renderedPage = <Authentication login={() => setPage('listManager')}/>;
      break;
    case 'listManager':
      renderedPage = <ListManager listId={listId} setListId={setListId}/>;
      break;
    case 'sorting':
      renderedPage = <Sorting listId={listId} setListId={setListId}/>;
      break;
  }

  return (
    <div id='app'>
      {renderedPage}
    </div>
  );
}

const root = createRoot(document.querySelector('#root'));
root.render(<App/>);