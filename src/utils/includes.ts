export const includes = (
  possibleStrings: string[],
  input: string | undefined
) =>
  input
    ? possibleStrings.some((str) => str.toLowerCase() === input.toLowerCase())
    : false;
