import { Tabs } from "antd";
import React from "react";
import DiscountTable from "./table";
import EmptyPage from "../../../components/empty";

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
      children: <EmptyPage status={"underconstruction"}/>
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
