import Table from "./components/Table/Table";
import type { TableColumn, TableData } from "./components/Table/Table";
import { useState } from "react";
import { dummyData } from "./helper";
import { Dropdown, Tag } from "antd";
import { FaChevronDown } from "react-icons/fa";
import clsx from "clsx";

const getDepartmentOptions = () => {
  const tempSet = new Set<string>();
  dummyData.forEach((item) => {
    tempSet.add(item.department);
  });
  return Array.from(tempSet).map((item) => ({
    label: item,
    value: item,
  }));
};

const App = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [tableData, setTableData] = useState<TableData[]>(
    dummyData.map((item) => ({
      ...item,
      hobbies: item.hobbies || [],
    }))
  );
  const columns: TableColumn[] = [
    {
      key: "name",
      title: "Name",
      type: "string",
      sortable: true,
      filterable: true,
    },
    {
      key: "email",
      title: "Email",
      type: "string",
      sortable: true,
      filterable: true,
    },
    {
      key: "age",
      title: "Age",
      type: "number",
      sortable: true,
      filterable: true,
      width: 100,
    },
    {
      key: "department",
      title: "Department",
      type: "string",
      sortable: true,
      filterable: true,
      render: (data: TableData) => {
        const getColor = (department: string) => {
          switch (department) {
            case "Engineering":
              return "orange";
            case "Marketing":
              return "blue";
            case "Sales":
              return "green";
            case "HR":
              return "red";
          }
        };
        return (
          <Dropdown
            popupRender={() => {
              return (
                <div className="flex flex-col-reverse gap-2 p-2 rounded-md shadow border border-solid border-gray-200 bg-neutral-50">
                  {dropdownOptions.map((option) => (
                    <div
                      key={String(Math.random())}
                      onClick={() => {
                        setTableData((prev) => {
                          const newTableData = prev.map((d) => {
                            if (d.id === data.id) {
                              return {
                                ...d,
                                department: option.value as string,
                              };
                            }
                            return d;
                          });
                          return newTableData;
                        });
                      }}
                      className={clsx(
                        "w-full flex justify-start hover:bg-gray-200 px-4 py-1 rounded-md cursor-pointer transition-all",
                        {
                          "bg-gray-200": data.department === option.value,
                        }
                      )}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              );
            }}
          >
            <Tag
              color={getColor(data.department as string)}
              className="!flex items-center gap-2 cursor-pointer w-fit"
            >
              {data.department as string}
              <FaChevronDown className="text-xs" />
            </Tag>
          </Dropdown>
        );
      },
    },
    {
      key: "hobbies",
      title: "Hobbies",
      type: "string",
      width: 200,
      render: (data: TableData) => {
        return (
          <div className="flex flex-wrap gap-1">
            {(Array.isArray(data.hobbies) ? data.hobbies : []).map(
              (hobby: string) => (
                <Tag color="cyan" key={hobby}>
                  {hobby}
                </Tag>
              )
            )}
          </div>
        );
      },
    },
    {
      key: "salary",
      title: "Salary",
      type: "number",
      sortable: true,
      filterable: true,
    },
  ];

  const dropdownOptions = getDepartmentOptions();

  return (
    <div className="bg-amber-100 min-h-screen w-screen h-fit p-8">
      <div className="max-w-6xl h-full mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          React Table Component
        </h1>
        <Table
          columns={columns}
          data={tableData}
          loading={false}
          bordered={true}
          editable={true}
          deletable={true}
          searchable={true}
          selectable={true}
          resizable={true}
          scroll={{ x: 1500, y: 500 }}
          pagination={{
            page: page,
            pageSize: pageSize,
            pageSizeOptions: [10, 25, 50, 100],
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
        />
      </div>
    </div>
  );
};

export default App;
