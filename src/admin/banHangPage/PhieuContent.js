import React, { useState } from "react";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { putChiTiet, putTraTien } from "../../api/putAPI";
import { deleteChiTiet, deleteTraTien, deleteTraVo } from "../../api/deleteAPI";

const PhieuContent = ({ item, toShow, sort }) => {
  const dispatch = useDispatch();
  const { headers } = useSelector((state) => state.dataSlice);
  const {
    giaoDich,
    tongTien,
    tongVo,
    tongNoTien,
    tongNoVo,
    listChiTiet,
    listTraTien,
    listTraVo,
  } = item;

  //sửa chi tiết
  const [editDonGiaChiTiet, setEditDonGiaChiTiet] = useState({});
  const [editSoLuongChiTiet, setEditSoLuongChiTiet] = useState({});
  const [editSoTienTra, setEditSoTienTra] = useState({});
  //sửa chi tiết xuất
  const handleChangeInputEditChiTiet = (e, item) => {
    const { chiTietId } = item;
    const { name, value } = e.target;
    if (name === "donGia") {
      setEditDonGiaChiTiet({
        [chiTietId]: value === "" ? 0 : +value.replaceAll(/[^0-9]/g, ""),
      });
    } else if (name === "soLuong") {
      setEditSoLuongChiTiet({
        [chiTietId]: +value.replaceAll(/[^0-9]/g, ""),
      });
    }
  };
  const handleUpdateChiTiet = async (item) => {
    const { chiTietId } = item;
    if (editDonGiaChiTiet?.[chiTietId]) {
      const confirm = window.confirm(
        `Bạn có muốn sửa giá ${editDonGiaChiTiet?.[
          chiTietId
        ].toLocaleString()}đ ?`
      );
      if (confirm) {
        const data = {
          ...item,
          donGia: editDonGiaChiTiet?.[chiTietId],
        };
        await putChiTiet(data, headers, dispatch, sort);
      }
    } else if (editSoLuongChiTiet?.[chiTietId]) {
      const confirm = window.confirm(
        `Bạn có muốn sửa số lượng ${editSoLuongChiTiet?.[
          chiTietId
        ].toLocaleString()} ?`
      );
      if (confirm) {
        const data = {
          ...item,
          soLuong: editSoLuongChiTiet?.[chiTietId],
        };
        await putChiTiet(data, headers, dispatch, sort);
      }
    }
    setEditSoLuongChiTiet({});
  };
  const handleXoaChiTiet = async (item) => {
    const { chiTietId } = item;
    const confirm = window.confirm(`Bạn có chắc muốn xoá dòng này ?`);
    if (confirm) {
      const data = {
        chiTietId,
      };
      await deleteChiTiet(data, headers, dispatch, sort);
    }
  };
  //sửa trả tiền
  const handleChangeEditTraTien = (e, item) => {
    const { value } = e.target;
    const { traTienId } = item;
    setEditSoTienTra((prevState) => ({
      ...prevState,
      [traTienId]: +value.replaceAll(/[^0-9]/g, ""),
    }));
  };
  const handleUpdateTraTien = async (item) => {
    const { traTienId } = item;
    if (editSoTienTra?.[traTienId]) {
      const confirm = window.confirm(
        `Bạn có muốn sửa số tiền trả là ${editSoTienTra?.[
          traTienId
        ].toLocaleString()} ?`
      );
      if (confirm) {
        const data = {
          traTienId,
          soTien: editSoTienTra?.[traTienId],
        };
        await putTraTien(data, headers, dispatch, sort);
      }
    }
    setEditSoTienTra({});
  };

  //xoá trả tiền
  const handleXoaTraTien = async (item) => {
    const { traTienId } = item;
    const confirm = window.confirm(`Bạn có chắc muốn xoá dòng này không ?`);
    if (confirm) {
      const data = {
        traTienId,
      };
      await deleteTraTien(data, headers, dispatch, sort);
    }
  };

  const handleXoaTraVo = async (item) => {
    const { traVoId } = item;
    const confirm = window.confirm(`Bạn có chắc muốn xoá dòng này ?`);
    if (confirm) {
      const data = {
        traVoId,
      };
      await deleteTraVo(data, headers, dispatch, sort);
    }
  };

  return (
    <div style={{ marginTop: "10px", fontSize: "16px", fontWeight: 500 }}>
      {listChiTiet?.map((chiTiet, index) => {
        const { tenSanPham, soLuong, donGia, chiTietId } = chiTiet;
        return (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid silver",
              padding: "10px 0",
              overflow: "hidden",
            }}
          >
            <div className="tenSanPham">
              <div className="flex aic g10 deleteItem">
                <span
                  className="deleteTraTien"
                  onClick={() => handleXoaChiTiet(chiTiet)}
                >
                  <i className="fa-regular fa-trash-can"></i>
                </span>
                <p>{tenSanPham}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "10px",
                }}
              >
                <div
                  className="soLuong"
                  style={{
                    width: "50px",
                    display: "inline-block",
                  }}
                >
                  <input
                    type="text"
                    placeholder="SL"
                    className="soLuong"
                    name="soLuong"
                    style={{
                      border: "none",
                      height: "30px",
                      width: "100%",
                      padding: "0 3px",
                      display: "inline-block",
                    }}
                    value={
                      editSoLuongChiTiet?.[chiTietId] !== undefined
                        ? editSoLuongChiTiet?.[chiTietId] === 0
                          ? ""
                          : editSoLuongChiTiet?.[chiTietId].toLocaleString()
                        : soLuong === 0
                        ? ""
                        : soLuong.toLocaleString()
                    }
                    onChange={(e) => handleChangeInputEditChiTiet(e, chiTiet)}
                    onBlur={() => handleUpdateChiTiet(chiTiet, sort)}
                  />
                </div>
                <span style={{ fontWeight: 400 }}>x</span>

                <div
                  className="donGia"
                  style={{
                    width: "100px",
                    display: "inline-block",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Đơn giá"
                    className="donGia"
                    name="donGia"
                    style={{
                      border: "none",
                      height: "30px",
                      width: "100%",
                      padding: "0 3px",
                      textAlign: "right",
                      display: "inline-block",
                    }}
                    value={
                      editDonGiaChiTiet?.[chiTietId] !== undefined
                        ? editDonGiaChiTiet?.[chiTietId] === 0
                          ? ""
                          : editDonGiaChiTiet?.[chiTietId].toLocaleString()
                        : donGia === 0
                        ? ""
                        : donGia.toLocaleString()
                    }
                    onChange={(e) => handleChangeInputEditChiTiet(e, chiTiet)}
                    onBlur={() => handleUpdateChiTiet(chiTiet)}
                  />
                </div>
              </div>
            </div>
            <div>
              <p>{(donGia * soLuong)?.toLocaleString()}</p>
            </div>
          </div>
        );
      })}
      {/* tổng cộng */}
      {toShow && (
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
            padding: "10px 0",
            borderTop: "1px solid silver",
          }}
        >
          <div style={{ width: "192px" }}>Tổng cộng</div>
          <div>
            <p style={{ width: "60px", textAlign: "right" }}>
              {tongVo?.toLocaleString()}
            </p>
          </div>
          <div>
            <p style={{ width: "120px", textAlign: "right" }}>
              {tongTien?.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* list trả tiền */}
      {listTraTien?.map((tien, index) => {
        const { traTienId, soTien } = tien;
        return (
          <div key={index}>
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "space-between",
                padding: "5px 0",
                borderTop: "1px solid silver",
                fontWeight: 400,
                overflow: "hidden",
              }}
            >
              <div className="flex aic g10 deleteItem">
                <span
                  className="deleteTraTien"
                  onClick={() => handleXoaTraTien(tien)}
                >
                  <i className="fa-regular fa-trash-can"></i>
                </span>
                <span>{moment(tien.ngay).format("DD/MM/YYYY")}</span>
              </div>

              <div>
                <input
                  className="focus"
                  style={{ textAlign: "right" }}
                  type="text"
                  value={
                    editSoTienTra?.[traTienId] !== undefined
                      ? editSoTienTra?.[traTienId] === 0
                        ? ""
                        : editSoTienTra?.[traTienId].toLocaleString()
                      : soTien === 0
                      ? ""
                      : soTien.toLocaleString()
                  }
                  onChange={(e) => handleChangeEditTraTien(e, tien)}
                  onBlur={() => handleUpdateTraTien(tien)}
                />
              </div>
            </div>
          </div>
        );
      })}
      {/* list trả vỏ */}
      {listTraVo?.map((vo, index) => {
        const { soLuong, loaiVo } = vo;
        return (
          <div key={index}>
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "space-between",
                padding: "10px 0",
                borderTop: "1px solid silver",
                fontWeight: 400,
                overflow: "hidden",
              }}
            >
              <div className="flex aic g10 deleteItem">
                <span
                  className="deleteTraTien"
                  onClick={() => handleXoaTraVo(vo)}
                >
                  <i className="fa-regular fa-trash-can"></i>
                </span>

                <span>{moment(item.ngay).format("DD/MM/YYYY")}</span>
              </div>
              <div>
                <p style={{ paddingRight: "3px" }}>
                  {soLuong?.toLocaleString() + " " + loaiVo?.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {/* còn nợ */}
      {(tongNoTien !== 0 || tongNoVo !== 0) && toShow && (
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
            padding: "10px 0",
            borderTop: "1px solid silver",
            fontWeight: "bold",
            color: "red",
          }}
        >
          <div style={{ width: "192px" }}>Còn nợ</div>
          <div>
            <p style={{ width: "60px", textAlign: "right" }}>
              {giaoDich === "đổi" ? tongNoVo?.toLocaleString() : 0}
            </p>
          </div>
          <div>
            <p style={{ width: "120px", textAlign: "right" }}>
              {tongNoTien?.toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhieuContent;
