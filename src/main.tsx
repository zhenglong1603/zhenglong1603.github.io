import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './report-web-vitals';
import AppRoot from './app-root';
import './index.css';
import { I18nProvider } from './locale';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <AppRoot />
    </I18nProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// To log results (for example: reportWebVitals((metric) => console.warn(metric)))
// Or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
