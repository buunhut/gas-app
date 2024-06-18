import React, { useState } from "react";
import "./timkiem.scss";
import { useDispatch, useSelector } from "react-redux";

const TimKiem = ({ postTimKiem, placeholder }) => {
  const dispatch = useDispatch();
  const { headers } = useSelector((state) => state.dataSlice);

  const [keyword, setKeyword] = useState("");

  const handleTimKiem = (e) => {
    setKeyword(e.target.value);
    const data = { keyword: e.target.value.trim() };
    postTimKiem(data, headers, dispatch);
  };

  return (
    <div className="timKiemWrap">
      <div className="timKiem">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          value={keyword || ""}
          placeholder={placeholder}
          onChange={handleTimKiem}
        />
      </div>
    </div>
  );
};

export default TimKiem;
