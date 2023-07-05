export const NumFormatter = (num: number) => {
  let formatted;
  if (num > 999999)
    formatted =
      Math.sign(num) * Number((Math.abs(num) / 1000000).toFixed(1)) + "m";
  else if (num > 999)
    formatted =
      Math.sign(num) * Number((Math.abs(num) / 1000).toFixed(1)) + "k";
  else formatted = Math.sign(num) * Math.abs(num);
  return formatted;
};
