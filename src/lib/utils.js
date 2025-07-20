// formats dates in a specific way
export const getWeekRange = (startDate, endDate) => {
  const [startDay, startMonth, startYear] = startDate.split("-").map(Number);
  const [endDay, endMonth, endYear] = endDate.split("-").map(Number);

  const start = new Date(startYear, startMonth - 1, startDay);
  const end = new Date(endYear, endMonth - 1, endDay);

  const startMonthName = new Intl.DateTimeFormat("en-GB", {
    month: "long",
  }).format(start);
  const endMonthName = new Intl.DateTimeFormat("en-GB", {
    month: "long",
  }).format(end);

  if (startMonth === endMonth && startYear === endYear) {
    return `${startDay} - ${endDay} ${startMonthName},${startYear}`;
  } else if (startYear === endYear) {
    return `${startDay} ${startMonthName} - ${endDay} ${endMonthName}, ${startYear}`;
  } else {
    return `${startDay} ${startMonthName},${startYear} - ${endDay} ${endMonthName},${endYear}`;
  }
};

export const getMonthDate = (dateString) => {
  const [day, month, year] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
};


export const getPercentage = (value, total) => {
  if (!total || total === 0) return 0;
  return Math.floor((value / total) * 100);
};