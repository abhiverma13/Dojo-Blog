import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, handleSignOut }) => {
  return (
    <nav className="navbar">
      <h1>The Verma Blogs</h1>
      <div className="links">
        <Link to="/">Home</Link>
        {user ? (
          <Link to="/create">New Blog</Link>
        ) : (
          <Link to="/signin">New Blog</Link>
        )}
        {user ? (
          <button onClick={handleSignOut}>Sign Out</button>
        ) : (
          <Link id="sign-in-link" to="/signin">Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
