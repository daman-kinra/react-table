import dayjs from "dayjs";
import Table from "./components/Table/Table";
import type { TableColumn, TableData } from "./components/Table/Table";
import { useState } from "react";

const App = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns: TableColumn[] = [
    { key: "id", title: "ID", sortable: true },
    { key: "name", title: "Name" },
    { key: "email", title: "Email", sortable: true },
    { key: "active", title: "Active", type: "boolean", sortable: true },
    { key: "createdAt", title: "Created At", type: "date", sortable: true },
  ];

  const data: TableData[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      active: true,
      createdAt: dayjs("2021-01-01"),
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      active: false,
      createdAt: dayjs("2021-01-02"),
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      active: true,
      createdAt: dayjs("2021-01-03"),
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice.brown@example.com",
      active: false,
      createdAt: dayjs("2021-01-04"),
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie.wilson@example.com",
      active: true,
      createdAt: dayjs("2021-01-05"),
    },
    {
      id: 6,
      name: "Diana Prince",
      email: "diana.prince@example.com",
      active: false,
      createdAt: dayjs("2021-01-06"),
    },
    {
      id: 7,
      name: "Eve Adams",
      email: "eve.adams@example.com",
      active: true,
      createdAt: dayjs("2021-01-07"),
    },
    {
      id: 8,
      name: "Frank Miller",
      email: "frank.miller@example.com",
      active: false,
      createdAt: dayjs("2021-01-08"),
    },
    {
      id: 9,
      name: "Grace Hopper",
      email: "grace.hopper@example.com",
      active: true,
      createdAt: dayjs("2021-01-09"),
    },
    {
      id: 10,
      name: "Hannah Arendt",
      email: "hannah.arendt@example.com",
      active: false,
      createdAt: dayjs("2021-01-10"),
    },
    {
      id: 11,
      name: "Isaac Newton",
      email: "isaac.newton@example.com",
      active: true,
      createdAt: dayjs("2021-01-11"),
    },
    {
      id: 12,
      name: "Marie Curie",
      email: "marie.curie@example.com",
      active: false,
      createdAt: dayjs("2021-01-12"),
    },
    {
      id: 13,
      name: "Nikola Tesla",
      email: "nikola.tesla@example.com",
      active: true,
      createdAt: dayjs("2021-01-13"),
    },
    {
      id: 14,
      name: "Ada Lovelace",
      email: "ada.lovelace@example.com",
      active: false,
      createdAt: dayjs("2021-01-14"),
    },
    {
      id: 15,
      name: "Alan Turing",
      email: "alan.turing@example.com",
      active: true,
      createdAt: dayjs("2021-01-15"),
    },
    {
      id: 16,
      name: "Rosalind Franklin",
      email: "rosalind.franklin@example.com",
      active: false,
      createdAt: dayjs("2021-01-16"),
    },
    {
      id: 17,
      name: "Galileo Galilei",
      email: "galileo.galilei@example.com",
      active: true,
      createdAt: dayjs("2021-01-17"),
    },
    {
      id: 18,
      name: "Carl Sagan",
      email: "carl.sagan@example.com",
      active: false,
      createdAt: dayjs("2021-01-18"),
    },
    {
      id: 19,
      name: "Richard Feynman",
      email: "richard.feynman@example.com",
      active: true,
      createdAt: dayjs("2021-01-19"),
    },
    {
      id: 20,
      name: "Katherine Johnson",
      email: "katherine.johnson@example.com",
      active: false,
      createdAt: dayjs("2021-01-20"),
    },
    {
      id: 21,
      name: "Stephen Hawking",
      email: "stephen.hawking@example.com",
      active: true,
      createdAt: dayjs("2021-01-21"),
    },
    {
      id: 22,
      name: "Hypatia Alexandria",
      email: "hypatia.alexandria@example.com",
      active: false,
      createdAt: dayjs("2021-01-22"),
    },
    {
      id: 23,
      name: "Tim Berners-Lee",
      email: "tim.berners@example.com",
      active: true,
      createdAt: dayjs("2021-01-23"),
    },
    {
      id: 24,
      name: "Margaret Hamilton",
      email: "margaret.hamilton@example.com",
      active: false,
      createdAt: dayjs("2021-01-24"),
    },
    {
      id: 25,
      name: "Niels Bohr",
      email: "niels.bohr@example.com",
      active: true,
      createdAt: dayjs("2021-01-25"),
    },
    {
      id: 26,
      name: "Dorothy Vaughan",
      email: "dorothy.vaughan@example.com",
      active: false,
      createdAt: dayjs("2021-01-26"),
    },
    {
      id: 27,
      name: "James Clerk Maxwell",
      email: "james.maxwell@example.com",
      active: true,
      createdAt: dayjs("2021-01-27"),
    },
    {
      id: 28,
      name: "Barbara Liskov",
      email: "barbara.liskov@example.com",
      active: false,
      createdAt: dayjs("2021-01-28"),
    },
    {
      id: 29,
      name: "Enrico Fermi",
      email: "enrico.fermi@example.com",
      active: true,
      createdAt: dayjs("2021-01-29"),
    },
    {
      id: 30,
      name: "Chien-Shiung Wu",
      email: "chien.wu@example.com",
      active: false,
      createdAt: dayjs("2021-01-30"),
    },
    {
      id: 31,
      name: "Johannes Kepler",
      email: "johannes.kepler@example.com",
      active: true,
      createdAt: dayjs("2021-01-31"),
    },
    {
      id: 32,
      name: "Lise Meitner",
      email: "lise.meitner@example.com",
      active: false,
      createdAt: dayjs("2021-02-01"),
    },
    {
      id: 33,
      name: "Max Planck",
      email: "max.planck@example.com",
      active: true,
      createdAt: dayjs("2021-02-02"),
    },
    {
      id: 34,
      name: "Emmy Noether",
      email: "emmy.noether@example.com",
      active: false,
      createdAt: dayjs("2021-02-03"),
    },
    {
      id: 35,
      name: "Erwin Schrödinger",
      email: "erwin.schrodinger@example.com",
      active: true,
      createdAt: dayjs("2021-02-04"),
    },
    {
      id: 36,
      name: "Hedy Lamarr",
      email: "hedy.lamarr@example.com",
      active: false,
      createdAt: dayjs("2021-02-05"),
    },
    {
      id: 37,
      name: "Paul Dirac",
      email: "paul.dirac@example.com",
      active: true,
      createdAt: dayjs("2021-02-06"),
    },
    {
      id: 38,
      name: "Grace Murray",
      email: "grace.murray@example.com",
      active: false,
      createdAt: dayjs("2021-02-07"),
    },
    {
      id: 39,
      name: "Michael Faraday",
      email: "michael.faraday@example.com",
      active: true,
      createdAt: dayjs("2021-02-08"),
    },
    {
      id: 40,
      name: "Mary Anning",
      email: "mary.anning@example.com",
      active: false,
      createdAt: dayjs("2021-02-09"),
    },
    {
      id: 41,
      name: "Werner Heisenberg",
      email: "werner.heisenberg@example.com",
      active: true,
      createdAt: dayjs("2021-02-10"),
    },
    {
      id: 42,
      name: "Annie Cannon",
      email: "annie.cannon@example.com",
      active: false,
      createdAt: dayjs("2021-02-11"),
    },
    {
      id: 43,
      name: "Leonhard Euler",
      email: "leonhard.euler@example.com",
      active: true,
      createdAt: dayjs("2021-02-12"),
    },
    {
      id: 44,
      name: "Florence Nightingale",
      email: "florence.nightingale@example.com",
      active: false,
      createdAt: dayjs("2021-02-13"),
    },
    {
      id: 45,
      name: "Pierre Curie",
      email: "pierre.curie@example.com",
      active: true,
      createdAt: dayjs("2021-02-14"),
    },
    {
      id: 46,
      name: "Rachel Carson",
      email: "rachel.carson@example.com",
      active: false,
      createdAt: dayjs("2021-02-15"),
    },
    {
      id: 47,
      name: "Gregor Mendel",
      email: "gregor.mendel@example.com",
      active: true,
      createdAt: dayjs("2021-02-16"),
    },
    {
      id: 48,
      name: "Dorothy Hodgkin",
      email: "dorothy.hodgkin@example.com",
      active: false,
      createdAt: dayjs("2021-02-17"),
    },
    {
      id: 49,
      name: "Charles Darwin",
      email: "charles.darwin@example.com",
      active: true,
      createdAt: dayjs("2021-02-18"),
    },
    {
      id: 50,
      name: "Maria Mitchell",
      email: "maria.mitchell@example.com",
      active: false,
      createdAt: dayjs("2021-02-19"),
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen w-screen h-fit p-8">
      <div className="max-w-6xl h-full mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          React Table Component
        </h1>
        <Table
          columns={columns}
          data={data}
          loading={false}
          bordered={true}
          editable={true}
          deletable={true}
          searchable={true}
          selectable={true}
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
