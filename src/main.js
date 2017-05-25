import React from 'react';
import ReactDOM from 'react-dom';
import Picker from './Picker';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(Picker),
    document.getElementById('mount')
  );
});
