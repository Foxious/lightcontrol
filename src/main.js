import React from 'react';
import ReactDOM from 'react-dom';
import Picker from './picker';
import Drag from './drag';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Drag><div style={{background: '#ff0000'}} /></Drag>,
    // <Picker />,
    document.getElementById('mount')
  );
});
