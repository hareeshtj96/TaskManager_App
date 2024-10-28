import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import {store, persistor} from "./Redux/Store.js"
import {PersistGate} from 'redux-persist/integration/react';
import './index.css' 
import App from './App.jsx'

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
  </Provider>
  </StrictMode>
  
)
