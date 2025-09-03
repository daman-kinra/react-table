import { Button, Checkbox, Drawer, Form, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import type { TableColumn, TableFilters } from "../Table";

type TableHeaderProps = {
  searchable: boolean;
  columns: TableColumn[];
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  showDeleteSelected: boolean;
  setFilters: React.Dispatch<React.SetStateAction<TableFilters>>;
  filters: TableFilters;
  handleDeleteSelected: () => void;
};

const TableHeader: React.FC<TableHeaderProps> = ({
  searchable,
  columns,
  search,
  setSearch,
  showDeleteSelected,
  handleDeleteSelected,
  filters,
  setFilters,
}) => {
  const [localSearch, setLocalSearch] = useState<string>(search);
  const [showFilterSidebar, setShowFilterSidebar] = useState<boolean>(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isFilterable = columns.some((column) => column.filterable);

  const [form] = Form.useForm();

  const toggleFilterSidebar = () => {
    setShowFilterSidebar((prev) => !prev);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };

  const getFilterFormItem = (column: TableColumn) => {
    switch (column.type) {
      case "date":
        return null;
      case "boolean":
        return (
          <Form.Item
            key={column.key}
            name={column.key}
            valuePropName="checked"
            label={column.title}
            initialValue={filters[column.key]}
          >
            <Checkbox />
          </Form.Item>
        );
      default:
        return (
          <Form.Item
            layout="vertical"
            key={column.key}
            name={column.key}
            label={column.title}
            initialValue={filters[column.key]}
          >
            <Input />
          </Form.Item>
        );
    }
  };

  const handleApplyFilter = () => {
    const filterValues = form.getFieldsValue();
    setFilters(filterValues);
    toggleFilterSidebar();
  };
  const resetFilter = () => {
    form.resetFields();
    setFilters({});
    toggleFilterSidebar();
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
    <>
      <div className="w-full h-full border border-gray-200 bg-neutral-50 grid grid-cols-2 gap-4 p-4">
        <div className="col-span-1 flex items-center gap-2">
          {isFilterable && (
            <Button type="primary" onClick={toggleFilterSidebar}>
              Filter
            </Button>
          )}
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
      <Drawer
        open={showFilterSidebar}
        onClose={toggleFilterSidebar}
        title="Filters"
        placement="right"
        width="min(90%, 410px)"
      >
        <Form form={form}>
          {columns.map((column) => {
            if (column.filterable) {
              return getFilterFormItem(column);
            }
            return null;
          })}
          <div className="flex gap-2 justify-end items-center">
            <Button type="default" onClick={resetFilter}>
              Clear
            </Button>
            <Button type="primary" onClick={handleApplyFilter}>
              Apply
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
};

export default TableHeader;
