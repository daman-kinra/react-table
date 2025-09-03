import type { Meta, StoryObj } from "@storybook/react-vite";
import "./table.css";
import Table, {
  type TableColumn,
  type TableData,
} from "../components/Table/Table";

// Sample data for stories
const sampleColumns: TableColumn[] = [
  { key: "id", header: "ID", width: "80px" },
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role" },
  { key: "status", header: "Status" },
];

const sampleData: TableData[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "User",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "Moderator",
    status: "Active",
  },
];

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    bordered: {
      control: "boolean",
      description: "Whether to show borders around table cells",
    },
    striped: {
      control: "boolean",
      description: "Whether to show alternating row colors",
    },
    hoverable: {
      control: "boolean",
      description: "Whether to show hover effects on rows",
    },
    title: {
      control: "text",
      description: "Optional table title",
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default table story
export const Default: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
};

// Table with title
export const WithTitle: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    title: "User Management",
  },
};

// Bordered table
export const Bordered: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    bordered: true,
    title: "Bordered Table",
  },
};

// Striped table
export const Striped: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    striped: true,
    title: "Striped Table",
  },
};

// Hoverable table
export const Hoverable: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    hoverable: true,
    title: "Hoverable Table",
  },
};

// All features enabled
export const FullFeatured: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    bordered: true,
    striped: true,
    hoverable: true,
    title: "Full Featured Table",
  },
};

// Empty table
export const Empty: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    title: "Empty Table",
  },
};

// Single row
export const SingleRow: Story = {
  args: {
    columns: sampleColumns,
    data: [sampleData[0]],
    title: "Single Row Table",
  },
};

// Large dataset
export const LargeDataset: Story = {
  args: {
    columns: sampleColumns,
    data: [
      ...sampleData,
      {
        id: 5,
        name: "Charlie Wilson",
        email: "charlie.wilson@example.com",
        role: "User",
        status: "Active",
      },
      {
        id: 6,
        name: "Diana Prince",
        email: "diana.prince@example.com",
        role: "Admin",
        status: "Active",
      },
      {
        id: 7,
        name: "Eve Adams",
        email: "eve.adams@example.com",
        role: "User",
        status: "Inactive",
      },
      {
        id: 8,
        name: "Frank Miller",
        email: "frank.miller@example.com",
        role: "Moderator",
        status: "Active",
      },
    ],
    bordered: true,
    striped: true,
    hoverable: true,
    title: "Large Dataset Table",
  },
};
