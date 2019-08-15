import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export const init = () => {
  const node = document.getElementById('app');
  ReactDOM.render(<App />, node);
};
