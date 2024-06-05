import React from "react";
import "./timkiem.scss";
import { useDispatch, useSelector } from "react-redux";

const TimKiem = ({ postTimKiem, placeholder }) => {
  const dispatch = useDispatch();
  const { headers } = useSelector((state) => state.dataSlice);

  const handleTimKiem = (e) => {
    const keyword = e.target.value.trim();
    const data = { keyword };
    postTimKiem(data, headers, dispatch);
  };

  return (
    <div className="timKiemWrap">
      <div className="timKiem">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder={placeholder} onChange={handleTimKiem} />
      </div>
    </div>
  );
};

export default TimKiem;
