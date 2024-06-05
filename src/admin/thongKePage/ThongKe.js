import React, { useEffect, useState } from "react";
import "./thongke.scss";
import { useDispatch, useSelector } from "react-redux";

import { getDanhMuc, getLoaiVo, getTraTien } from "../../api/getAPI";
import CountUp from "react-countup";
import moment from "moment";
const ThongKe = () => {
  const dispatch = useDispatch();
  const { headers, listBaoCao, listLoaiVo, listDanhMuc } = useSelector(
    (state) => state.dataSlice
  );
  const fetchData = async () => {
    await getTraTien(headers, dispatch);
    await getLoaiVo(headers, dispatch);
    await getDanhMuc(headers, dispatch);
  };

  const [listBinhNguyen, setListBinhNguyen] = useState([]);
  const [listSanPhamBan, setListSanPhamBan] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const res = listDanhMuc
      ?.flatMap((item) => item.listSanPham)
      .map((item) => item);

    let findBinhNguyen = [];
    let findListSanPhamBan = [];
    res?.map((item) => {
      if (item.loaiVo === null || item.loaiVo === "không") {
        findListSanPhamBan.push(item);
      } else {
        findBinhNguyen.push(item);
      }
    });
    setListBinhNguyen(findBinhNguyen);
    setListSanPhamBan(findListSanPhamBan);
  }, [listDanhMuc]);

  const now = new Date();
  const today = moment(now).format("DD/MM/YYYY HH:mm");

  return (
    <div className="baoCao">
      <div className="baoCaoContent">
        <div>
          <h3>Báo cáo</h3>
          <h6>{today}</h6>
        </div>
        {listBaoCao?.tongThuTien !== 0 ||
        listBaoCao?.tongChiTien !== 0 ||
        listBaoCao?.tongTienTrongNgay !== 0 ? (
          <>
            <div className="baoCaoTienItem">
              <h5 className="title">Tiền mặt</h5>

              <div>
                <p>Tổng thu</p>
                {/* <span>{listBaoCao?.tongThuTien.toLocaleString()} đ</span> */}
                <CountUp
                  end={listBaoCao?.tongThuTien}
                  duration={1}
                  separator=","
                />
              </div>
              <div>
                <p>Tổng chi</p>
                {/* <span> {listBaoCao?.tongChiTien.toLocaleString()} đ</span> */}
                <CountUp
                  end={listBaoCao?.tongChiTien}
                  duration={1}
                  separator=","
                />
              </div>
              <div
                style={{
                  color: listBaoCao?.tongTienTrongNgay < 0 ? "red" : "",
                }}
              >
                <p>Số dư</p>
                {/* <span> {listBaoCao?.tongTienTrongNgay.toLocaleString()} đ</span> */}
                <CountUp
                  end={listBaoCao?.tongTienTrongNgay}
                  duration={1}
                  separator=","
                />
              </div>
            </div>
          </>
        ) : null}

        {listLoaiVo.length > 0 && (
          <>
            <div className="baoCaoContentItem">
              <h5 className="title">Vỏ không</h5>

              {listLoaiVo?.map((item, index) => {
                const { loaiVoName, tonKho } = item;
                return (
                  <div className="item vo" key={index}>
                    <h4>{loaiVoName}</h4>
                    <div className="khoItem">
                      <i className="fa-solid fa-shop"></i>
                      <p>{tonKho}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {listBinhNguyen.length > 0 && (
          <>
            <div className="baoCaoContentItem">
              <h5 className="title">Bình nguyên</h5>

              {listBinhNguyen?.map((item, index) => {
                const { tenSanPham, tonKho } = item;
                return (
                  <div className="item sanPham" key={index}>
                    <h4>{tenSanPham}</h4>
                    <div className="khoItem">
                      <i className="fa-solid fa-shop"></i>
                      <p>{tonKho}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {listSanPhamBan.length > 0 && (
          <>
            <h5 className="title">Sản phẩm khác</h5>
            <div className="baoCaoContentItem">
              {listSanPhamBan?.map((item, index) => {
                const { tenSanPham, tonKho } = item;
                return (
                  <div className="item sanPham" key={index}>
                    <h4>{tenSanPham}</h4>
                    <div className="khoItem">
                      <i className="fa-solid fa-shop"></i>
                      <p>{tonKho}</p>
                    </div>{" "}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ThongKe;
