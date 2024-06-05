import React, { useState } from "react";
import { putSanPham } from "../../api/putAPI";
import { useDispatch } from "react-redux";

const SelectOptionComponent = ({
  item,
  listLoaiVo,
  title,
  headers,
}) => {
  const dispatch = useDispatch();
  const [loaiVo, setLoaiVo] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const handleDropDown = () => {
    setDropDown(!dropDown);
  };

  const handleSelectLoaiVo = (vo) => {
    const data = {
      ...item,
      loaiVoId: vo.loaiVoId,
      loaiVo: vo.loaiVoName,
    };
    setLoaiVo(item);
    handleDropDown();
    putSanPham(data, headers, dispatch);
  };
  return (
    <div style={{ position: "relative", minWidth: "80px" }}>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
          gap: "20px",
          height: "28px",
          padding: "3px",
          border: "1px solid #c0c0c0",
          borderRadius: "5px",
        }}
        onClick={handleDropDown}
      >
        <span>{loaiVo?.loaiVoName || title || "loại vỏ"}</span>
        <i className="fa-solid fa-angle-down"></i>
      </div>
      <ul
        style={{
          height: dropDown ? "auto" : 0,
          minWidth: "80px",
          overflow: "hidden",
          position: "absolute",
          top: "28px",
          right: 0,
          backgroundColor: "#f2f2f2",
          transition: "all 0.3s",
          zIndex: "9999",
        }}
      >
        {listLoaiVo?.map((vo, index) => {
          return (
            <li
              key={index}
              style={{
                margin: "10px",
                listStyle: "none",
                fontSize: "16px",
              }}
              onClick={() => handleSelectLoaiVo(vo)}
            >
              {vo.loaiVoName}
            </li>
          );
        })}
        <li
          style={{
            margin: "10px",
            listStyle: "none",
            fontSize: "16px",
          }}
          onClick={() =>
            handleSelectLoaiVo({ loaiVoName: "không", loaiVoId: null })
          }
        >
          {" "}
          không
        </li>
      </ul>
    </div>
  );
};

export default SelectOptionComponent;
