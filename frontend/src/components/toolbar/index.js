import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const Toolbar = ({ onChange, placeholder }) => {

  const handleSearchChange = (e) => {
    if (onChange) {
      onChange(e.target.value);  // Passing the input value to the onChange handler
    }
  };

  return (
    <div className="flex justify-end w-full p-4">
      <Search className="w-[15rem]"  placeholder={placeholder ? placeholder : 'search'} onChange={handleSearchChange} allowClear enterButton />
    </div>
  );
};

export default Toolbar;
