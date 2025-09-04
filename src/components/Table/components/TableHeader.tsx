import {
  Button,
  Checkbox,
  Divider,
  Drawer,
  Dropdown,
  Form,
  Input,
  Tooltip,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FaFilter, FaSearch, FaTrash } from "react-icons/fa";
import type { TableColumn, TableFilters } from "../Table";
import { FaCircleInfo, FaTableColumns } from "react-icons/fa6";

type TableHeaderProps = {
  searchable: boolean;
  localColumns: TableColumn[];
  setLocalColumns: React.Dispatch<React.SetStateAction<TableColumn[]>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  showDeleteSelected: boolean;
  setFilters: React.Dispatch<React.SetStateAction<TableFilters>>;
  filters: TableFilters;
  handleDeleteSelected: () => void;
  rowsSelected: number;
  totalRows: number;
};

const TableHeader: React.FC<TableHeaderProps> = ({
  searchable,
  localColumns,
  setLocalColumns,
  search,
  setSearch,
  showDeleteSelected,
  handleDeleteSelected,
  rowsSelected,
  totalRows,
  filters,
  setFilters,
}) => {
  const [localSearch, setLocalSearch] = useState<string>(search);
  const [showFilterSidebar, setShowFilterSidebar] = useState<boolean>(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isFilterable = localColumns.some((column) => column.filterable);

  const [form] = Form.useForm();
  const [columnsForm] = Form.useForm();

  const toggleFilterSidebar = () => {
    setShowFilterSidebar((prev) => !prev);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
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

  const handleApplyColumnsVisibility = () => {
    const columnsVisibility = columnsForm.getFieldsValue();
    const newLocalColumns = localColumns.map((column) => ({
      ...column,
      isHidden: columnsVisibility[column.key],
    }));
    setLocalColumns(newLocalColumns);
  };
  const resetColumnsVisibility = () => {
    columnsForm.resetFields();
    const newLocalColumns = localColumns.map((column) => ({
      ...column,
      isHidden: false,
    }));
    setLocalColumns(newLocalColumns);
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
            className="!mb-2"
          >
            <Input />
          </Form.Item>
        );
    }
  };

  return (
    <>
      <div className="w-full h-full border border-gray-200 bg-neutral-50 grid grid-cols-2 gap-4 p-4 rounded-t-md">
        {searchable && (
          <div className="col-span-2 md:col-span-1">
            <Input
              value={localSearch}
              onChange={handleSearch}
              placeholder="Search"
              prefix={<FaSearch />}
              allowClear
            />
          </div>
        )}
        <div className="col-span-2 md:col-span-1 flex justify-end items-center gap-4 flex-wrap">
          {!showDeleteSelected && (
            <Dropdown
              placement="bottomRight"
              popupRender={() => (
                <div className="p-4 pr-6 bg-neutral-50 rounded-md shadow border border-solid border-gray-200">
                  <h3 className="text-base text-black font-semibold mb-4 flex items-center gap-2">
                    Show / Hide Columns
                    <Tooltip title="Selected Columns are hidden!">
                      <FaCircleInfo className="cursor-pointer text-blue-500" />
                    </Tooltip>
                  </h3>
                  <Form form={columnsForm}>
                    {localColumns.map((column) => {
                      return (
                        <Form.Item
                          key={column.key}
                          initialValue={column.isHidden}
                          name={column.key}
                          valuePropName="checked"
                          className="!mb-2"
                        >
                          <div className="flex items-center gap-2 w-full">
                            <Checkbox />
                            <span>{column.title}</span>
                          </div>
                        </Form.Item>
                      );
                    })}

                    <Divider className="!mt-2 !mb-4 bg-gray-200" />
                    <div className="flex gap-2 justify-center items-center">
                      <Button type="default" onClick={resetColumnsVisibility}>
                        Reset
                      </Button>
                      <Button
                        type="primary"
                        onClick={handleApplyColumnsVisibility}
                      >
                        Apply
                      </Button>
                    </div>
                  </Form>
                </div>
              )}
            >
              <FaTableColumns className="text-gray-500 hover:text-gray-700 transition-all cursor-pointer" />
            </Dropdown>
          )}

          {isFilterable && !showDeleteSelected && (
            <Tooltip title="Filter rows">
              <span>
                <FaFilter
                  className="text-gray-500 hover:text-gray-700 transition-all cursor-pointer"
                  onClick={toggleFilterSidebar}
                />
              </span>
            </Tooltip>
          )}

          {showDeleteSelected && (
            <div className="flex items-center gap-2">
              Rows Selected ({rowsSelected} of {totalRows})
              <Tooltip title="Delete selected rows">
                <span>
                  <FaTrash
                    className="text-red-500 cursor-pointer"
                    onClick={handleDeleteSelected}
                  />
                </span>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
      <Drawer
        open={showFilterSidebar}
        onClose={toggleFilterSidebar}
        title="Filters"
        placement="right"
        width="min(90%, 410px)"
      >
        <Form form={form}>
          {localColumns.map((column) => {
            if (column.filterable) {
              return getFilterFormItem(column);
            }
            return null;
          })}
          <div className="flex gap-2 justify-end items-center py-2">
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
