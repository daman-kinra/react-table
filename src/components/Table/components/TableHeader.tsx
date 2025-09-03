import { Button, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import type { TableColumn } from "../Table";

type TableHeaderProps = {
  searchable: boolean;
  columns: TableColumn[];
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  showDeleteSelected: boolean;
  handleDeleteSelected: () => void;
};

const TableHeader: React.FC<TableHeaderProps> = ({
  searchable,
  columns,
  search,
  setSearch,
  showDeleteSelected,
  handleDeleteSelected,
}) => {
  const [localSearch, setLocalSearch] = useState<string>(search);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch(localSearch.trim());
    }, 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [localSearch]);

  return (
    <div className="w-full h-full border border-gray-200 bg-neutral-50 grid grid-cols-2 gap-4 p-4">
      <div className="col-span-1">
        {showDeleteSelected && (
          <Button type="primary" danger onClick={handleDeleteSelected}>
            Delete Selected
          </Button>
        )}
      </div>
      {searchable && (
        <div className="col-span-1">
          <Input
            value={localSearch}
            onChange={handleSearch}
            placeholder="Search"
            prefix={<FaSearch />}
            allowClear
          />
        </div>
      )}
    </div>
  );
};

export default TableHeader;
3;
