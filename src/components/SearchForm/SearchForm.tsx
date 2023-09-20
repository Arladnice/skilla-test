import React, { FC, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./SearchForm.css";

interface ISearchForm {
  isHeader?: boolean;
}

const SearchForm: FC<ISearchForm> = ({ isHeader }) => {
  const [search, setSearch] = useState(false);
  const [searchIcon, setSearchIcon] = useState(true);
  const [query, setQuery] = useState("");

  function handleChangeSearch(e: any) {
    setQuery(e.target.value);
  }

  function openSearch() {
    setSearch(true);
    setSearchIcon(false);
  }

  function closeSearch() {
    setSearch(false);
    setSearchIcon(true);
    setQuery("");
  }
  function changeFocus(e: any) {
    e.target.closest(".search__form").classList.toggle("search__form_active");
  }

  useEffect(() => {
    function handleEscClose(e: any) {
      if (e.key === "Escape") {
        closeSearch();
      }
    }
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  function handleSubmit(e: any) {
    e.preventDefault();
  }

  return (
    <div className={`search ${isHeader ? "search__header" : ""}`}>
      <div className="search__box">
        <CSSTransition
          in={searchIcon}
          classNames="alertR"
          timeout={200}
          unmountOnExit
        >
          <div
            onClick={openSearch}
            className="search__container"
            style={{ right: `${isHeader ? 0 : ""}` }}
          >
            <svg
              className="search__icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.4351 10.0629H10.7124L10.4563 9.81589C11.3528 8.77301 11.8925 7.4191 11.8925 5.94625C11.8925 2.66209 9.23042 0 5.94625 0C2.66209 0 0 2.66209 0 5.94625C0 9.23042 2.66209 11.8925 5.94625 11.8925C7.4191 11.8925 8.77301 11.3528 9.81589 10.4563L10.0629 10.7124V11.4351L14.6369 16L16 14.6369L11.4351 10.0629ZM5.94625 10.0629C3.66838 10.0629 1.82962 8.22413 1.82962 5.94625C1.82962 3.66838 3.66838 1.82962 5.94625 1.82962C8.22413 1.82962 10.0629 3.66838 10.0629 5.94625C10.0629 8.22413 8.22413 10.0629 5.94625 10.0629Z"
                fill="#ADBFDF"
              />
            </svg>
            <p className="search__text">{`${
              isHeader ? "" : "Поиск по звонкам"
            }`}</p>
          </div>
        </CSSTransition>
        <CSSTransition
          in={search}
          classNames="alertR"
          timeout={200}
          unmountOnExit
        >
          <form
            autoFocus
            noValidate
            onSubmit={handleSubmit}
            className="search__form"
          >
            <button type="submit" className="search__button">
              <svg
                className="search__icon"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4351 10.0629H10.7124L10.4563 9.81589C11.3528 8.77301 11.8925 7.4191 11.8925 5.94625C11.8925 2.66209 9.23042 0 5.94625 0C2.66209 0 0 2.66209 0 5.94625C0 9.23042 2.66209 11.8925 5.94625 11.8925C7.4191 11.8925 8.77301 11.3528 9.81589 10.4563L10.0629 10.7124V11.4351L14.6369 16L16 14.6369L11.4351 10.0629ZM5.94625 10.0629C3.66838 10.0629 1.82962 8.22413 1.82962 5.94625C1.82962 3.66838 3.66838 1.82962 5.94625 1.82962C8.22413 1.82962 10.0629 3.66838 10.0629 5.94625C10.0629 8.22413 8.22413 10.0629 5.94625 10.0629Z"
                  fill="#ADBFDF"
                />
              </svg>
            </button>
            <input
              value={query || ""}
              onChange={handleChangeSearch}
              onFocus={changeFocus}
              onBlur={changeFocus}
              required
              className="search__input"
              type="text"
              placeholder=""
              name="search"
              autoComplete="off"
            ></input>
            <button
              type="button"
              onClick={closeSearch}
              className="search__clear"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                  fill="#ADBFDF"
                />
              </svg>
            </button>
          </form>
        </CSSTransition>
      </div>
    </div>
  );
};

export default SearchForm;
