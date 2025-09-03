import { Input } from "antd";
import clsx from "clsx";
import React, { useState } from "react";

type Props = {
  value: string;
  editable: boolean;
  onUpdate: (value: string) => void;
  search: string;
};
const DefaultCell: React.FC<Props> = ({
  value,
  editable,
  onUpdate,
  search,
}: Props) => {
  const [localValue, setLocalValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    if (!editable) return;
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  const handleBlur = () => {
    toggleEditing();
    onUpdate(localValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      toggleEditing();
      onUpdate(localValue);
    }
  };

  const highlightSearch = (value: string) => {
    if (!value || typeof value !== "string" || !search) return value;
    return value.replace(
      new RegExp(`(${search})`, "gi"),
      "<span class='bg-yellow-200'>$1</span>"
    );
  };

  return (
    <div>
      {isEditing ? (
        <Input
          value={localValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span
          onClick={toggleEditing}
          className={clsx("block w-full truncate text-left", {
            "cursor-pointer": editable,
          })}
          dangerouslySetInnerHTML={{
            __html: value ? highlightSearch(value) : "N/A",
          }}
        />
      )}
    </div>
  );
};

export default DefaultCell;
