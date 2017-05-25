import React from 'react';
import { CustomPicker } from 'react-color';
import { ChromePicker } from 'react-color';

import { Hue } from 'react-color/lib/components/common';

const Wedge = (props) =>
  <div className={`wedge ${props.color}`}> </div>

const Rotate = (props) =>
  <div style={{transform: `rotate(${props.angle}deg)`}} >{props.children}</div>

const Picker = () =>
  <div className="wheel">
    <div className="blend">
    {[<Wedge color="red"/>,
      <Wedge color="yellow" />,
      <Wedge color="green" />,
      <Wedge color="teal" />,
      <Wedge color="blue" />,
      <Wedge color="purple" />,
      ].map((w, i) => <Rotate angle={i * 60}>{w}</Rotate>)}
    </div>
  </div>

export default CustomPicker(Picker);
