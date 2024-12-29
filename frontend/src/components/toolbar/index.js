import { FilterOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input } from "antd";
import React from "react";

const { Search } = Input;

const Toolbar = ({ onChange, placeholder, handleMenuClick, items, extraLeft, extraRight }) => {

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
      {/* Render extraLeft if it is passed */}
      {extraLeft && <div className="flex items-center">{extraLeft}</div>}

      {/* This div will push the content to the right */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Search Input */}
        <Search
          className="w-[15rem]"
          placeholder={placeholder || "Search"}
          onChange={handleSearchChange}
          allowClear
          enterButton
        />
        
        {/* Filter Dropdown */}
        <Dropdown menu={menuProps}>
          <Button>
            <FilterOutlined />
          </Button>
        </Dropdown>

        {extraRight && <div>{extraRight}</div>}

      </div>
    </div>
  );
};

export default Toolbar;
