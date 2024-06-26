import React, { useEffect, useState } from "react";
import "./thongke.scss";
import { useDispatch, useSelector } from "react-redux";

import {
  getDanhMuc,
  getKhachHangNo,
  getKho,
  getLoaiVo,
  getTraTien,
} from "../../api/getAPI";
import CountUp from "react-countup";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const ThongKe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    headers,
    listBaoCao,
    listLoaiVo,
    listDanhMuc,
    listKhachHangNo,
    listKho,
  } = useSelector((state) => state.dataSlice);

  const fetchData = async () => {
    await getTraTien(headers, dispatch);
    await getLoaiVo(headers, dispatch);
    await getDanhMuc(headers, dispatch);
    await getKhachHangNo(headers, dispatch);
    //demo get kho api
    await getKho(headers, dispatch);
  };

  // console.log("báo cáo", listKho);

  const tongNoTien = listKhachHangNo.reduce(
    (total, item) => total + item.tongTienNo,
    0
  );
  const tongNoVo = listKhachHangNo.reduce(
    (total, item) => total + item.tongVoNo,
    0
  );

  const [listBinhNguyen, setListBinhNguyen] = useState([]);
  const [listSanPhamBan, setListSanPhamBan] = useState([]);
  const tongBinhNguyen = listBinhNguyen?.reduce(
    (total, item) => total + item.tonKho,
    0
  );
  const tongVoKhong = listLoaiVo?.reduce(
    (total, item) => total + item.tonKho,
    0
  );
  const tongSanPhamBan = listSanPhamBan?.reduce(
    (total, item) => total + item.tonKho,
    0
  );

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

        <div className="sumAll">
          <i className="fa-solid fa-fire-flame-simple"></i>
          <CountUp
            end={tongNoVo + tongBinhNguyen + tongVoKhong}
            duration={1}
            separator=","
          />
        </div>

        {listBaoCao?.tongThuTien !== 0 ||
        listBaoCao?.tongChiTien !== 0 ||
        listBaoCao?.tongTienTrongNgay !== 0 ? (
          <>
            <div className="baoCaoTienItem">
              <div className="title">
                <h5>Tiền mặt</h5>
              </div>

              <div onClick={() => navigate("chi-tiet-xuat")}>
                <p>Tổng thu</p>
                <CountUp
                  end={listBaoCao?.tongThuTien}
                  duration={1}
                  separator=","
                />
              </div>
              <div onClick={() => navigate("chi-tiet-nhap")}>
                <p>Tổng chi</p>
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
                <CountUp
                  end={listBaoCao?.tongTienTrongNgay}
                  duration={1}
                  separator=","
                />
              </div>
            </div>
          </>
        ) : null}

        {(tongNoTien !== 0 || tongNoVo !== 0) && (
          <div
            className="baoCaoItem"
            style={{ justifyContent: "space-around" }}
          >
            <div
              className="title"
              onClick={() => {
                navigate("theo-doi-no");
              }}
            >
              <h5>Khách nợ </h5>
            </div>

            <div>
              <p>
                <i className="fa-solid fa-fire-flame-simple"></i>
              </p>
              <h3>
                <CountUp end={tongNoVo} duration={1} separator="," />
              </h3>
            </div>

            <div>
              <p>
                <i className="fa-solid fa-file-invoice-dollar"></i>
              </p>
              <CountUp end={tongNoTien} duration={1} separator="," />
            </div>
          </div>
        )}

        {listLoaiVo.length > 0 && (
          <>
            <div className="baoCaoContentItem">
              <div className="title">
                <h5>Vỏ không ({tongVoKhong?.toLocaleString()})</h5>
              </div>

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
              <div className="title">
                <h5>Bình nguyên ({tongBinhNguyen?.toLocaleString()})</h5>
              </div>

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
            <div className="baoCaoContentItem">
              <div className="title">
                <h5>Sản phẩm khác ({tongSanPhamBan?.toLocaleString()})</h5>
              </div>
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
