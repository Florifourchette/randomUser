export function setLSFilter(key: string, value: String): String {
  localStorage.setItem(key, JSON.stringify(value));
  const storedFilter = localStorage.getItem(key);
  if (
    storedFilter !== null &&
    storedFilter !== undefined &&
    storedFilter !== ''
  ) {
    return JSON.parse(storedFilter);
  } else {
    return '';
  }
}
