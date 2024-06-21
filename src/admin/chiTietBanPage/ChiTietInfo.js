import React from "react";

const ChiTietInfo = ({
  listPhieuXuatSaving,
  setPhieuNoOnly,
  listPhieuTraVoKhachLoai,
  phieuTraKhacLoaiOnly,
  setPhieuTraKhacLoaiOnly,
}) => {
  const soLuongPhieu = listPhieuXuatSaving.length;
  const tongTienCacPhieu = listPhieuXuatSaving.reduce(
    (total, item) => total + item.tongTien,
    0
  );
  const tongTienDaTraCacPhieu = listPhieuXuatSaving.reduce(
    (total, item) => total + item.tongTraTien,
    0
  );

  const tongVoCacPhieu = listPhieuXuatSaving.reduce(
    (total, item) => total + item.tongVo,
    0
  );
  const tongTraVoCacPhieu = listPhieuXuatSaving.reduce(
    (total, item) => total + item.tongTraVo,
    0
  );
  const tongNoTraVoCacPhieu = listPhieuXuatSaving.reduce(
    (total, item) => total + item.tongNoVo,
    0
  );

  return (
    <div className="p10 totalDetail">
      <div className="flex aic jcsbw">
        <h3 onClick={() => setPhieuTraKhacLoaiOnly(false)}>
          Tổng {soLuongPhieu.toLocaleString()} phiếu
        </h3>
        {listPhieuTraVoKhachLoai.length > 0 && (
          <p
            style={{
              color: phieuTraKhacLoaiOnly ? "#009900" : "silver",
              marginBottom: "10px",
              cursor: "pointer",
            }}
            onClick={() => setPhieuTraKhacLoaiOnly(!phieuTraKhacLoaiOnly)}
          >
            Có {listPhieuTraVoKhachLoai.length.toLocaleString()} phiếu trả vỏ
            khác loại
          </p>
        )}
      </div>
      <div className="flex aic jcsbw g10">
        <div className="chiTietInfo">
          <span>
            <i className="fa-solid fa-file-invoice-dollar"></i>
          </span>
          <p onClick={() => setPhieuNoOnly(false)}>
            {tongTienCacPhieu.toLocaleString()} đ
          </p>
          <p className="tra">{tongTienDaTraCacPhieu.toLocaleString()} đ</p>
          <p className="no" onClick={() => setPhieuNoOnly(true)}>
            {(tongTienCacPhieu - tongTienDaTraCacPhieu).toLocaleString()} đ
          </p>
        </div>
        <div className="chiTietInfo">
          <span>
            <i className="fa-solid fa-fire-flame-simple"></i>
          </span>
          <p onClick={() => setPhieuNoOnly(false)}>
            {tongVoCacPhieu.toLocaleString()} vỏ
          </p>
          <p className="tra">{tongTraVoCacPhieu.toLocaleString()} vỏ</p>
          <p className="no" onClick={() => setPhieuNoOnly(true)}>
            {tongNoTraVoCacPhieu.toLocaleString()} vỏ
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChiTietInfo;
