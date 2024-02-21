import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import _style from '../assets/style.scss';

import Authentication from './components/Authentication';
import ListManager from './components/ListManager';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import Sorting from './components/Sorting';

const App = () => {
  const [page, setPage] = useState('loading');
  const [listId, setListId] = useState(null);
  const [user, setUser] = useState(null);

  const authenticate = async() => {
    const authResponse = await fetch('/api/auth');
    if (!authResponse.ok) {
      return setPage('authentication');
    }
    const data = await authResponse.json();
    setPage('listManager');
    setUser(data.username);
  }

  useEffect(() => {
    authenticate();
  }, [])

  let navbar = <></>;
  let renderedPage;
  switch (page) {
    case 'loading':
      renderedPage = <Loading/>;
      break;
    case 'authentication':
      renderedPage = <Authentication login={() => setPage('listManager')} setUser = {setUser}/>;
      break;
    case 'listManager':
      renderedPage = <ListManager listId={listId} setListId={setListId}/>
      navbar = <Navbar logout={() => setPage('authentication')} user={user}/>;
      break;
    case 'sorting':
      renderedPage = <Sorting listId={listId} setListId={setListId}/>;
      navbar = <Navbar logout={() => setPage('authentication')} user={user}/>;
      break;
  }

  return (
    <div id='app'>
      {navbar}
      {renderedPage}
    </div>
  );
}

const root = createRoot(document.querySelector('#root'));
root.render(<App/>);