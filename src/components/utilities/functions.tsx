export const getFirstFewWords = (text: string, count: number) => {
  return text.split(/\s+/).slice(0, count).join(" ");
};
