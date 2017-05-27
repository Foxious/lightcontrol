Array.range = (size) => new Array(size).fill().map((e, i) => i)

Array.repeat = (size, value)  => new Array(size).fill(value)

Array.prototype.tap = function(c) {
  this.forEach(c);
  return this;
}

export default {}
