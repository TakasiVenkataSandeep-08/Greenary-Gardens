import React from 'react'
import {Route,Redirect} from 'react-router-dom'
export default function ProtectedRoute({ component: Component, appProps,functionCall, ...rest }) { 
  return (
      <Route
        {...rest}
        render={props =>
          appProps.authFinder
            ? <Component {...props} {...appProps} functionCall={functionCall} />
            : <Redirect
                to={appProps.to}
              />}
      />
    );
  }