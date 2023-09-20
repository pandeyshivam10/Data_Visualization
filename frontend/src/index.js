import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavBar from './components/NavBar';
import MyContextProvider from './MyContextProvider'; 

ReactDOM.render(
  <React.StrictMode>
    <MyContextProvider>
      <NavBar />
      <App />
    </MyContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
