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
