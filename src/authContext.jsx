import React, { useReducer } from 'react';

import MkdSDK from './utils/MkdSDK';

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      //TODO
      localStorage.setItem('role', action.payload.role);
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };

    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem('role');

  if (errorMessage === 'UNAUTHORIZED') {
    dispatch({
      type: 'Logout',
    });

    window.location.href = '/' + role + '/login';
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isAuthenticated, expire_at, role } = state;

  React.useEffect(() => {
    //TODO
    if (state.isAuthenticated) {
      const response = sdk.check(role, `/v2/api/lambda/check`);
      const { message, error } = response;

      if (error) {
        tokenExpireError(dispatch, message);
        return;
      }
    }
  }, [state]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
