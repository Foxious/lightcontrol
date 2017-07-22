import React from 'react';
import ReactDOM from 'react-dom';
import Picker from './picker';
import Drag from './drag';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    <Drag><Picker /></Drag>,
    document.getElementById('mount')
  );
});
