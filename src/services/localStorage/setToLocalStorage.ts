export default function setToLocalStorage(key: string, value: unknown) {
  return localStorage.setItem(key, JSON.stringify(value));
}
