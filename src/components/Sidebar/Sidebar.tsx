import React, { useState } from "react";
import "./Sidebar.css";
import { sidebarTabs } from "../../config/Sidebar";
import { AddOrderIcon, PayIcon } from "./../../icons/sidebar/SideBarIcons";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <section className="sidebar">
      <div className="sidebar__logo"></div>
      <ul className="sidebar__menu">
        {sidebarTabs.map((item, index) => (
          <li
            onClick={() => handleTabClick(index)}
            key={item.name}
            className={`sidebar__item ${
              activeTab === index ? "sidebar__item_active" : ""
            }`}
          >
            <div className="sidebar__container">
              <div className="sidebar__icon">{item.icon}</div>
              <p className="sidebar__text">{item.name}</p>
            </div>
            <div
              className="sidebar__point"
              style={{ display: `${activeTab === index ? "flex" : ""}` }}
            ></div>
          </li>
        ))}
      </ul>
      <button className="sidebar__button">
        <p className="sidebar__text sidebar__text_button">Добавить заказ</p>
        <div className="sidebar__icon sidebar__icon_button">
          <AddOrderIcon />
        </div>
      </button>
      <button className="sidebar__button sidebar__button_pay">
        <p className="sidebar__text sidebar__text_button">Оплата</p>
        <div className="sidebar__icon sidebar__icon_button">
          <PayIcon />
        </div>
      </button>
    </section>
  );
};

export default Sidebar;
