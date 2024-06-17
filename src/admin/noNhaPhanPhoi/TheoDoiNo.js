import React, { useState } from "react";
import "./theodoino.scss";
import TimKiem from "../khachHangPage/TimKiem";
import ListDoiTacNo from "./ListDoiTacNo";
import { postTimKiemNoNhaPhanPhoi } from "../../api/postAPI";
import CountUp from "react-countup";

const TheoDoiNo = ({ listData, titlePage }) => {
  const tongTien = listData.reduce((total, item) => total + item.tongTienNo, 0);
  const tongVo = listData.reduce((total, item) => total + item.tongVoNo, 0);

  const [indexItem, setIndexItem] = useState(-1);

  return (
    <div className="theoDoiNo">
      <h3 className="title">{titlePage}</h3>
      <div>
        <TimKiem
          postTimKiem={postTimKiemNoNhaPhanPhoi}
          placeholder="Tìm nợ nhà phân phối..."
        />
        <div className="info">
          <div onClick={() => setIndexItem(-1)}>
            <p>
              <i className="fa-solid fa-users"></i>
            </p>
            <h3>
              <CountUp end={listData.length} duration={1} separator="," />
            </h3>
          </div>

          <div>
            <p>
              <i className="fa-solid fa-file-invoice-dollar"></i>
            </p>
            <h3>
              <CountUp end={tongTien} duration={1} separator="," /> đ
            </h3>
          </div>
          <div>
            <p>
              <i className="fa-solid fa-fire-flame-simple"></i>
            </p>
            <h3>
              <CountUp end={tongVo} duration={1} separator="," /> vỏ
            </h3>
          </div>
        </div>

        {listData.length > 0 ? (
          <ListDoiTacNo
            listDoiTacNo={listData}
            indexItem={indexItem}
            setIndexItem={setIndexItem}
          />
        ) : (
          <div className="noDataItem">
            <h1>
              Không có nợ
              <i className="fa-regular fa-face-smile"></i>
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default TheoDoiNo;
