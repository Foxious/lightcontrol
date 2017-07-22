import React from 'react';
import ArrayPolyfill from './array';

const Picker = () =>
  <Wheel sections={64} />

const Wheel = (props) =>
  <div className="wheel">
  {Array.repeat(props.sections, 2 * Math.PI / props.sections)
    .map((a, i) =>
        <Rotate angle={a * -(i - 0.5)}>
            <Wedge step={i} angle={a} />
        </Rotate>)}
  </div>

const Rotate = (props) =>
  <div style={{transform: `rotate(${props.angle}rad)`}} >{props.children}</div>

const Wedge = (props) =>
  <div style={{background: colorFromAngle(props.step * props.angle), clipPath: clip(props.angle)}}> </div>

const colorFromAngle = (angle) => {
  const scaleWith = (val) => (val % 1) * 100
  const scaleAgainst = (val) => (1 - (val % 1)) * 100

  const hc = (angle) / (2 * Math.PI / 6);
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

const clip = (angle) =>`polygon(50% 50%, 100% 50%, ${fromEuc(Math.cos(angle))}% ${fromEuc(-Math.sin(angle))}%)`

const fromEuc = (val) => 50 + val * 50

export default Picker;
