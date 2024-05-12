export const findByKey = <T>(
  array: T[],
  value: any,
  key: keyof T
): T | undefined => {
  return array.find((item) => item[key] === value);
};
