import React from 'react';
import { CustomPicker } from 'react-color';
import { ChromePicker } from 'react-color';

import { Hue } from 'react-color/lib/components/common';

Array.range = (size) => new Array(size).fill().map((e, i) => i)

Array.repeat = (size, value)  => new Array(size).fill(value)

Array.prototype.tap = function(c) {
  this.forEach(c);
  return this;
}

const fromEuc = (val) => 50 + val * 50
const clip = (angle) =>`polygon(50% 50%, 100% 50%, ${fromEuc(Math.cos(angle))}% ${fromEuc(-Math.sin(angle))}%)`

const colorFromAngle = (step, angle) => {
  const h = 2 * Math.PI / 6;
  const hc = (step * angle) / h;
  console.log("hc is ", hc);

  const scaleWith = (val) => (val % 1) * 100
  const scaleAgainst = (val) => (1 - (val % 1)) * 100

  let r = 0, b = 0, g = 0;
  if (hc < 1) {
    r = 100;
    g = scaleWith(hc);
  } else if (hc < 2) {
    r = scaleAgainst(hc);
    g = 100;
  } else if (hc < 3) {
    g = 100
    b = scaleWith(hc);
  } else if (hc < 4) {
    g = scaleAgainst(hc);
    b = 100;
  } else if (hc < 5) {
    r = scaleWith(hc)
    b = 100;
  } else {
    r = 100;
    b = scaleAgainst(hc - 5);
  }

  return `rgb(${r}%, ${g}%, ${b}%)`;
}

const Wedge = (props) => <div style={{backgroundColor: colorFromAngle(props.step, props.angle), clipPath: clip(props.angle)}}> </div>

const Rotate = (props) =>
  <div className="shade" style={{transform: `rotate(${props.angle}rad)`}} >{props.children}</div>

const Wheel = (props) =>
  <div className="wheel">
  {Array.repeat(props.sections, 2 * Math.PI / props.sections)
    .map((a, i) =>
        <Rotate angle={a * -i}>
            <Wedge step={i} angle={a} />
        </Rotate>)}
  </div>

const Picker = () =>
  <Wheel sections={12} />

export default CustomPicker(Picker);
