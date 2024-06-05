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
        name="mua"
        style={{
          backgroundColor: giaoDich === "mua" ? "#009900" : "",
        }}
        onClick={handleSelectMenu}
      >
        Mua
      </button>
      <button
        className="btn "
        name="mua vỏ"
        style={{
          backgroundColor: giaoDich === "mua vỏ" ? "#009900" : "",
        }}
        onClick={handleSelectMenu}
      >
        Mua vỏ
      </button>
    </div>
  );
};

export default MenuBar;
