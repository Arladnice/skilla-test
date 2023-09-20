function setDateToday(changeDay = 2) {
  const today = new Date();
  const pastDate = new Date(today - changeDay * 24 * 60 * 60 * 1000);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return {
    firstDate: formatDate(pastDate),
    secondDate: formatDate(today),
  };
}

export default setDateToday;
