import { FilterOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input } from "antd";
import React from "react";

const { Search } = Input;

const Toolbar = ({ onChange, placeholder, handleMenuClick, items, extraLeft }) => {

  const handleSearchChange = (e) => {
    if (onChange) {
      onChange(e.target.value);  // Passing the input value to the onChange handler
    }
  };

  const menuProps = {
    items,
    selectable: true,
    onClick: handleMenuClick
  };

  return (
    <div className="flex justify-between w-full p-4 gap-3">
      {extraLeft && <div className="flex items-center">{extraLeft}</div>}

      <div className="flex items-center gap-3">
        <Search
          className="w-[15rem]"
          placeholder={placeholder ? placeholder : "search"}
          onChange={handleSearchChange}
          allowClear
          enterButton
        />
        <Dropdown menu={menuProps}>
          <Button>
            <FilterOutlined />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Toolbar;
