import React from 'react';
import ReactDOM from 'react-dom/client';
import StatusDependentPanel from './login/StatusDependentPanel';
import {BrowserRouter} from 'react-router-dom';
import LoginProvider from "./login/LoginContext";
import SocketProvider from './login/SocketContext';
import SettingsProvider from './context/SettingsContext';

import "./style/App.css";
import "./style/theme.css";
import "./style/font/_font.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
      <SocketProvider>
        <SettingsProvider>
        <LoginProvider >
          <StatusDependentPanel />
        </LoginProvider >
        </SettingsProvider>
      </SocketProvider>
    </BrowserRouter>
);

