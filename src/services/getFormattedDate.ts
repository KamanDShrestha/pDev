export default function getformattedDate(providedDate: Date | undefined) {
  if (!providedDate) {
    return '';
  }
  const date = new Date(providedDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
