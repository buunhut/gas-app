import React, { useState } from "react";
import { postChiTiet } from "../../api/postAPI";
import { useDispatch, useSelector } from "react-redux";
// import { speak } from "../AdminPage";

const SliderSanPham = ({ giaoDich, donHangSelected }) => {
  const dispatch = useDispatch();
  const { headers, listSanPham } = useSelector((state) => state.dataSlice);
  const [editGia, setEditGia] = useState(null);
  const handleChangeInputGia = (e, item) => {
    const { value } = e.target;
    setEditGia({
      ...item,
      giaXuat:
        +value.replaceAll(/[^0-9]/g, "") === null
          ? 0
          : +value.replaceAll(/[^0-9]/g, ""),
    });
  };

  const handleXuatHang = (item) => {
    const { donHangId } = donHangSelected;
    const { sanPhamId, tenSanPham, loaiVo, loaiVoId } = item;
    // speak(`xuất 1 ${tenSanPham}`);
    const donGia =
      editGia?.sanPhamId === item.sanPhamId ? editGia.giaXuat : item.giaXuat;

    const data = {
      donHangId,
      sanPhamId,
      tenSanPham,
      donGia,
      soLuong: 1,
      loaiVo,
      loaiVoId,
    };
    postChiTiet(data, headers, dispatch);
  };

  return (
    <div className="slider">
      {listSanPham?.map((item, index) => {
        const {
          sanPhamId,
          tenSanPham,
          giaNhap,
          giaVo,
          loaiVo,
          loaiVoId,
          tonKho,
        } = item;
        const giaXuat =
          giaoDich === "đổi"
            ? giaNhap
            : giaoDich === "mua"
            ? giaNhap + (giaVo ? giaVo : 0)
            : giaVo;

        const sanPhamXuat = {
          sanPhamId,
          tenSanPham,
          giaXuat,
          loaiVo,
          loaiVoId,
        };
        return (
          <div className="sanPhamWrap" key={index}>
            <div className="sanPhamItem">
              <img src="" alt="" />
              <div className="flex aic jcsbw plr10">
                <h4 className="name">{tenSanPham}</h4>
                <div className="giaXuat">
                  <input
                    type="text"
                    placeholder="Giá nhập"
                    onChange={(e) => handleChangeInputGia(e, sanPhamXuat)}
                    value={
                      editGia?.sanPhamId === sanPhamId
                        ? editGia?.giaXuat === 0
                          ? ""
                          : editGia?.giaXuat.toLocaleString()
                        : giaXuat.toLocaleString()
                    }
                  />
                </div>
                {donHangSelected && (
                  <button
                    className="btn xuatHang"
                    onClick={() => handleXuatHang(sanPhamXuat)}
                  >
                    {giaoDich}
                  </button>
                )}
              </div>
              <div className="tonKho">
                <p>Kho: {tonKho.toLocaleString()}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SliderSanPham;