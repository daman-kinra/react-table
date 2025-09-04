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
import isEmpty from "lodash/isEmpty";

export type TableColumn = {
  key: string;
  title: string;
  width?: number;
  type?: "string" | "number" | "boolean" | "date" | "link";
  sortable?: boolean;
  link?: string; // Only for link type
  openInNewTab?: boolean; // Only for link type
  showValueAsLinkIcon?: boolean; // Only for link type
  filterable?: boolean;
  isHidden?: boolean;
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

export type TableFilters = {
  [key: string]: string | boolean | [Dayjs, Dayjs];
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
  const [filters, setFilters] = useState<TableFilters>({});
  const [localColumns, setLocalColumns] = useState<TableColumn[]>(
    columns?.map((column) => ({ ...column, isHidden: false }))
  );
  const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>(
    {}
  );

  // Initialize column widths from column definitions
  useEffect(() => {
    const initialWidths: { [key: string]: number } = {};
    columns.forEach((column) => {
      if (column.width) {
        initialWidths[column.key] = column.width;
      }
    });
    setColumnWidths(initialWidths);
  }, [columns]);

  const handleResizeStart = (e: React.MouseEvent, columnKey: string) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startWidth = columnWidths[columnKey] || 150;

    const handleResizeMove = (e: MouseEvent) => {
      e.stopPropagation();

      const deltaX = e.clientX - startX;
      const newWidth = Math.max(50, startWidth + deltaX); // Minimum width of 50px

      setColumnWidths((prev) => ({
        ...prev,
        [columnKey]: newWidth,
      }));
    };

    const handleResizeEnd = (e: MouseEvent) => {
      e.stopPropagation();

      // Remove global event listeners
      document.removeEventListener("mousemove", handleResizeMove);
      document.removeEventListener("mouseup", handleResizeEnd);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    // Add global event listeners
    document.addEventListener("mousemove", handleResizeMove);
    document.addEventListener("mouseup", handleResizeEnd);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const getColumnWidth = (column: TableColumn): number => {
    return columnWidths[column.key] || column.width || 150;
  };

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

  const getTableDataToRender = (filteredTableDataArgs: TableData[]) => {
    if (filteredTableDataArgs.length === 0) return [];
    let tableDataToRender = [...filteredTableDataArgs];

    if (sortColumn && sortDirection) {
      tableDataToRender = orderBy(tableDataToRender, sortColumn, sortDirection);
    }
    if (Object.keys(filters).length > 0) {
      tableDataToRender = tableDataToRender.filter((d) => {
        const matches: boolean[] = [];
        Object.keys(filters).forEach((key) => {
          const filterValue = filters[key];
          const dValue = d[key];
          if (typeof filterValue === "boolean" && typeof dValue === "boolean") {
            matches.push(filterValue === dValue);
          }
          if (typeof filterValue === "string" && typeof dValue === "string") {
            matches.push(
              dValue
                .toLowerCase()
                .trim()
                .includes(filterValue.toLowerCase().trim())
            );
          }
          if (typeof filterValue === "string" && typeof dValue === "number") {
            matches.push(
              dValue
                .toString()
                .includes(filterValue.toString().toLowerCase().trim())
            );
          }
        });
        return matches.every((match) => match === true);
      });
    }

    if (pagination?.page && pagination?.pageSize) {
      const start = (pagination?.page - 1) * (pagination?.pageSize || 0);
      const end = pagination?.page * (pagination?.pageSize || 0);
      tableDataToRender = tableDataToRender.slice(start, end);
    } else {
      tableDataToRender = [...tableDataToRender];
    }
    return tableDataToRender;
  };

  const renderTable = () => {
    const tableDataToRender = getTableDataToRender(filteredTableData);
    if (isEmpty(tableDataToRender)) {
      return (
        <div className="w-full h-full flex justify-center items-center border border-solid border-gray-200 py-10">
          <Empty description="No data" />
        </div>
      );
    }
    return (
      <table
        className={clsx("min-w-full h-fit", {
          "border border-solid border-gray-200": bordered,
        })}
      >
        <thead
          className={clsx("bg-gray-100", {
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
            {localColumns.map((column) => {
              if (column.isHidden) return null;
              const columnWidth = getColumnWidth(column);
              return (
                <th
                  key={column.key}
                  className={clsx(
                    "px-6 py-3 text-left text-base font-semibold text-gray-700 tracking-wider whitespace-nowrap group relative",
                    {
                      "border-l border-solid border-gray-200": bordered,
                      "cursor-pointer": column.sortable,
                    }
                  )}
                  onClick={() => {
                    if (column.sortable) {
                      handleSort(column);
                    }
                  }}
                  style={{
                    width: `${columnWidth}px`,
                    maxWidth: `${columnWidth}px`,
                    minWidth: `${columnWidth}px`,
                  }}
                >
                  <div className="flex justify-between items-center gap-2">
                    {column.title}
                    {column.sortable && (
                      <>
                        {(!sortDirection || sortColumn !== column.key) && (
                          <FaSort className="text-gray-300 group-hover:text-blue-500 transition-all" />
                        )}
                        {sortColumn === column.key &&
                          sortDirection === "asc" && (
                            <FaSortUp className="text-blue-500" />
                          )}
                        {sortColumn === column.key &&
                          sortDirection === "desc" && (
                            <FaSortDown className="text-blue-500" />
                          )}
                      </>
                    )}
                  </div>
                  {resizable && (
                    <div
                      className="absolute top-0 right-0 w-4 h-full cursor-col-resize hover:bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      onMouseDown={(e) => handleResizeStart(e, column.key)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                </th>
              );
            })}
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
              {localColumns.map((column) => {
                if (column.isHidden) return null;
                const columnWidth = getColumnWidth(column);
                return (
                  <td
                    key={column.key}
                    className={clsx("px-6 py-4", {
                      "border-l border-solid border-gray-200": bordered,
                    })}
                    style={{
                      width: `${columnWidth}px`,
                      maxWidth: `${columnWidth}px`,
                      minWidth: `${columnWidth}px`,
                    }}
                  >
                    {renderCell(column, row)}
                  </td>
                );
              })}
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
    const filteredData = filteredTableData.map((d) => {
      if (!d) return null;
      for (const key in d) {
        if (typeof d[key] !== "string") {
          continue;
        }
        if (
          d[key].toString().toLowerCase().includes(search.toLowerCase()?.trim())
        ) {
          return d;
        }
      }
      return null;
    });
    console.log(filteredData);
    setFilteredTableData(filteredData.filter((d) => d !== null));
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

  // Cleanup event listeners on unmount
  useEffect(() => {
    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, []);

  return (
    <div className="w-full h-full">
      <TableHeader
        searchable={searchable}
        setFilters={setFilters}
        filters={filters}
        localColumns={localColumns}
        setLocalColumns={setLocalColumns}
        setSearch={setSearch}
        search={search}
        showDeleteSelected={deletable && selectedRows.size > 0}
        handleDeleteSelected={handleDeleteSelected}
      />
      <div
        className={clsx(
          "w-full max-w-screen max-h-screen h-full overflow-y-auto",
          {
            "overflow-x-auto": scroll?.x,
            "overflow-y-auto": scroll?.y,
          }
        )}
      >
        <div
          className="w-full h-full relative z-0"
          style={{
            minWidth: 1000,
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
