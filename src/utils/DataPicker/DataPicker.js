import { DatePicker, Space, ConfigProvider } from "antd";
import "./DataPicker.css";
import "dayjs/locale/ru";
import dayjs from "dayjs";
import locale from "antd/locale/ru_RU";
const { RangePicker } = DatePicker;

function DataPicker({ setQueryDate, defaultValue }) {
  const dateFormat = "DD.MM.YY";

  const date = new Date();
  const secondDate = new Date(date + 1000 * 60 * 60 * 24);

  const disabledDate = (current) => {
    return current && current > dayjs(secondDate).endOf("day");
  };

  function onChange(date, dateString) {
    if (dateString === null) {
      setQueryDate([]);
    } else {
      setQueryDate(dateString);
    }
  }

  return (
    <Space direction="vertical">
      <ConfigProvider locale={locale}>
        <RangePicker
          disabledDate={disabledDate}
          onChange={onChange}
          placeholder={["__.__.__", "__.__.__"]}
          format={dateFormat}
          defaultValue={
            defaultValue.length === 0
              ? ""
              : [
                  dayjs(defaultValue[0], dateFormat),
                  dayjs(defaultValue[1], dateFormat),
                ]
          }
          allowClear={false}
        />
      </ConfigProvider>
    </Space>
  );
}

export default DataPicker;
