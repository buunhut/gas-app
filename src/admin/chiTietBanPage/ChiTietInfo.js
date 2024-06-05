import React from "react";

const ChiTietInfo = ({ listPhieuXuatSaving }) => {
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
      <h3>{soLuongPhieu.toLocaleString()} Phiếu</h3>
      <div className="flex aic jcsbw g10">
        <div className="chiTietInfo">
          <span>
            <i className="fa-solid fa-file-invoice-dollar"></i>
          </span>
          <p>{tongTienCacPhieu.toLocaleString()} đ</p>
          <p className="tra">{tongTienDaTraCacPhieu.toLocaleString()} đ</p>
          <p className="no">
            {(tongTienCacPhieu - tongTienDaTraCacPhieu).toLocaleString()} đ
          </p>
        </div>
        <div className="chiTietInfo">
          <span>
            <i className="fa-solid fa-fire-flame-simple"></i>
          </span>
          <p>{tongVoCacPhieu.toLocaleString()} vỏ</p>
          <p className="tra">{tongTraVoCacPhieu.toLocaleString()} vỏ</p>
          <p className="no">{tongNoTraVoCacPhieu.toLocaleString()} vỏ</p>
        </div>
      </div>
    </div>
  );
};

export default ChiTietInfo;
