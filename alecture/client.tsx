import React from 'react';
import { render } from 'react-dom';
import Index from './layouts/App';
import { BrowserRouter } from 'react-router-dom';

render(
  <BrowserRouter>
    <Index />
  </BrowserRouter>,
  document.querySelector('#app'),
);
