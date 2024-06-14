import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postLuuPhieu } from "../../api/postAPI";

import TooleTraNo from "../noNhaPhanPhoi/ToolTraNo";
import "../khachNoPage/theodoino.scss";

import { deleteDonHang } from "../../api/deleteAPI";
import { speak } from "../AdminPage";
import PhieuContent from "./PhieuContent";

const PhieuItem = ({ item, headers, setGiaoDich }) => {
  const {
    donHangId,
    tenDoiTac,
    ngay,
    loaiPhieu,
    giaoDich,
    tongNoTien,
    tongNoVo,
    listChiTiet,
  } = item;

  const dispatch = useDispatch();

  //lưu đơn hàng
  const [ghiChu, setGhiChu] = useState({});
  const handleGhiChu = (e) => {
    const { name, value } = e.target;
    setGhiChu((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleLuuDonHang = async (item) => {
    const { donHangId, tenDoiTac } = item;
    speak(`Bạc có chắc muốn lưu phiếu của ${tenDoiTac}`);

    const confirm = window.confirm(
      `Bạn có chắc muốn lưu phiếu của ${tenDoiTac?.toUpperCase()} ?`
    );
    if (confirm) {
      speak(`phiếu của ${tenDoiTac} đã được lưu`);
      const data = {
        donHangId,
        ghiChu: ghiChu[donHangId] || "",
      };
      await postLuuPhieu(data, headers, dispatch);
    } else {
      speak(`bạn không đồng ý`);
    }
  };
  const handleXoaDonHang = async (item) => {
    const { donHangId, tenDoiTac } = item;
    speak(`Bạn có chắc muốn xoá phiếu của ${tenDoiTac}`);
    const confirm = window.confirm(
      `Bạn có chắc muốn xoá phiếu của ${tenDoiTac?.toUpperCase()} ?`
    );
    if (confirm) {
      speak(`phiếu của ${tenDoiTac} đã được xoá`);
      const data = {
        donHangId,
      };
      await deleteDonHang(data, headers, dispatch);
    } else {
      speak(`bạn không đồng ý`);
    }
  };

  useEffect(() => {
    setGiaoDich(giaoDich);
  }, [donHangId, giaoDich, setGiaoDich]);

  return (
    <div className="donHangWrap">
      <div
        className="donHangItem"
        style={{
          borderColor: item?.donHangId === donHangId ? "#009900" : "",
        }}
      >
        <h3>{tenDoiTac}</h3>
        <h4>{giaoDich}</h4>
        <div className="flex g10">
          <span className="donHangId">
            {"#ID" + donHangId + "_" + loaiPhieu.toUpperCase()}
          </span>
          <span className="ngay">
            Ngày: {moment(ngay).format("DD/MM/YYYY")}
          </span>
        </div>
        <div className="mainContent">
          {listChiTiet.length > 0 && (
            <>
              <PhieuContent item={item} toShow={true} />
              <TooleTraNo
                noTien={tongNoTien}
                noVo={tongNoVo}
                donHangId={donHangId}
              />
              <div className="ghiChu">
                <input
                  name={donHangId}
                  type="text"
                  placeholder="Ghi chú"
                  value={
                    ghiChu[donHangId] !== undefined ? ghiChu[donHangId] : ""
                  }
                  onChange={handleGhiChu}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex aic jcsa p5 ma">
          {/* <i className="fa-solid fa-angles-left"></i> */}
          <button className="btnf" onClick={() => handleXoaDonHang(item)}>
            <i className="fa-solid fa-trash-can"></i>
          </button>
          <button className="btn" onClick={() => handleLuuDonHang(item)}>
            <i className="fa-solid fa-floppy-disk"></i>
          </button>
          {/* <i className="fa-solid fa-angles-right"></i> */}
        </div>
      </div>
    </div>
  );
};

export default PhieuItem;
