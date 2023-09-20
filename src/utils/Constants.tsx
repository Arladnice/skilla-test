import {
  BaseIcon,
  CallsIcon,
  CounterpartiesIcon,
  DocumentsIcon,
  MessagesIcon,
  OrdersIcon,
  PerformersIcon,
  ReportsIcon,
  ResultsIcon,
  SettingsIcon,
} from "../icons/sidebar/SideBarIcons";
export interface ISidebarTabs {
  name: string;
  icon: JSX.Element;
}
export const companies = [
  "Все организации",
  "ООО Грузчиков Сервис Запад",
  "ИП Митрофанов М.М.",
  "ИП Иванов М.М.",
];

export const sidebarTabs = [
  { name: "Итоги", icon: <ResultsIcon /> },
  { name: "Заказы", icon: <OrdersIcon /> },
  { name: "Сообщения", icon: <MessagesIcon /> },
  { name: "Звонки", icon: <CallsIcon /> },
  { name: "Контрагенты", icon: <CounterpartiesIcon /> },
  { name: "Документы", icon: <DocumentsIcon /> },
  { name: "Исполнители", icon: <PerformersIcon /> },
  { name: "Отчеты", icon: <ReportsIcon /> },
  { name: "База знаний", icon: <BaseIcon /> },
  { name: "Настройки", icon: <SettingsIcon /> },
];

export const employeesList = {
  operators: [
    { name: "Мирон Батонов", image: require("../icons/employe.png") },
    {
      name: "Милана Константинопольская",
      image: require("../icons/employe.png"),
    },
    { name: "Александра Сизых", image: require("../icons/employe.png") },
  ],
  logisticians: [
    { name: "Александра Сизых", image: require("../icons/employe.png") },
    { name: "Илья Алексеев", image: require("../icons/employe.png") },
    { name: "Владимир Петров", image: require("../icons/employe.png") },
  ],
  accountants: [
    { name: "Полина Калинина", image: require("../icons/employe.png") },
    { name: "Наталья Натальева", image: require("../icons/employe.png") },
    {
      name: "Константин Константинопольский",
      image: require("../icons/employe.png"),
    },
  ],
};
