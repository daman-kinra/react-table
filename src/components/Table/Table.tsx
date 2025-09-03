import clsx from "clsx";
import React, { useEffect, useState } from "react";
import LinkCell from "./components/cells/LinkCell";
import DefaultCell from "./components/cells/DefaultCell";
import BooleanCell from "./components/cells/BooleanCell";
import DateCell from "./components/cells/DateCell";
import TableHeader from "./components/TableHeader";
import type { Dayjs } from "dayjs";
import { Button, Checkbox, Empty, Spin, type PaginationProps } from "antd";
import Pagination from "./components/Pagination";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import orderBy from "lodash/orderBy";

export type TableColumn = {
  key: string;
  title: string;
  width?: number;
  type?: "string" | "number" | "boolean" | "date" | "link";
  sortable?: boolean;
  link?: string; // Only for link type
  openInNewTab?: boolean; // Only for link type
  showValueAsLinkIcon?: boolean; // Only for link type
  render?: (data: TableData) => React.ReactNode;
};

export type TableData = {
  [key: string]: string | number | boolean | Dayjs;
};

export type TableScroll = {
  x?: number;
  y?: number;
};

export type TableProps = {
  columns: TableColumn[];
  data: TableData[];
  loading?: boolean;
  title?: string;
  headerSticky?: boolean;
  bordered?: boolean;
  deletable?: boolean;
  editable?: boolean;
  selectable?: boolean;
  searchable?: boolean;
  resizable?: boolean;
  pagination?: PaginationProps & {
    page: number;
  };
  scroll?: TableScroll;
};

