import 'bootstrap/dist/css/bootstrap.css';
import 'foundation-sites/dist/css/foundation.css'
import 'foundation-sites/dist/js/foundation.js'
import './css/Style.css'
import 'react-notifications/lib/notifications.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>,
  rootElement);

registerServiceWorker();
