import React, { useEffect, useState } from "react";
import "./Header.css";
import FormatDate from "../../utils/FormatDate";
import SearchForm from "../SearchForm/SearchForm";
import CompaniesList from "../CompaniesList/CompaniesList";
import EmployeesList from "../EmployeesList/EmployeesList";

const Header = () => {
  const [calls, setCalls] = useState(30);
  const [callsNew, setCallsNew] = useState(20);
  const [callQuality, setCallQuality] = useState(40);
  const [callConversion, setCallConversion] = useState(67);
  const [date, setDate] = useState("");
  const [callsPercent, setCallsPercent] = useState(0);
  const [isSearchHeader, setIsSearchHeader] = useState(true);

  useEffect(() => {
    setDate(FormatDate());
    const percent = (callsNew / calls) * 100;
    setCallsPercent(percent);
  }, [calls, callsNew]);

  return (
    <section className="header">
      <div className="header__container header__container_left">
        <p className="header__date">{`${date}`}</p>
        <div className="statusbar">
          <p className="statusbar__text">
            Новые звонки{" "}
            <span className="statusbar__text statusbar__text_green">{`${callsNew} из ${calls} шт`}</span>
          </p>
          <div className="statusbar__line">
            <div
              className="statusbar__fill"
              style={{
                width: `${callsPercent}%`,
                height: "100%",
                background: "#28A879",
              }}
            ></div>
          </div>
        </div>
        <div className="statusbar">
          <p className="statusbar__text">
            Качество разговоров{" "}
            <span className="statusbar__text statusbar__text_yellow">{`${callQuality}%`}</span>
          </p>
          <div className="statusbar__line">
            <div
              className="statusbar__fill"
              style={{
                width: `${callQuality}%`,
                height: "100%",
                background: "#FFD500",
              }}
            ></div>
          </div>
        </div>
        <div className="statusbar">
          <p className="statusbar__text">
            Конверсия в заказ{" "}
            <span className="statusbar__text statusbar__text_red">{`${callConversion}%`}</span>
          </p>
          <div className="statusbar__line">
            <div
              className="statusbar__fill"
              style={{
                width: `${callConversion}%`,
                height: "100%",
                background: "#EA1A4F",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="header__container header__container_right">
        <SearchForm isHeader={isSearchHeader} />
        <CompaniesList />
        <EmployeesList />
      </div>
    </section>
  );
};

export default Header;
