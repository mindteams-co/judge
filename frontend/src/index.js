import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import { GlobalStyle } from './styles/globalStyle';
import { Routes } from './routes';

ReactDOM.render(
    <>
        <GlobalStyle />
        <Routes />
    </>,
    document.getElementById('root'),
);
