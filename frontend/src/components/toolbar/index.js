import { FilterOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input } from "antd";
import React from "react";

const { Search } = Input;

const Toolbar = ({ onChange, placeholder, handleMenuClick, items, extraLeft, extraRight, filter }) => {
  const handleSearchChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const menuProps = {
    items,
    selectable: true,
    onClick: handleMenuClick
  };

  return (
    <div className="flex flex-wrap items-center justify-between w-full gap-3 p-4 sm:gap-4 lg:gap-6">
      {extraLeft && <div className="flex items-center flex-wrap">{extraLeft}</div>}

      <div className="flex flex-wrap items-center gap-3 lg:gap-4 ml-auto">
        <Search
          className="w-full sm:w-[15rem] lg:w-[20rem]"
          placeholder={placeholder || "Search"}
          onChange={handleSearchChange}
          allowClear
          enterButton
        />

        {filter && (
          <Dropdown menu={menuProps}>
            <Button>
              <FilterOutlined />
            </Button>
          </Dropdown>
        )}

        {extraRight && <div className="flex items-center">{extraRight}</div>}
      </div>
    </div>
  );
};

export default Toolbar;
