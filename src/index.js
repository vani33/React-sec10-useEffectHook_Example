import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { AuthContextProvider } from './store/auth-context';

// ReactDOM.render(<App />, document.getElementById('root'));

//code when AuthContextProvider code is moved from App component to auth-context.js filed
ReactDOM.render(<AuthContextProvider><App /></AuthContextProvider>, document.getElementById('root'));
