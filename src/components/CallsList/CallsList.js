import { useEffect, useState } from "react";
import "./CallsList.css";
import Call from "../Call/Call";
import setDateToday from "../../utils/SetDateToday";
import { handleFormatDateCallsList } from "../../utils/DateFormat";

function CallsList({ date, callList }) {
  const [callListFilter, setCallListFilter] = useState([]);
  const [isDate, setIsDate] = useState("");
  const [numberOfCalls, setNumberOfCalls] = useState("");

  useEffect(() => {
    const callFilter = callList.filter((call) => call["date_notime"] === date);
    setCallListFilter(callFilter);
  }, [callList, date]);
  //установка подписи даты и кол-ва звонков
  useEffect(() => {
    if (setDateToday().secondDate === date) {
      setIsDate("");
    } else if (setDateToday(1).firstDate === date) {
      setIsDate("вчера");
      setNumberOfCalls(callListFilter.length);
    } else {
      setIsDate(handleFormatDateCallsList(date));
      setNumberOfCalls(callListFilter.length);
    }
  }, [callListFilter, date]);

  return (
    <>
      <p className="callsList__text">
        {callListFilter.length > 0 ? `${isDate}` : ""}
        <span className="callsList__text callsList__text_number">
          {callListFilter.length > 0 ? `${numberOfCalls}` : ""}
        </span>
      </p>
      <ul className="callsList__list">
        {callListFilter.map((call) => {
          return (
            <Call
              key={call.id}
              id={call.id}
              callType={call.in_out}
              time={call.date}
              imageEmploye={call.person_avatar}
              fromSite={call.from_site}
              phoneNumberIn={call.to_number}
              phoneNumberOut={call.from_number}
              callStatus={call.status}
              source={call.source}
              callDuration={call.time}
              personId={call.person_id}
              personName={call.person_name}
              personSurename={call.person_surname}
              contactName={call.contact_name}
              contactCompany={call.contact_company}
              recordId={call.record}
              partnerId={call.partnership_id}
            />
          );
        })}
      </ul>
    </>
  );
}

export default CallsList;
