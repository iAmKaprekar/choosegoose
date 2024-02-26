import React, { useState } from "react";

// import Login from "./Authentication/Login";
// import Signup from "./Authentication/Signup";

const Authentication = ({ login, setUser }) => {
  const [newAccount, setNewAccount] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const checkKey = (e) => {
    if (e.key === 'Enter') authRequest();
  }

  const handleError = async(response) => {
    const errorBody = await response.json();
    setError(errorBody.err);
  }

  const authRequest = async() => {
    const response = await fetch(
      `/api/auth/${newAccount ? 'signup' : 'login'}`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, password: password})
      }
    );
    if (!response.ok) handleError(response);
    else {
      const data = await response.json();
      login();
      setUser(data.username);
    }
  }

  const switchPage = () => {
    setNewAccount(!newAccount);
  }

  const errorBox = error ? <div id='error'>{error}</div> : <></>;

  return (
    <div>
      <img id='goose' src='https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/5/54/Choose_Goose.png/'></img>
      <div id='authentication'>
        <i>{errorBox}</i>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} onKeyDown={checkKey}></input>
        <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={checkKey} type="password"></input>
        <button id='authRequest' onClick={authRequest}>
          {newAccount ? 'Signup' : 'Login'}
        </button>
        <button id='switchPage' onClick={switchPage}>
          <i>{newAccount ? 'Already have an account?' : 'Need to make a new account?'}</i>
        </button>
      </div>
    </div>
  )
}

export default Authentication;