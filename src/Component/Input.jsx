import { useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Input({
  width = "full",
  onFocus,
  onBlur,
  className,
  placeholder,
  onChange = (e) => {},
  value,
  type = "text",
  onKeypressEnter = (e) => {},
}) {
  const [Type, setType] = useState(type);

  const switchTypeInput = () => {
    setType(Type === "password" ? "text" : "password");
  };
  return (
    <div className={`w-${width} relative`}>
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        type={Type}
        className={` transition-all w-full reset p-4 focus:border-primary border-solid border-1 text-sm border-transparent bg-light-third dark:bg-dark-third ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={(e) => {
          if (e.keyCode === 13) {
            console.log("enter");
            onKeypressEnter();
          }
        }}
      ></input>
      {type === "password" && (
        <>
          {Type === "text" && (
            <VisibilityOffIcon
              onClick={switchTypeInput}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            ></VisibilityOffIcon>
          )}
          {Type === "password" && (
            <VisibilityIcon
              onClick={switchTypeInput}
              className="absolute a right-4 top-1/2 -translate-y-1/2"
            ></VisibilityIcon>
          )}
        </>
      )}
    </div>
  );
}

export default Input;
