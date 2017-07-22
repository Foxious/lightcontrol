import React from 'react';

const vec = (x, y) => ({x, y})
const mag = (v) => Math.sqrt(v.x * v.x + v.y * v.y)

const normalize = (v) => {
  let m = mag(v);
  return vec(v.x / m, v.y / m);
}

const vecSubtract = (v1, v2) => vec(v1.x - v2.x, v1.y - v2.y)
const dot = (v1, v2) => v1.x*v2.x + v1.y*v2.y
const cross = (v1, v2) => v1.x*v2.y - v1.y*v2.x
const direction = (v1, v2) => Math.sign(Math.asin(cross(v1, v2)))

export default class Drag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotation: 0
    }

    this.lastRotate = 0;

    let rotate;

    this.clearRotate = () => { rotate = () => 0 }
    this.clearRotate();
    this.vec = (p2) => vecSubtract(p2, this.center);

    const startRotation = (to) =>
      (from) => {
        console.log('direction:', direction(normalize(to), normalize(from)));
        return direction(normalize(to), normalize(from)) * Math.acos(dot(normalize(this.vec(to)), normalize(this.vec(from))));
      }

    this.dragStart = (e) => {
      console.log('event start:', e.clientX, e.clientY);
      rotate = startRotation(vec(e.clientX, e.clientY));
    }

    this.dragEnd = () => {
      this.lastRotate = this.state.rotation;
      this.clearRotate();
    }

    this.handleDrag = (e) =>
      ((click) =>
        this.setState((prev) =>{
          return {rotation: this.lastRotate + rotate(click)}
      }))(vec(e.clientX, e.clientY))
  }

  componentDidMount() {
    let bounds = this.element.getBoundingClientRect();
    this.center = vec(bounds.left + bounds.width * 0.5, bounds.top + bounds.height * 0.5);
    console.log(this.center);
    window.addEventListener('mouseup', () => { this.dragEnd() }, false);
  }

  render() {
    return <div ref={(ref) => this.element = ref} className="wheel" style={{transform: `rotate(${this.state.rotation}rad)`}} onMouseMove={this.handleDrag} onMouseDown={this.dragStart} >{this.props.children}</div>
  }
}
