import React, { FC, useEffect, useState } from "react";
import "./Calendar.css";
import { CSSTransition } from "react-transition-group";
import DataPicker from "../../utils/DataPicker/DataPicker";
import { Dayjs } from "dayjs";
import setDateToday from "../../utils/SetDateToday";
import { handleFormatDate } from "../../utils/DateFormat";

function Calendar({setIsDates}) {
  const [numberDay, setNumberDay] = useState('3 дня');
  const [openCalendar, setOpenCalendar] =useState(false);
  const [queryDate, setQueryDate] = useState([]);
  //функция выбора временого промежутка при клике на строку;
  function choiceCalendar(e) {
   const date = e.target.closest('.calendar__item');
   setQueryDate([]);
   setNumberDay(date.textContent);
   setOpenCalendar(false);
  }
//функция выбора временого промежутка при клике на стрелки;
  function choiceTime(e) {
    let time
    const arr = ['3 дня', 'Неделя', 'Месяц', 'Год'];

    setQueryDate([]);
    setNumberDay('3 дня');
    
    if (e.target.closest('.calendar__button_left')) {
       time = arr.reverse();
    } else {
        time = arr;
    }
    
    if(numberDay === time[0]) {
      setNumberDay(time[1]);
    } else if (numberDay === time[1]) {
      setNumberDay(time[2]);
    } else if (numberDay === time[2]) {
      setNumberDay(time[3])
    } else if (numberDay === time[3]) {
      setNumberDay(time[0])
    }
  }
  //определение дат для дальнейшей передачи в параметры запроса
  useEffect(() => {
    if(numberDay === '3 дня') {
      setIsDates(setDateToday());
    } else if (numberDay === 'Неделя') {
      setIsDates(setDateToday(7));
    } else if (numberDay === 'Месяц') {
      setIsDates(setDateToday(30));
    } else if (numberDay === 'Год') {
      setIsDates(setDateToday(365));
    } else if (numberDay === 'Даты') {
      setIsDates(handleFormatDate(queryDate));
    }
  },[numberDay, queryDate, setIsDates])

  useEffect(() => {
    if(queryDate.length > 0) {
      setNumberDay('Даты');
    } 
  },[queryDate]);
  // Функцтя открытия попапа
  function openPopup() {
    if(!openCalendar) {
      setOpenCalendar(true);
    } else {
      setOpenCalendar(false);
    }   
  }
  //сдушатель закрытия попапа при клике на страницу
  document.addEventListener("mousedown", (e) => {
    const target = e.target;
    if (!target.closest('.calendar') && !target.closest('.ant-picker-panel')) {
      setOpenCalendar(false);
    }
    if (target.closest('.calendar__button')) {
      setOpenCalendar(false)
    }
  })
  return (
    <div className="calendar">
      <div onClick={choiceTime} className="calendar__button calendar__button_left">
        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.175 8.825L2.35833 5L6.175 1.175L5 0L0 5L5 10L6.175 8.825Z" fill="#ADBFDF"/>
        </svg>
      </div>
      <div onClick={openPopup} className='calendar__container'>
        <div className='calendar__icon'>
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.4 1.63636H13.6V0H12V1.63636H4V0H2.4V1.63636H1.6C0.72 1.63636 0 2.37273 0 3.27273V16.3636C0 17.2636 0.72 18 1.6 18H14.4C15.28 18 16 17.2636 16 16.3636V3.27273C16 2.37273 15.28 1.63636 14.4 1.63636ZM14.4 16.3636H1.6V5.72727H14.4V16.3636Z" fill="#ADBFDF"/>
          </svg>
        </div>
        <p className='calendar__text'>{numberDay}</p>
      </div>
      <div onClick={choiceTime} className="calendar__button calendar__button_rigth">
        <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.175 8.825L2.35833 5L6.175 1.175L5 0L0 5L5 10L6.175 8.825Z" fill="#ADBFDF"/>
        </svg>
      </div>
      <CSSTransition in={openCalendar} classNames='alertP' timeout={100} unmountOnExit>
        <div className='calendar__popup'>
          <ul className='calendar__list'>
            <li onClick={choiceCalendar} className={`calendar__item ${numberDay === '3 дня' ? 'calendar__item_active' : ''}`}>3 дня</li>
            <li onClick={choiceCalendar} className={`calendar__item ${numberDay === 'Неделя' ? 'calendar__item_active' : ''}`}>Неделя</li>
            <li onClick={choiceCalendar} className={`calendar__item ${numberDay === 'Месяц' ? 'calendar__item_active' : ''}`}>Месяц</li>
            <li onClick={choiceCalendar} className={`calendar__item ${numberDay === 'Год' ? 'calendar__item_active' : ''}`}>Год</li>
          </ul>
          <p className='calendar__text calendar__text_date'>Указать даты</p>
          <DataPicker setQueryDate={setQueryDate} defaultValue={queryDate}/>
        </div>
      </CSSTransition>
  </div>  
  )
};

export default Calendar;