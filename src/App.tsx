import Table from "./components/Table/Table";
import type { TableColumn, TableData } from "./components/Table/Table";
import { useState } from "react";
import { dummyColumns, dummyData } from "./helper";

const App = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns: TableColumn[] = dummyColumns;

  const data: TableData[] = dummyData;

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
