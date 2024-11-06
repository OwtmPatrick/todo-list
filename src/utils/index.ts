export const shortAddress = (address: string): string =>
  `${address.substring(0, 10)}...${address.substring(38)}`;

export const round = (num: string, accuracy = 2): string => parseFloat(num).toFixed(accuracy);
