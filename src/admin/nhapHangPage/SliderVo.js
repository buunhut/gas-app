import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postChiTiet } from "../../api/postAPI";

const SliderVo = ({ donHangSelected, giaoDich }) => {
  const dispatch = useDispatch();
  const { headers, listLoaiVo } = useSelector((state) => state.dataSlice);
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
      {listLoaiVo?.map((item, index) => {
        const { loaiVoName, loaiVoId, giaVo, tonKho } = item;

        const giaXuat = giaVo;
        const sanPhamXuat = {
          sanPhamId: null,
          tenSanPham: loaiVoName,
          giaXuat,
          loaiVo: loaiVoName,
          loaiVoId,
        };
        if (loaiVoName !== null && loaiVoName !== "") {
          return (
            <div className="sanPhamWrap" key={index}>
              <div className="sanPhamItem">
                <img src="" alt="" />
                <div className="flex aic jcsbw plr10">
                  <h4 className="name">{loaiVoName}</h4>
                  <div className="giaXuat">
                    <input
                      type="text"
                      placeholder="Giá xuất"
                      // onClick={() => handleEditGia(sanPhamXuat)}
                      onChange={(e) => handleChangeInputGia(e, sanPhamXuat)}
                      value={
                        editGia?.loaiVoId === loaiVoId
                          ? editGia.giaXuat === null || editGia.giaXuat === 0
                            ? ""
                            : editGia.giaXuat.toLocaleString()
                          : giaXuat === null || giaXuat === 0
                          ? ""
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
        }
      })}
    </div>
  );
};

export default SliderVo;
