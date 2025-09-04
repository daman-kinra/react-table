import React from "react";
import {
  Pagination as PaginationAntd,
  type PaginationProps as PaginationPropsAntd,
} from "antd";

type PaginationProps = {
  pagination: PaginationPropsAntd;
  total: number;
};

const Pagination: React.FC<PaginationProps> = ({ pagination, total }) => {
  return (
    <div className="w-full min-h-fit p-4 bg-white flex justify-end items-center border border-solid border-gray-200 rounded-b-md">
      <PaginationAntd
        {...pagination}
        className="w-full"
        responsive
        total={total}
        showTotal={(total, range) => (
          <span className="text-sm block text-gray-500 truncate w-16 md:w-full">{`${range[0]}-${range[1]} of ${total} items`}</span>
        )}
      />
    </div>
  );
};

export default Pagination;
