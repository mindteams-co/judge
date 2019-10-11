import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const alertOptions = {
    position: 'top right',
    timeout: 3000,
};

ReactDOM.render(
    <AlertProvider template={AlertTemplate} {...alertOptions}>
        <App />
    </AlertProvider>,
    document.getElementById('root'),
);
