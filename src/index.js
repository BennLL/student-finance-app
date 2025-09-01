import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.js';
import { AuthProvider } from './context/AuthContext';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App></App>
    </AuthProvider>
  </React.StrictMode>
);
