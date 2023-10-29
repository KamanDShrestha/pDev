export default function getFromLocalStorage(key: string) {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key)!)
    : null;
}
