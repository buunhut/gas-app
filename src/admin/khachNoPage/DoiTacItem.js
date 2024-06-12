import React from "react";
import "./doitacitem.scss";
import { getRemainingString } from "../AdminPage";

const DoiTacItem = ({ doiTac, handleSelectDoiTac, indexItem, index }) => {
  const { tenDoiTac, soDienThoaiDoiTac, tongTienNo, tongVoNo } = doiTac;

  return (
    <div className="doiTacItemWrap">
      <div
        className="doiTacItem "
        style={{
          borderColor: indexItem === index ? "#009900" : "",
        }}
      >
        <div
          className="flex aic g10"
          onClick={() => handleSelectDoiTac(index, doiTac)}
        >
          <i className="fa-solid fa-user"></i>
          <h3 className="green">
            {tenDoiTac !== null
              ? getRemainingString(tenDoiTac?.toUpperCase(), 20)
              : ""}
          </h3>
        </div>
        <div className="flex aic g10">
          <i className="fa-solid fa-phone"></i>
          <p className="silver bold">
            <a href={`tel:+${soDienThoaiDoiTac}`} className="silver">
              {soDienThoaiDoiTac}
            </a>
          </p>
        </div>
        <div
          className="flex aic jcsbw g20"
          onClick={() => handleSelectDoiTac(index, doiTac)}
        >
          <div className="flex aic g10">
            <i className="fa-solid fa-file-invoice-dollar "></i>
            <h4>{tongTienNo?.toLocaleString()} đ</h4>
          </div>
          <div className="flex aic g10">
            <i className="fa-solid fa-fire-flame-simple"></i>
            <h4>{tongVoNo?.toLocaleString()} vỏ</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoiTacItem;
