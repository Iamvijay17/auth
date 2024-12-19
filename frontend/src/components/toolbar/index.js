import { FilterOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input } from 'antd';
import React from 'react';
const { Search } = Input;

const Toolbar = ({ onChange, placeholder, handleMenuClick, items }) => {

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
    <div className="flex justify-end w-full p-4 gap-3">
      <Search className="w-[15rem]"  placeholder={placeholder ? placeholder : 'search'} onChange={handleSearchChange} allowClear enterButton />
      <Dropdown menu={menuProps}>
        <Button>
          <FilterOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default Toolbar;
