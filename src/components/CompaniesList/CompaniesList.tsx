import React, { useState } from "react";
import { companies } from "../../utils/Constants";
import ClosePopup from "../../utils/ClosePopup";
import { CSSTransition } from "react-transition-group";
import "./CompaniesList.css";
import { ArrowIcon } from "../../icons/header/HeaderIcons";

const CompaniesList = () => {
  const [company, setCompany] = useState(companies[0]);
  const [companiesList, setCompaniesList] = useState(companies);
  const [openList, setopenList] = useState(false);

  function choiceCompany(e: any) {
    const company = e.target.closest(".companies__item");
    setCompany(company.textContent);
    setopenList(false);
  }

  function openPopup() {
    if (!openList) {
      setopenList(true);
    } else {
      setopenList(false);
    }
  }

  ClosePopup("companies", setopenList);

  return (
    <>
      <div className="companies">
        <div onClick={openPopup} className="companies__container">
          <p className="companies__text">{company}</p>
          <div
            className={`arrow arrow_companies ${
              openList ? "arrow_active" : ""
            }`}
          >
            <ArrowIcon />
          </div>
        </div>
        <CSSTransition
          in={openList}
          classNames="alertP"
          timeout={100}
          unmountOnExit
        >
          <div className="companies__popup">
            <ul className="companies__list">
              {companiesList.map((companyItem) => {
                return (
                  <li
                    key={companiesList.indexOf(companyItem)}
                    onClick={choiceCompany}
                    className="companies__item"
                  >
                    <p
                      className={`companies__text companies__text_popup ${
                        companyItem === company ? "companies__item_active" : ""
                      }`}
                    >
                      {companyItem}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </CSSTransition>
      </div>
    </>
  );
};

export default CompaniesList;
