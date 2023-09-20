import { useEffect, useState, useRef } from "react";
import "./Filter.css";
import ClosePopup from "../../../utils/ClosePopup";
import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";
import { setFilter } from "../../../store/reducers/reduserFilter";
import Filters from "../../../utils/Filters";

function Filter({ filterList, type, calls, resFilters, setResFilters }) {
  const [filterName, setFilterName] = useState(filterList[0]);
  const [popupOpen, setPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const nodeRef = useRef(null);

  function openPopup() {
    if (!popupOpen) {
      setPopupOpen(true);
    } else {
      setPopupOpen(false);
    }
  }
  
  function choiceFilter(e) {
    const filter = e.target.closest(".filter__item");
    setFilterName(filter.textContent);
    setPopupOpen(false);
  }
  // сброс фильтра
  useEffect(() => {
    if (resFilters) {
      setFilterName("Все типы");
    }
  }, [resFilters]);
  //фильтрация
  useEffect(() => {
    if (filterName === "Все типы") {
      dispatch(setFilter(calls));
      setResFilters(true);
    } else if (filterName === "Входящие") {
      dispatch(setFilter(Filters([...calls], 1)));
      setResFilters(false);
    } else if (filterName === "Исходящие") {
      dispatch(setFilter(Filters([...calls], 0)));
      setResFilters(false);
    }
  }, [calls, filterName]);

  ClosePopup(type, setPopupOpen);

  return (
    <li className={`filter ${type}`}>
      <div onClick={openPopup} className="filter__container">
        <p className="filter__text">{filterName}</p>
        <div
          className={`arrow filter__arrow ${popupOpen ? "arrow_active" : ""}`}
        >
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.8"
              d="M1.41 0.590088L6 5.17009L10.59 0.590088L12 2.00009L6 8.00009L0 2.00009L1.41 0.590088Z"
              fill="#ADBFDF"
            />
          </svg>
        </div>
      </div>
      <CSSTransition
        nodeRef={nodeRef}
        in={popupOpen}
        classNames="alertP"
        timeout={100}
        unmountOnExit
      >
        <div ref={nodeRef} className="filter__popup">
          <ul className="filter__list">
            {filterList.map((item) => {
              return (
                <li
                  key={filterList.indexOf(item)}
                  onMouseDown={choiceFilter}
                  className={`filter__item ${
                    item === filterName ? "filter__item_active" : ""
                  }`}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </CSSTransition>
    </li>
  );
}

export default Filter;
