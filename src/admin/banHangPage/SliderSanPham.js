import React, { useState } from "react";
import { postChiTiet } from "../../api/postAPI";
import { useDispatch, useSelector } from "react-redux";
import { LINK_IMAGE } from "../sanPhamPage/SanPhamItem";

const SliderSanPham = ({ giaoDich, khachHangSelected, donHangSelected }) => {
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
          giaDoi,
          giaDoiGan,
          giaDoiXa,
          giaVo,
          loaiVo,
          loaiVoId,
          tonKho,
          images,
        } = item;
        let image = null;

        const imageName = images?.imageName || null;

        if (imageName !== null) {
          image = imageName[0];
        }
        const giaXuat =
          giaoDich === "đổi"
            ? khachHangSelected?.viTri?.toLowerCase() === "gần"
              ? giaDoiGan
              : khachHangSelected?.viTri?.toLowerCase() === "xa"
              ? giaDoiXa
              : giaDoi
            : giaoDich === "bán"
            ? khachHangSelected?.viTri?.toLowerCase() === "gần"
              ? giaDoiGan + giaVo || giaDoiGan
              : khachHangSelected?.viTri?.toLowerCase() === "xa"
              ? giaDoiXa + giaVo || giaDoiXa
              : giaDoi + giaVo || giaDoi
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
              {image ? (
                <img
                  className="img"
                  src={`${LINK_IMAGE}/${image}`}
                  alt="hình"
                />
              ) : (
                <div className="img"></div>
              )}

              <div className="flex aic jcsbw plr10">
                <h4 className="name">{tenSanPham}</h4>
                <div className="giaXuat">
                  <input
                    type="text"
                    placeholder="Giá xuất"
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
