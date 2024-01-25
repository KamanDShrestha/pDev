const now = new Date();
const year = now.getFullYear();
const month = (now.getMonth() + 1).toString().padStart(2, '0'); // months are 0-indexed in JavaScript
const day = now.getDate().toString().padStart(2, '0');

export default function getFormattedDate() {
  return `${year}-${month}-${day}`;
}
