import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

ReactDOM.render(
  <React.StrictMode>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" >
          Remy's Quiz
        </Typography>
      </Toolbar>
    </AppBar>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
