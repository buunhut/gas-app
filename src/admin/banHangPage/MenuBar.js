import React from "react";

const MenuBar = ({ handleSelectMenu, giaoDich }) => {
  return (
    <div className="flex menu">
      <button
        className="btn"
        name="đổi"
        style={{
          backgroundColor: giaoDich === "đổi" ? "#009900" : "",
        }}
        onClick={handleSelectMenu}
      >
        Đổi
      </button>
      <button
        className="btn"
        name="bán"
        style={{
          backgroundColor: giaoDich === "bán" ? "#009900" : "",
        }}
        onClick={handleSelectMenu}
      >
        Bán
      </button>
      <button
        className="btn "
        name="bán vỏ"
        style={{
          backgroundColor: giaoDich === "bán vỏ" ? "#009900" : "",
        }}
        onClick={handleSelectMenu}
      >
        Bán vỏ
      </button>
    </div>
  );
};

export default MenuBar;
