import React, { useEffect, useState } from "react";
import {
  ArrowIcon,
  EmailIcon,
  ExitIcon,
  ExitIcon2,
  TelIcon,
} from "../../icons/header/HeaderIcons";
import { CSSTransition } from "react-transition-group";
import "./EmployeesList.css";
import { employeesList } from "../../utils/Constants";
const derectorImg = require("../../icons/director.png");
const avatarEmployer = require("../../icons/employe.png");

const EmployeesList = () => {
  const [openList, setOpenList] = useState(false);

  useEffect(() => {
    const listItem = document.querySelectorAll(".employees__item");
    listItem.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const buttonExitPost = item.querySelector(".button__exit_post");
        if (buttonExitPost) {
          buttonExitPost.classList.add("button_active");
        }
      });

      item.addEventListener("mouseleave", () => {
        const buttonExitPost = item.querySelector(".button__exit_post");
        if (buttonExitPost) {
          buttonExitPost.classList.remove("button_active");
        }
      });
    });
  }, []);

  function openPopup() {
    setOpenList(!openList);
  }

  document.addEventListener("mousedown", (e) => {
    const target = e.target as HTMLElement | null;
    if (
      target &&
      !target.closest(".employees") &&
      !target.closest(".employees__popup")
    ) {
      setOpenList(false);
    }
  });

  return (
    <>
      <div className="employees">
        <div onClick={openPopup} className="employees__container">
          <img
            src={derectorImg}
            alt="работник"
            className="employees__img"
          ></img>
          <div className={`arrow ${openList ? "arrow_active" : ""}`}>
            <ArrowIcon />
          </div>
        </div>
        <CSSTransition
          in={openList}
          classNames="alertP"
          timeout={100}
          unmountOnExit
        >
          <div className="employees__popup">
            <div className="employees__container employees__container_info">
              <div className="employees__info">
                <p className="employees__text employees__text_name">
                  Упоров Кирилл
                </p>
                <p className="employees__text">
                  Директор<span className="employees__point"></span>
                  Санкт-Петербург
                </p>
                <a href="tel:88003331721" id="tel" className="employees__tel">
                  <div className="employees__icon_tel">
                    <TelIcon />
                  </div>
                  <p className="employees__text employees__text_tel">
                    8 (800) 333-17-21
                  </p>
                </a>
                <a
                  href="mailto: hi@skilla.ru"
                  id="tel"
                  className="employees__email"
                >
                  <div className="employees__icon_email">
                    <EmailIcon />
                  </div>
                  <p className="employees__text employees__text_email">
                    hi@skilla.ru
                  </p>
                </a>
              </div>
              <button type="button" className="button__exit">
                <ExitIcon />
              </button>
            </div>
            <div className="employees__post">
              <p className="employees__text employees__text_post">Операторы</p>
              <ul className="employees__list">
                {employeesList.operators.map((employe, index) => (
                  <li className="employees__item">
                    <div className="employees__container_list">
                      <img
                        alt="работник"
                        src={employe.image}
                        className="employees__avatar"
                      ></img>
                      <p className="employees__text employees__text_list">
                        {employe.name}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="button__exit button__exit_post"
                    >
                      <ExitIcon2 />
                    </button>
                  </li>
                ))}
              </ul>
              <p className="employees__text employees__text_post">Логисты</p>
              <ul className="employees__list">
                {employeesList.logisticians.map((employe, index) => (
                  <li className="employees__item">
                    <div className="employees__container_list">
                      <img
                        alt="работник"
                        src={employe.image}
                        className="employees__avatar"
                      ></img>
                      <p className="employees__text employees__text_list">
                        {employe.name}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="button__exit button__exit_post"
                    >
                      <ExitIcon2 />
                    </button>
                  </li>
                ))}
              </ul>
              <p className="employees__text employees__text_post">Бухгалтеры</p>
              <ul className="employees__list">
                {employeesList.accountants.map((employe, index) => (
                  <li className="employees__item">
                    <div className="employees__container_list">
                      <img
                        alt="работник"
                        src={employe.image}
                        className="employees__avatar"
                      ></img>
                      <p className="employees__text employees__text_list">
                        {employe.name}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="button__exit button__exit_post"
                    >
                      <ExitIcon2 />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CSSTransition>
      </div>
    </>
  );
};

export default EmployeesList;
