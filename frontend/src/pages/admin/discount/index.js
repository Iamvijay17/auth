import { Tabs } from "antd";
import React from "react";
import DiscountTable from "./table";

const Discount = () => {
  const tabItems = [
    {
      label: "Discounts",
      key: "1",
      children: <DiscountTable />
    },
    {
      label: "Unused Discount",
      key: "2",
      children: <DiscountTable />
    }
  ];

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        type="card"
        style={{
          marginBottom: 32
        }}
        items={tabItems}
      />
    </div>
  );
};

export default Discount;
