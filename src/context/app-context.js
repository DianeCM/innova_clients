import React, { createContext, useContext, useReducer } from 'react';

const GlobalContext = createContext();

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      localStorage.setItem('token', action.payload || '');
      return { ...state, token: action.payload };
    case 'SET_USERID':
      localStorage.setItem('userId', action.payload || '');
      return { ...state, userId: action.payload };
    case 'SET_ISLOGGED':
      localStorage.setItem('isLogged', action.payload ? 'true' : 'false');
      return { ...state, isLogged: action.payload };
    case 'SET_USERNAME':
      localStorage.setItem('username', action.payload || '');
      return { ...state, username: action.payload };
    case 'SET_REMEMBER':
      localStorage.setItem('remember', action.payload ? 'true' : 'false');
      return { ...state, remember: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, {
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
    isLogged: localStorage.getItem('isLogged') === 'true',
    username: localStorage.getItem('username') || null,
    remember: localStorage.getItem('remember') === 'true'
  });

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};