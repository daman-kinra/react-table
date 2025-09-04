import type { Meta, StoryObj } from "@storybook/react-vite";
import Table, {
  type TableColumn,
  type TableData,
} from "../components/Table/Table";
import dayjs from "dayjs";
import React, { useState } from "react";
import "../index.css";
import { dummyData } from "../helper";
import { Tag } from "antd";

// Use dummy data from helper file
const sampleData: TableData[] = dummyData.map((item) => ({
  ...item,
  joinDate: dayjs(item.joinDate), // Convert ISO string to dayjs object
  hobbies: item.hobbies || [], // Ensure hobbies is always an array
}));

const basicColumns: TableColumn[] = [
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

// Wrapper component for pagination stories
const PaginationWrapper: React.FC<{
  columns: TableColumn[];
  data: TableData[];
  bordered?: boolean;
  searchable?: boolean;
  selectable?: boolean;
  initialPageSize?: number;
}> = ({
  columns,
  data,
  bordered,
  searchable,
  selectable,
  initialPageSize = 3,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size && size !== pageSize) {
      setPageSize(size);
      setCurrentPage(1); // Reset to first page when page size changes
    }
  };

  return React.createElement(Table, {
    columns,
    data,
    bordered,
    searchable,
    selectable,
    pagination: {
      page: currentPage,
      pageSize: pageSize,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total: number, range: [number, number]) =>
        `${range[0]}-${range[1]} of ${total} items`,
      onChange: handlePageChange,
      onShowSizeChange: handlePageChange,
    },
  });
};

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A comprehensive table component with sorting, filtering, pagination, and various cell types.",
      },
    },
  },
  argTypes: {
    loading: {
      control: "boolean",
      description: "Shows loading spinner overlay",
    },
    bordered: {
      control: "boolean",
      description: "Adds borders to table cells",
    },
    selectable: {
      control: "boolean",
      description: "Enables row selection with checkboxes",
    },
    editable: {
      control: "boolean",
      description: "Makes cells editable",
    },
    deletable: {
      control: "boolean",
      description: "Shows delete buttons for rows",
    },
    searchable: {
      control: "boolean",
      description: "Enables search functionality",
    },
    resizable: {
      control: "boolean",
      description: "Enables column resizing functionality",
    },
    headerSticky: {
      control: "boolean",
      description: "Makes table header sticky",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// Basic Table Story
export const Basic: Story = {
  args: {
    columns: [
      ...basicColumns,
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
              default:
                return "default";
            }
          };
          return (
            <Tag
              color={getColor(data.department as string)}
              className="!flex items-center gap-2 w-fit"
            >
              {data.department as string}
            </Tag>
          );
        },
      },
    ],
    data: sampleData,
    loading: false,
    bordered: false,
    selectable: false,
    editable: false,
    deletable: false,
    searchable: false,
    headerSticky: true,
  },
};

// Bordered Table
export const Bordered: Story = {
  args: {
    ...Basic.args,
    bordered: true,
  },
};

// Selectable Table
export const Selectable: Story = {
  args: {
    ...Basic.args,
    selectable: true,
  },
};

// Editable Table
export const Editable: Story = {
  args: {
    ...Basic.args,
    editable: true,
  },
};

// Deletable Table
export const Deletable: Story = {
  args: {
    ...Basic.args,
    deletable: true,
  },
};

// Searchable Table
export const Searchable: Story = {
  args: {
    ...Basic.args,
    searchable: true,
  },
};

// Table with All Features
export const FullFeatured: Story = {
  args: {
    ...Basic.args,
    bordered: true,
    selectable: true,
    editable: true,
    deletable: true,
    searchable: true,
    resizable: true,
  },
};

// Table with Different Cell Types
export const WithCellTypes: Story = {
  args: {
    columns: [
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
        key: "isActive",
        title: "Active",
        type: "boolean",
        sortable: true,
        filterable: true,
      },
      {
        key: "joinDate",
        title: "Join Date",
        type: "date",
        sortable: true,
        filterable: true,
      },
      {
        key: "website",
        title: "Website",
        type: "link",
        sortable: false,
        filterable: false,
        openInNewTab: true,
        showValueAsLinkIcon: false,
      },
    ],
    data: sampleData,
    bordered: true,
    editable: true,
    searchable: true,
  },
};

