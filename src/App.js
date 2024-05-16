//npx json-server --watch data/db.json --port 8000
//npm start

import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails';
import Signin from './Signin';
import NotFound from './NotFound';
import React, { useState, useEffect } from 'react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser(); // Check user authentication status when component mounts
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      return window.location.assign('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} handleSignOut={handleSignOut}/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create user = {user} checkUser={checkUser} />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            <Route path="/signin">
              <Signin checkUser={checkUser}/>
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
