import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import '@/index.css'  
import App from '@/app/App.jsx'
import store from '@/app/store.js'
import React from 'react';

const originalUseState = React.useState;

React.useState = function (...args) {
  console.log("useState called with:", args);
  return originalUseState.apply(this, args);
};


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
