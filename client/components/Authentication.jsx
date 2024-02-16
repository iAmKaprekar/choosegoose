import React, { useState } from "react";

// import Login from "./Authentication/Login";
// import Signup from "./Authentication/Signup";

const Authentication = ({ login }) => {
  const [newAccount, setNewAccount] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
    response.ok ? login() : handleError(response);
  }

  const switchPage = () => {
    setNewAccount(!newAccount);
  }

  const errorBox = error ? <div id='error'>{error}</div> : <></>;

  return (
    <div id='authentication'>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
      <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password"></input>
      <button id='authrequest' onClick={authRequest}>
        {newAccount ? 'Signup' : 'Login'}
      </button>
      <button id='switchpage' onClick={switchPage}>
        <i>{newAccount ? 'Already have an account?' : 'Need to make a new account?'}</i>
      </button>
      {errorBox}
    </div>
  )
}

export default Authentication;