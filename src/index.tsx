import React from 'react';
import ReactDOM from 'react-dom/client';
import StatusDependentPanel from './login/StatusDependentPanel';
import {BrowserRouter} from 'react-router-dom';
import LoginProvider from "./login/LoginContext";

import "./style/App.css";
import "./style/theme.css";
import "./style/font/_font.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider >
        <StatusDependentPanel />
      </LoginProvider >
    </BrowserRouter>
  </React.StrictMode>
);