// Table with Hobbies and All Features
export const WithHobbies: Story = {
  args: {
    columns: [
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
      },
      {
        key: "department",
        title: "Department",
        type: "string",
        sortable: true,
        filterable: true,
      },
      {
        key: "hobbies",
        title: "Hobbies",
        type: "string",
        sortable: false,
        filterable: true,
        render: (data: TableData) => {
          const hobbies = data.hobbies as string[];
          return hobbies ? hobbies.join(", ") : "";
        },
      },
      {
        key: "isActive",
        title: "Active",
        type: "boolean",
        sortable: true,
        filterable: true,
      },
      {
        key: "joinDate",
        title: "Join Date",
        type: "date",
        sortable: true,
        filterable: true,
      },
      {
        key: "salary",
        title: "Salary",
        type: "number",
        sortable: true,
        filterable: true,
        render: (data: TableData) =>
          React.createElement(
            "span",
            {
              style: {
                color: (data.salary as number) > 100000 ? "green" : "blue",
                fontWeight: "bold",
              },
            },
            `$${(data.salary as number).toLocaleString()}`
          ),
      },
    ],
    data: sampleData,
    bordered: true,
    selectable: true,
    searchable: true,
    resizable: true,
  },
};

// Table with Pagination
export const WithPagination: Story = {
  render: (args) =>
    React.createElement(PaginationWrapper, {
      columns: args.columns,
      data: args.data,
      bordered: true,
      searchable: true,
    }),
  args: {
    ...Basic.args,
  },
};

// Loading State
export const Loading: Story = {
  args: {
    ...Basic.args,
    loading: true,
  },
};

// Empty State
export const Empty: Story = {
  args: {
    ...Basic.args,
    data: [],
  },
};

// Large Dataset
export const LargeDataset: Story = {
  render: (args) =>
    React.createElement(PaginationWrapper, {
      columns: args.columns,
      data: args.data,
      bordered: true,
      searchable: true,
      selectable: true,
      initialPageSize: 10,
    }),
  args: {
    ...Basic.args,
    data: sampleData, // Use the dummy data from helper file
  },
};

// Custom Render Function
export const WithCustomRender: Story = {
  args: {
    columns: [
      {
        key: "name",
        title: "Name",
        type: "string",
        sortable: true,
      },
      {
        key: "salary",
        title: "Salary",
        type: "number",
        sortable: true,
        render: (data: TableData) =>
          React.createElement(
            "span",
            {
              style: {
                color: (data.salary as number) > 70000 ? "green" : "red",
                fontWeight: "bold",
              },
            },
            `$${(data.salary as number).toLocaleString()}`
          ),
      },
      {
        key: "department",
        title: "Department",
        type: "string",
        sortable: true,
        render: (data: TableData) =>
          React.createElement(
            "span",
            {
              style: {
                backgroundColor:
                  data.department === "Engineering" ? "#e3f2fd" : "#f3e5f5",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "12px",
              },
            },
            String(data.department)
          ),
      },
    ],
    data: sampleData,
    bordered: true,
  },
};

// Resizable Columns Table
export const ResizableColumns: Story = {
  args: {
    ...Basic.args,
    bordered: true,
    resizable: true,
    columns: [
      {
        key: "name",
        title: "Name",
        type: "string",
        sortable: true,
        filterable: true,
        width: 150,
      },
      {
        key: "email",
        title: "Email Address",
        type: "string",
        sortable: true,
        filterable: true,
        width: 200,
      },
      {
        key: "age",
        title: "Age",
        type: "number",
        sortable: true,
        filterable: true,
        width: 80,
      },
      {
        key: "department",
        title: "Department",
        type: "string",
        sortable: true,
        filterable: true,
        width: 120,
      },
      {
        key: "salary",
        title: "Annual Salary",
        type: "number",
        sortable: true,
        filterable: true,
        width: 130,
      },
    ],
  },
};

// Table with Scroll
export const WithScroll: Story = {
  args: {
    ...Basic.args,
    bordered: true,
    scroll: {
      x: 800,
      y: 300,
    },
    data: sampleData.map((item) => ({
      ...item,
      longDescription:
        "This is a very long description that will cause horizontal scrolling when the table width is constrained.",
      additionalField1: "Extra Field 1",
      additionalField2: "Extra Field 2",
      additionalField3: "Extra Field 3",
    })),
    columns: [
      ...basicColumns,
      {
        key: "longDescription",
        title: "Long Description",
        type: "string",
        width: 200,
      },
      {
        key: "additionalField1",
        title: "Additional Field 1",
        type: "string",
      },
      {
        key: "additionalField2",
        title: "Additional Field 2",
        type: "string",
      },
      {
        key: "additionalField3",
        title: "Additional Field 3",
        type: "string",
      },
    ],
  },
};
