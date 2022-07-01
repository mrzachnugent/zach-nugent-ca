export const includes = (
  possibleStrings: string[],
  input: string | undefined,
  excludeStrings?: string[]
) =>
  input
    ? possibleStrings.some(
        (str) =>
          input.toLowerCase().includes(str.toLowerCase()) &&
          !excludeStrings?.some((exStr) =>
            input.toLowerCase().includes(exStr.toLowerCase())
          )
      )
    : false;
