import React from "react";

const UnreadIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 24}
      height={props.height || 24}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="gray"
        fillRule="evenodd"
        d="M16.53 6.47a.75.75 0 010 1.06l-10 10a.75.75 0 01-1.06 0l-4-4a.75.75 0 111.06-1.06L6 15.94l9.47-9.47a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06l-10 10a.75.75 0 01-1.06 0l-1.5-1.5a.75.75 0 111.06-1.06l.97.97 9.47-9.47a.75.75 0 011.06 0z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default UnreadIcon;
