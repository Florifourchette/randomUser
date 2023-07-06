export function getLSFilter(filter: string): String {
  const searchFilter = localStorage.getItem(filter);
  if (
    searchFilter !== null &&
    searchFilter !== undefined &&
    searchFilter !== ''
  ) {
    return JSON.parse(searchFilter);
  } else {
    return '';
  }
}