const Table: React.FC<TableProps> = ({
  columns,
  data,
  loading = false,
  headerSticky = true,
  bordered = false,
  deletable = false,
  editable = false,
  selectable = false,
  searchable = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resizable = false,
  pagination,
  scroll,
}) => {
  const [tableData, setTableData] = useState<TableData[]>(data);
  const [filteredTableData, setFilteredTableData] = useState<TableData[]>(data);
  const [search, setSearch] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );

  const handleCellUpdate = (
    column: TableColumn,
    row: TableData,
    value: string | boolean | Dayjs
  ) => {
    const newTableData = tableData.map((d) => {
      console.log(value);
      if (d.id === row.id) {
        return { ...d, [column.key]: value } as TableData;
      }
      return d;
    });
    const newFilteredTableData = filteredTableData.map((d) => {
      if (d.id === row.id) {
        return { ...d, [column.key]: value } as TableData;
      }
      return d;
    });
    setTableData(newTableData);
    setFilteredTableData(newFilteredTableData);
  };

  const handleDelete = (row: TableData) => {
    const newTableData = tableData.filter((d) => d.id !== row.id);
    const newFilteredTableData = filteredTableData.filter(
      (d) => d.id !== row.id
    );
    const newSelectedRows = new Set(selectedRows);
    newSelectedRows.delete(row.id as string);
    setSelectedRows(newSelectedRows);
    setTableData(newTableData);
    setFilteredTableData(newFilteredTableData);
  };
  const handleDeleteSelected = () => {
    const newTableData = tableData.filter(
      (d) => !selectedRows.has(d.id as string)
    );
    const newFilteredTableData = filteredTableData.filter(
      (d) => !selectedRows.has(d.id as string)
    );
    const newSelectedRows = new Set(selectedRows);
    newSelectedRows.clear();
    setTableData(newTableData);
    setFilteredTableData(newFilteredTableData);
    setSelectedRows(newSelectedRows);
  };

  const toggleRowSelect = (row: TableData) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(row.id as string)) {
      newSelectedRows.delete(row.id as string);
    } else {
      newSelectedRows.add(row.id as string);
    }
    setSelectedRows(newSelectedRows);
  };

  const toggleAllRowsSelect = () => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.size === tableData.length) {
      newSelectedRows.clear();
    } else {
      tableData.forEach((row) => newSelectedRows.add(row.id as string));
    }
    setSelectedRows(newSelectedRows);
  };

  const handleSort = (column: TableColumn) => {
    setSortColumn(column.key);
    if (sortDirection === "asc") {
      setSortDirection("desc");
    } else if (sortDirection === "desc") {
      setSortDirection(null);
    } else {
      setSortDirection("asc");
    }
  };

  const isAllSelected = selectedRows.size === tableData.length;
  const isIndeterminate = selectedRows.size > 0 && !isAllSelected;

  const renderCell = (column: TableColumn, row: TableData): React.ReactNode => {
    if (column.render) {
      return column.render(row);
    }
    switch (column.type) {
      case "boolean":
        return (
          <BooleanCell
            value={row[column.key] as boolean}
            editable={editable}
            onUpdate={(value) => handleCellUpdate(column, row, value)}
          />
        );
      case "date":
        return (
          <DateCell
            value={row[column.key] as Dayjs}
            editable={editable}
            onUpdate={(value) => handleCellUpdate(column, row, value as Dayjs)}
          />
        );
      case "link":
        return (
          <LinkCell
            link={row.link as string}
            value={row[column.key] as string}
            openInNewTab={column.openInNewTab}
            showValueAsLinkIcon={column.showValueAsLinkIcon}
          />
        );
      default:
        return (
          <DefaultCell
            search={search}
            value={row[column.key] as string}
            editable={editable}
            onUpdate={(value) => handleCellUpdate(column, row, value)}
          />
        );
    }
  };

  const renderTable = () => {
    let tableDataToRender = filteredTableData;
    if (filteredTableData.length === 0) {
      return (
        <div className="w-full h-full flex justify-center items-center border border-solid border-gray-200 py-10">
          <Empty description="No data" />
        </div>
      );
    }
    if (pagination?.page && pagination?.pageSize) {
      const start = (pagination?.page - 1) * (pagination?.pageSize || 0);
      const end = pagination?.page * (pagination?.pageSize || 0);
      tableDataToRender = filteredTableData.slice(start, end);
    } else {
      tableDataToRender = filteredTableData;
    }
    if (sortColumn && sortDirection) {
      tableDataToRender = orderBy(tableDataToRender, sortColumn, sortDirection);
    }

    return (
      <table
        className={clsx("min-w-full h-fit", {
          "border border-solid border-gray-200": bordered,
        })}
      >
        <thead
          className={clsx("bg-gray-50", {
            "sticky top-0 z-10": headerSticky,
          })}
        >
          <tr>
            {selectable && (
              <th
                style={{
                  width: "50px",
                }}
              >
                <Checkbox
                  indeterminate={isIndeterminate}
                  checked={isAllSelected}
                  onChange={toggleAllRowsSelect}
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className={clsx(
                  "px-6 py-3 text-left text-base font-semibold text-gray-700 tracking-wider whitespace-nowrap cursor-pointer group",
                  {
                    "border-l border-solid border-gray-200": bordered,
                  }
                )}
                onClick={() => handleSort(column)}
                style={{
                  width: column.width ? `${column.width}px` : "unset",
                  maxWidth: column.width ? `${column.width}px` : "unset",
                }}
              >
                <div className="flex justify-between items-center gap-2">
                  {column.title}
                  {column.sortable && (
                    <>
                      {(!sortDirection || sortColumn !== column.key) && (
                        <FaSort className="text-gray-300 group-hover:text-blue-500 transition-all" />
                      )}
                      {sortColumn === column.key && sortDirection === "asc" && (
                        <FaSortUp className="text-blue-500" />
                      )}
                      {sortColumn === column.key &&
                        sortDirection === "desc" && (
                          <FaSortDown className="text-blue-500" />
                        )}
                    </>
                  )}
                </div>
              </th>
            ))}
            {deletable && <th>Actions</th>}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableDataToRender.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {selectable && (
                <th
                  style={{
                    width: "50px",
                  }}
                >
                  <Checkbox
                    checked={selectedRows.has(row.id as string)}
                    onChange={() => toggleRowSelect(row)}
                  />
                </th>
              )}
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={clsx("px-6 py-4", {
                    "border-l border-solid border-gray-200": bordered,
                  })}
                  style={{
                    width: column.width ? `${column.width}px` : "unset",
                    maxWidth: column.width ? `${column.width}px` : "unset",
                  }}
                >
                  {renderCell(column, row)}
                </td>
              ))}
              {deletable && (
                <td
                  className={clsx("px-6 py-4", {
                    "border-l border-solid border-gray-200": bordered,
                  })}
                  style={{
                    width: "100px",
                  }}
                >
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleDelete(row)}
                  >
                    Delete
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  const renderLoading = () => {
    if (!loading) return null;
    return (
      <div className="absolute inset-0 flex justify-center items-center backdrop-blur-xs z-10 border border-solid border-gray-200">
        <Spin />
      </div>
    );
  };

  const handleSearch = () => {
    const filteredData = tableData.filter((d) => {
      for (const key in d) {
        if (typeof d[key] !== "string") {
          continue;
        }

        if (
          d[key].toString().toLowerCase().includes(search.toLowerCase()?.trim())
        ) {
          return true;
        }
      }
      return false;
    });
    setFilteredTableData(filteredData);
  };

  useEffect(() => {
    if (search === "") {
      setFilteredTableData(tableData);
      return;
    }
    handleSearch();
  }, [search, tableData]);

  useEffect(() => {
    setTableData(tableData);
  }, [tableData]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <div className="w-full h-full">
      <TableHeader
        searchable={searchable}
        columns={columns}
        setSearch={setSearch}
        search={search}
        showDeleteSelected={deletable && selectedRows.size > 0}
        handleDeleteSelected={handleDeleteSelected}
      />
      <div
        className={clsx("w-full h-full max-w-screen max-h-screen", {
          "overflow-x-auto": scroll?.x,
          "overflow-y-auto": scroll?.y,
        })}
      >
        <div
          className="w-full h-full relative z-0"
          style={{
            width: scroll?.x ? `${scroll?.x}px` : "unset",
            height: scroll?.y ? `${scroll?.y}px` : "unset",
          }}
        >
          {renderLoading()}
          {renderTable()}
        </div>
      </div>
      {pagination && (
        <Pagination pagination={pagination} total={filteredTableData.length} />
      )}
    </div>
  );
};

export default Table;
