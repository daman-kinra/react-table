import type { Meta, StoryObj } from "@storybook/react-vite";
import Table, {
  type TableColumn,
  type TableData,
} from "../components/Table/Table";
import dayjs from "dayjs";
import React, { useState } from "react";
import "./table.css";

// Sample data for stories
const sampleData: TableData[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    age: 28,
    isActive: true,
    joinDate: dayjs("2023-01-15"),
    department: "Engineering",
    salary: 75000,
    website: "https://johndoe.dev",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    age: 32,
    isActive: false,
    joinDate: dayjs("2022-08-20"),
    department: "Marketing",
    salary: 65000,
    website: "https://janesmith.com",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    age: 45,
    isActive: true,
    joinDate: dayjs("2021-03-10"),
    department: "Sales",
    salary: 80000,
    website: "https://bobjohnson.net",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    age: 29,
    isActive: true,
    joinDate: dayjs("2023-06-05"),
    department: "Engineering",
    salary: 72000,
    website: "https://alicebrown.io",
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    age: 38,
    isActive: false,
    joinDate: dayjs("2020-11-12"),
    department: "HR",
    salary: 58000,
    website: "https://charliewilson.co",
  },
];

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
  },
  {
    key: "department",
    title: "Department",
    type: "string",
    sortable: true,
    filterable: true,
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
    columns: basicColumns,
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
    data: Array.from({ length: 100 }, (_, index) => ({
      id: `${index + 1}`,
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
      age: 20 + (index % 40),
      isActive: index % 3 === 0,
      joinDate: dayjs().subtract(index, "days"),
      department: ["Engineering", "Marketing", "Sales", "HR"][index % 4],
      salary: 50000 + index * 1000,
      website: `https://user${index + 1}.com`,
    })),
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
