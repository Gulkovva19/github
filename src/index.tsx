import React from 'react';
import ReactDOM from 'react-dom/client';
import './common.css';
import { App } from './components/App/App';
import { HashRouter } from 'react-router-dom';

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container as HTMLElement);

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);

// todo:
// 1) количество репозиториев на главной странице 
// 2) названия организаций на главной странице 
// 3) функция склонения
// 4) отображение текущего юзера