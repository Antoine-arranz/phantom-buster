const createListFromEnum = (enumObj: Record<string, string>): string[] => {
  const enumKeys = Object.keys(enumObj).filter((key) =>
    isNaN(Number(enumObj[key]))
  );
  return enumKeys.map((key) => enumObj[key]);
};

export default createListFromEnum;
