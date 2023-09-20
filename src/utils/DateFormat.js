export function handleFormatDate(dates) {
  const datesNew = dates.map((date) => {
    const year = date.slice(6);
    const month = date.slice(3, 5);
    const day = date.slice(0, 2);
    return `20${year}-${month}-${day}`;
  });
  return { firstDate: datesNew[0], secondDate: datesNew[1] };
}

export function handleFormatDateCallsList(date) {
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8);
  return `${day}.${month}.${year}`;
}
