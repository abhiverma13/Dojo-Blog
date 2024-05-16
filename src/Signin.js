import { withAuthenticator } from "@aws-amplify/ui-react";
import Home from './Home';
import React, { useEffect } from 'react';

const Signin = ({ checkUser }) => {
    useEffect(() => {
      checkUser(); // Check user authentication status when component mounts
    }, [checkUser]);
    return (
        <Home />
    );
  };
 
export default withAuthenticator(Signin)