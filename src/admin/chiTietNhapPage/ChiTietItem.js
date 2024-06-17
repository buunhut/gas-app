import moment from "moment";
import React from "react";
import { speak } from "../AdminPage";
import { deleteDonHang } from "../../api/deleteAPI";
import { useDispatch, useSelector } from "react-redux";
import PhieuContent from "../banHangPage/PhieuContent";

const ChiTietItem = ({ phieu, sort }) => {
  const dispatch = useDispatch();
  const { headers } = useSelector((state) => state.dataSlice);
  const {
    ngay,
    donHangId,
    loaiPhieu,
    tenDoiTac,
    giaoDich,
    // listChiTiet,
    // listTraTien,
    // listTraVo,
    tongTien,
    tongVo,
    tongTraTien,
    tongTraVo,
    tongNoTien,
    tongNoVo,
    // ghiChu,
  } = phieu;

  const handleDelelePhieu = async (phieu) => {
    speak(`Bạn có chắc muốn xoá phiếu của ${tenDoiTac}`);
    const confirm = window.confirm(
      `Bạn có chắc muốn xoá phiếu của ${tenDoiTac?.toUpperCase()} ?`
    );
    if (confirm) {
      speak(`phiếu của ${tenDoiTac} đã được xoá`);
      const data = { donHangId, headers, dispatch };
      await deleteDonHang(data, headers, dispatch, sort);
    } else {
      speak(`bạn không đồng ý`);
    }
  };
  return (
    <div className="chiTietItem">
      {/* <div className="flex jcsbw g5">
        <div className="khachItem">
          <div className="flex aic g10">
            <p className="flex aic">{moment(ngay).format("DD/MM/YYYY")}</p>
            <p className="flex aic g10">
              #ID{donHangId}_{loaiPhieu?.toUpperCase()} {""}{" "}
              <span> {giaoDich.toUpperCase()}</span>
            </p>
          </div>
          <div className="flex aic p5 deleteItem">
            <i
              className="fa-regular fa-trash-can delete"
              onClick={() => handleDelelePhieu(phieu)}
            ></i>
            <h3 style={{ marginLeft: "5px" }}>{tenDoiTac}</h3>
          </div>

          <h4
            style={{
              textAlign: "left",
              color: "red",
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            Tổng nợ
          </h4>
        </div>
        <div className="tienItem">
          <p>{tongTien?.toLocaleString()}</p>
          <p className="tra">{tongTraTien?.toLocaleString()}</p>
          <p className="no" style={{ color: tongNoTien !== 0 ? "" : "silver" }}>
            {tongNoTien?.toLocaleString()}
          </p>
        </div>
        <div className="voItem">
          <p>{tongVo?.toLocaleString()}</p>
          <p className="tra">{tongTraVo?.toLocaleString()}</p>
          <p className="no" style={{ color: tongNoVo !== 0 ? "" : "silver" }}>
            {tongNoVo?.toLocaleString()}
          </p>
        </div>
      </div> */}
      <div className="infoItem">
        <div className="ngay">
          <p>{moment(ngay).format("DD/MM/YYYY")}</p>
          <p className="flex aic g10">
            #ID{donHangId}_{loaiPhieu?.toUpperCase()} {""}{" "}
            <span> {giaoDich.toUpperCase()}</span>
          </p>
        </div>
        <div className="vo">{tongVo?.toLocaleString()}</div>
        <div className="tien">{tongTien?.toLocaleString()}</div>
      </div>
      <div className="infoItem">
        <div className="ngay">
          <div className="flex aic p5 deleteItem">
            <i
              className="fa-regular fa-trash-can delete"
              onClick={() => handleDelelePhieu(phieu)}
            ></i>
            <h3 style={{ marginLeft: "5px" }}>{tenDoiTac}</h3>
          </div>
        </div>
        <div className="traVo">{tongTraVo?.toLocaleString()}</div>
        <div className="traTien">{tongTraTien?.toLocaleString()}</div>
      </div>
      {(tongNoVo !== 0 || tongNoTien !== 0) && (
        <div className="infoItem">
          <div className="ngay">
            <h3 className="tongNo">
              Nợ <i className="fa-regular fa-hand-point-right"></i>
            </h3>
          </div>
          <div
            className="vo"
            style={{ color: tongNoVo !== 0 ? "orangered" : "silver" }}
          >
            {tongNoVo?.toLocaleString()}
          </div>
          <div
            className="tien"
            style={{ color: tongNoTien !== 0 ? "orangered" : "silver" }}
          >
            {tongNoTien?.toLocaleString()}
          </div>
        </div>
      )}
      <div className="chiTietItemDetail">
        <PhieuContent item={phieu} sort={sort} />
      </div>
    </div>
  );
};

export default ChiTietItem;
