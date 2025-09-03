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
    <div className="w-full p-4 bg-white flex justify-end items-center">
      <PaginationAntd
        {...pagination}
        total={total}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
      />
    </div>
  );
};

export default Pagination;
