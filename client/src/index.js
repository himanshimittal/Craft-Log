import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./components/context/ContextProvider";
const root = document.getElementById('root');

const rootElement = ReactDOM.createRoot(root);
rootElement.render(
  <ContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProvider>
);
