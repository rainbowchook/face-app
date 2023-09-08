export const truncate = (value: number, precision: number): number => {
  var step = Math.pow(10, precision || 0);
  var temp = Math.trunc(step * value);

  return temp / step;
}