export const checkIfDifferenceArray = (arr: Array<any>): boolean => {
  return new Set(arr).size !== 1;
};
