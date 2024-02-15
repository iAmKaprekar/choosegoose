import React, { useState } from "react";

import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";

const Authentication = () => {
  const [newAccount, setNewAccount] = useState(true);

  const switchPage = () => {
    setNewAccount(!newAccount);
  }

  const renderedPage = newAccount ? <Signup/> : <Login/>;

  return (
    <div id='authentication'>
      <h1>Authentication</h1>
      {renderedPage}
    </div>
  )
}

export default Authentication;