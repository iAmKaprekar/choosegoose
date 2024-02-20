import React from "react";

const Navbar = ({ logout, user }) => {

  const logoutRequest = async() => {
    const response = await fetch('/api/auth/logout');
    response.ok ? logout() : console.log('Unknown error in logout!');
  }

  return (
    <div id='navbar'>
      <h1><i>{`Hello, ${user}!`}</i></h1>
      <button onClick={logoutRequest}>Logout</button>
    </div>
  )
}

export default Navbar;