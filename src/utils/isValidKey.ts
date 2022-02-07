export const isValidKey = (
  key: number | string | symbol,
  object: object
): key is keyof typeof object => {
  return key in object;
};
