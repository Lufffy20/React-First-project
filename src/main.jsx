/**
 * Application Entry Point (main.jsx)
 *
 * Purpose:
 * Bootstraps the React application and sets up global providers.
 *
 * Technologies Used:
 * - React 18 (createRoot API)
 * - Redux Toolkit
 * - Redux Persist
 * - Ant Design (ConfigProvider + App)
 * - React Router (via AppRoutes)
 *
 * Providers Setup:
 * 1. Redux Provider
 *    - Makes Redux store available across the application.
 *
 * 2. Redux Persist (PersistGate)
 *    - Persists Redux state in localStorage/sessionStorage.
 *    - Prevents UI rendering until persisted state is rehydrated.
 *
 * 3. Ant Design ConfigProvider
 *    - Applies global UI theme configuration.
 *
 * 4. Ant Design App Wrapper
 *    - Enables global message, notification, and modal APIs.
 *
 * Application Flow:
 * Browser loads app
 *        ↓
 * ReactDOM.createRoot mounts React app
 *        ↓
 * Redux Provider supplies global state
 *        ↓
 * PersistGate restores saved Redux state
 *        ↓
 * Ant Design theme configuration applied
 *        ↓
 * AppRoutes handles routing
 *        ↓
 * Pages → Components → Hooks → API
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from "./routes/AppRoutes";
import './index.css'

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import { ConfigProvider, App } from 'antd';
import { antdThemeConfig } from './themeConfig';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading Redux...</div>} persistor={persistor}>
        <ConfigProvider theme={antdThemeConfig}>
          <App>
            <AppRoutes />
          </App>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)