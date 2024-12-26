import { Input } from "antd";


const SettingsInput = ({placeholder, value, onChange, type}) => {
  return (
    <Input placeholder={placeholder} size="large" type={type ? type : "text"} allowClear value={value} onChange={onChange} />
  );
};




export { SettingsInput };

