import React from "react";
import "./theodoino.scss";
import ListDoiTacNo from "./ListDoiTacNo";
import TimKiem from "../khachHangPage/TimKiem";
import { postTimKiemKhachHangNo } from "../../api/postAPI";
import CountUp from "react-countup";

const TheoDoiNo = ({ listData, titlePage }) => {
  const tongTien = listData.reduce((total, item) => total + item.tongTienNo, 0);
  const tongVo = listData.reduce((total, item) => total + item.tongVoNo, 0);

  return (
    <div className="theoDoiNo">
      <h3 className="title">{titlePage}</h3>
      <div>
        <TimKiem
          postTimKiem={postTimKiemKhachHangNo}
          placeholder="Tìm khách hàng nợ..."
        />
        <div className="info">
          <div>
            <p>
              <i className="fa-solid fa-users"></i>
            </p>
            {/* <h3>{listData.length}</h3> */}
            <h3>
              <CountUp end={listData.length} duration={1} separator="," />
            </h3>
          </div>

          <div>
            <p>
              <i className="fa-solid fa-file-invoice-dollar"></i>
            </p>
            {/* <h3>{tongTien?.toLocaleString()} đ</h3> */}
            <h3>
              <CountUp end={tongTien} duration={1} separator="," /> đ
            </h3>
          </div>
          <div>
            <p>
              <i className="fa-solid fa-fire-flame-simple"></i>
            </p>
            {/* <h3>{tongVo?.toLocaleString()} vỏ</h3> */}
            <h3>
              <CountUp end={tongVo} duration={1} separator="," /> vỏ
            </h3>
          </div>
        </div>

        {listData.length > 0 ? (
          <ListDoiTacNo listDoiTacNo={listData} />
        ) : (
          <div className="noDataItem">
            <h1>
              Không có khách nợ
              <i className="fa-regular fa-face-smile"></i>
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default TheoDoiNo;
