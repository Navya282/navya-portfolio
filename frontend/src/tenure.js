// How long since the joining date, in completed months.
// On the joining day of each month it's an exact number ("9"); on the days after, it gets a "+" ("9+").
// Example for 9 Feb: 9 Nov -> "9", 10 Nov to 8 Dec -> "9+", 9 Dec -> "10".
export function tenure(isoDate, today = new Date()) {
  const start = new Date(isoDate);
  let months = (today.getFullYear() - start.getFullYear()) * 12 + (today.getMonth() - start.getMonth());
  if (today.getDate() < start.getDate()) months -= 1; // this month's joining day hasn't come yet
  const exact = today.getDate() === start.getDate();
  return { months: Math.max(months, 0), exact, label: `${Math.max(months, 0)}${exact ? '' : '+'}` };
}
