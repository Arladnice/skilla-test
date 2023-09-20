import "./Call.css";
import { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { ApiCall } from "../../utils/Api";
import roundDuration from "../../utils/roundDuration";
import Player from "../Player/Player";

function Call({
  id,
  callType,
  time,
  imageEmploye,
  fromSite,
  phoneNumberIn,
  phoneNumberOut,
  callStatus,
  source,
  callDuration,
  personId,
  personName,
  personSurename,
  contactName,
  contactCompany,
  recordId,
  partnerId,
}) {
  const [isChecked, setIsCheked] = useState(false);
  const [isHideTime, setIsHideTime] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isRecordActive, setIsRecordActive] = useState(false);
  const [isStatusDuration, setIsStatusDuration] = useState(false);
  const [isRecord, setIsRecord] = useState("none");
  const checkRef = useRef();
  //получение записи звонка
  useEffect(() => {
    if (recordId === "") {
      setIsRecord("none");
    } else {
      ApiCall.getCallRecord(recordId, partnerId)
        .then((response) => {
          setIsRecord(response);
        })
        .catch((res) => {
          console.log(res);
          setIsRecord("none");
        });
    }
  }, [partnerId, recordId]);
  //при отсутствии записи, плеер не открывается
  useEffect(() => {
    if (recordId === "") {
      setIsStatusDuration(false);
    } else {
      setIsStatusDuration(true);
    }
  }, [recordId]);
  //установка состояния чек бокса
  useEffect(() => {
    if (checkRef.current.checked) {
      setIsCheked(true);
    } else {
      setIsCheked(false);
    }
  }, [isCallActive]);

  //выделене строки звонка
  function highlightCall() {
    setIsCallActive(true);
  }

  // снятие выдыления сторки звонка
  function blurCall() {
    setIsCallActive(false);
  }

  return (
    <li
      onMouseEnter={highlightCall}
      onMouseLeave={blurCall}
      style={{
        marginLeft: `${isCallActive || isChecked ? "0" : "40px"}`,
        width: `${isCallActive || isChecked ? "100%" : ""}`,
      }}
      className={`call ${isCallActive || isChecked ? "call__hover" : ""}`}
    >
      <div className="call__box">
        <div
          className="call__check"
          style={{ display: `${isCallActive || isChecked ? "flex" : "none"}` }}
        >
          <input
            type="checkbox"
            className="call__checkbox"
            id={id}
            name={id}
            ref={checkRef}
          ></input>
          <label htmlFor={id}></label>
        </div>
        <div
          className={`call__type call__type_${
            callType === 1 && callStatus === "Дозвонился"
              ? "in"
              : callType === 0 && callStatus === "Дозвонился"
              ? "out"
              : callType === 1 && callStatus === "Не дозвонился"
              ? "inmissed"
              : "outmissed"
          }`}
        ></div>
        <p className="call__time">{time.slice(10, 16)}</p>
        <div id={personId} className="call__employee">
          <img src={imageEmploye} alt={`${personName} ${personSurename}`}></img>
        </div>
        <div className="call__number">
          <div className="call__container call__container_icon">
            <div
              style={{ display: `${fromSite === 1 ? "flex" : "none"}` }}
              className="call__icon call__icon_planet"
            ></div>
            <div
              style={{ display: `${isCallActive ? "flex" : "none"}` }}
              className="call__icon call__icon_tel"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.21778 6.92444C4.49778 9.44 6.56 11.4933 9.07556 12.7822L11.0311 10.8267C11.2711 10.5867 11.6267 10.5067 11.9378 10.6133C12.9333 10.9422 14.0089 11.12 15.1111 11.12C15.6 11.12 16 11.52 16 12.0089V15.1111C16 15.6 15.6 16 15.1111 16C6.76444 16 0 9.23556 0 0.888889C0 0.4 0.4 0 0.888889 0H4C4.48889 0 4.88889 0.4 4.88889 0.888889C4.88889 2 5.06667 3.06667 5.39556 4.06222C5.49333 4.37333 5.42222 4.72 5.17333 4.96889L3.21778 6.92444Z"
                  fill="#ADBFDF"
                />
              </svg>
            </div>
          </div>
          <div className="call__container">
            <p className="call__text">{contactName}</p>
            <p
              style={{ color: `${contactName !== "" ? "#5E7793" : "#122945"}` }}
              className="call__text"
            >
              {callType === 0 ? phoneNumberIn : phoneNumberOut}
            </p>
            <p className="call__text call__text_subscription">
              {contactCompany}
            </p>
          </div>
        </div>
      </div>
      <div className="call__box call__box_2">
        <p className="call__source">{source}</p>
        <div className="call__rating">
          <div style={{ display: "none" }} className="rating rating__recognize">
            Распознать
          </div>
          <p style={{ display: "none" }} className="rating rating__noscript">
            Скрипт не использован
          </p>
          <div style={{ display: "flex" }} className="rating rating__excellent">
            <div className="rating__points">
              <div className="rating__point rating__point_green"></div>
              <div className="rating__point rating__point_green"></div>
              <div className="rating__point rating__point_green"></div>
            </div>
            <div className="rating__container rating__container_excellent">
              Отлично
            </div>
          </div>
          <div style={{ display: "none" }} className="rating rating__well">
            <div className="rating__points">
              <div className="rating__point rating__point_grey"></div>
              <div className="rating__point rating__point_grey"></div>
            </div>
            <div className="rating__container rating__container__well">
              Хорошо
            </div>
          </div>
          <div style={{ display: "none" }} className="rating rating__bad">
            <div className="rating__points">
              <div className="rating__point rating__point_red"></div>
            </div>
            <div className="rating__container rating__container__bad">
              Плохо
            </div>
          </div>
          <div
            style={{ display: `${isCallActive ? "flex" : "none"}` }}
            className="rating__help"
          ></div>
        </div>
      </div>
      <div
        className="call__duration"
        style={!recordId ? { justifyContent: "space-between" } : {}}
      >
        <p
          style={{
            display: `${
              isStatusDuration
                ? isCallActive && !isHideTime
                  ? "none"
                  : isRecordActive
                  ? "none"
                  : "flex"
                : "flex"
            }`,
          }}
          className="call__time call__time_duration"
        >
          {recordId === "" ? "" : roundDuration(callDuration)}
        </p>
        {
          <CSSTransition
            in={isRecordActive || isCallActive}
            classNames="alertR"
            timeout={200}
          >
            <Player
              id={id}
              isCallActive={isCallActive}
              isRecordActive={isRecordActive}
              setIsRecordActive={setIsRecordActive}
              setIsHideTime={setIsHideTime}
              isChecked={isChecked}
              isStatusDuration={isStatusDuration}
              isRecord={isRecord}
            />
          </CSSTransition>
        }
      </div>
    </li>
  );
}

export default Call;
