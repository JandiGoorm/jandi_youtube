import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // 전역 스타일링
import App from './App'; // 메인 컴포넌트

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
