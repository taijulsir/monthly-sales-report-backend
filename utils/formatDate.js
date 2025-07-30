export const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-").map(Number);

  const paddedMonth = String(month).padStart(2, "0");
  const paddedDay = String(day).padStart(2, "0");

  // Return a Date object
  return new Date(`${year}-${paddedMonth}-${paddedDay}T00:00:00`);
};
