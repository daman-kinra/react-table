import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React from "react";

type Props = {
  value: Date;
  editable: boolean;
  onUpdate: (value: Dayjs) => void;
};

const format = "DD/MM/YYYY";
const DateCell: React.FC<Props> = ({ value, editable, onUpdate }) => {
  const render = () => {
    if (editable) {
      return (
        <DatePicker
          format={format}
          value={dayjs(value)}
          allowClear={false}
          onChange={(e) => {
            onUpdate(e);
          }}
        />
      );
    }
    return <span>{value ? dayjs(value).format(format) : "N/A"}</span>;
  };
  return <>{render()}</>;
};

export default DateCell;
