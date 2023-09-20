function FormatDate() {
  const date = new Date();
  const month = date.getMonth();
  let fMonth;
  switch (month) {
    case 0:
      fMonth = "янв";
      break;
    case 1:
      fMonth = "фев";
      break;
    case 2:
      fMonth = "мар";
      break;
    case 3:
      fMonth = "апр";
      break;
    case 4:
      fMonth = "мая";
      break;
    case 5:
      fMonth = "июн";
      break;
    case 6:
      fMonth = "июл";
      break;
    case 7:
      fMonth = "авг";
      break;
    case 8:
      fMonth = "сен";
      break;
    case 9:
      fMonth = "окт";
      break;
    case 10:
      fMonth = "ноя";
      break;
    case 11:
      fMonth = "дек";
      break;
    default:
  }
  const dayWeek = date.getDay();
  let fDay;
  switch (dayWeek) {
    case 1:
      fDay = "Понедельник";
      break;
    case 2:
      fDay = "Вторник";
      break;
    case 3:
      fDay = "Среда";
      break;
    case 4:
      fDay = "Четверг";
      break;
    case 5:
      fDay = "Пятница";
      break;
    case 6:
      fDay = "Суббота";
      break;
    default:
      fDay = "Воскресение";
  }

  const day = date.getDate();
  const dateText = `${fDay}, ${day} ${fMonth}`;
  return dateText;
}

export default FormatDate;
