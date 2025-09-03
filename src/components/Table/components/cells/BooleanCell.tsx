import { Checkbox } from "antd";
import clsx from "clsx";

type Props = {
  value: boolean;
  editable: boolean;
  onUpdate: (value: boolean) => void;
};
const BooleanCell = ({ value, editable, onUpdate }: Props) => {
  const render = () => {
    if (editable) {
      return (
        <Checkbox
          checked={value}
          onChange={(e) => onUpdate(e.target.checked)}
        />
      );
    }
    return (
      <span
        className={clsx(
          "px-2 py-1 rounded-sm bg-gray-400 text-gray-700 text-sm",
          {
            "bg-green-500 text-white": value,
            "bg-red-500 text-white": !value,
          }
        )}
      >
        {value ? "Yes" : "No"}
      </span>
    );
  };
  return <>{render()}</>;
};

export default BooleanCell;
