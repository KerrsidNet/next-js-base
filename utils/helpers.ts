export const convertSortOrder = (fullOrder: string): string => {
  if (!fullOrder) return "desc";
  if (fullOrder.toLowerCase() === "ascending") {
    return "asc";
  } else if (fullOrder.toLowerCase() === "descending") {
    return "desc";
  } else {
    // Default to ascending if the input is not recognized
    return "asc";
  }
};
