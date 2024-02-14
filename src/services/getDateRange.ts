export default function getDateRange(startDate: Date, endDate: Date): Date[] {
  const dateArray: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}
