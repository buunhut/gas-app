import React, { useEffect, useState } from "react";
import "./banhang.scss";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Cần import CSS

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PhieuItem from "./PhieuItem";
import {
  getKhachHang,
  getListPhieuXuatPending,
  getLoaiVo,
  getSanPham,
} from "../../api/getAPI";
import { postTaoPhieu, postTimKiemKhachHang } from "../../api/postAPI";
import DoiTac from "./DoiTac";
import BanHangMenuBar from "./MenuBar";
import { speak } from "../AdminPage";
import TimKiem from "../khachHangPage/TimKiem";
import { updateIsLoading } from "../../redux/dataSlice";
import SliderSanPham from "./SliderSanPham";
import SliderVo from "./SliderVo";

const BanHang = () => {
  const dispatch = useDispatch();
  const { headers, listKhachHang, listPhieuXuatPending } = useSelector(
    (state) => state.dataSlice
  );

  const [khachHangSelected, setKhachHangSelected] = useState(null);
  const [giaoDich, setGiaoDich] = useState("đổi");
  const [donHangSelected, setDonHangSelected] = useState(null);
  const donHangId = donHangSelected?.donHangId;

  const [index, setIndex] = useState(0);
  const [indexItem, setIndexItem] = useState(-1);
  const length = listPhieuXuatPending.length;

  const handleSelectMenu = (e) => {
    const { name } = e.target;
    setGiaoDich(name);
  };

  const handleSelectDoiTac = (index, item) => {
    const message = `Bạn có muốn tạo phiếu ${giaoDich.toUpperCase()} cho ${
      item.tenDoiTac
    }`;

    speak(message);

    const confirm = window.confirm(
      `Bạn muốn tạo phiếu ${giaoDich.toUpperCase()} cho ${item.tenDoiTac.toUpperCase()} ?`
    );
    if (confirm) {
      speak(`phiếu ${giaoDich} cho ${item.tenDoiTac} đã được tạo`);
      handleTaoPhieu(item);
      setIndexItem(index);
      setKhachHangSelected(item.doiTacId);
    } else {
      speak("bạn không đồng ý");
      setKhachHangSelected(null);
    }
  };

  const handleTaoPhieu = async (item) => {
    const { tenDoiTac, doiTacId } = item;
    const data = {
      tenDoiTac,
      doiTacId,
      giaoDich,
      loaiPhieu: "px",
    };
    await postTaoPhieu(data, headers, dispatch);
    setIndex(0);
  };

  const handleNextPhieu = () => {
    if (index === length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }

    const nextPhieu = listPhieuXuatPending[index + 1];
    if (nextPhieu) {
      const { doiTacId } = nextPhieu;
      const indexItem = listKhachHang.findIndex(
        (item) => item.doiTacId === doiTacId
      );
      setIndexItem(indexItem);
    }
  };

  const handlePrevPhieu = () => {
    if (index === 0) {
      setIndex(length - 1);
    } else {
      setIndex(index - 1);
    }

    const prevPhieu = listPhieuXuatPending[index - 1];
    if (prevPhieu) {
      const { doiTacId } = prevPhieu;
      const indexItem = listKhachHang.findIndex(
        (item) => item.doiTacId === doiTacId
      );
      setIndexItem(indexItem);
    }
  };

  const getAllData = async (headers, dispatch) => {
    try {
      dispatch(updateIsLoading(true));
      await getLoaiVo(headers, dispatch);
      await getKhachHang(headers, dispatch);
      await getSanPham(headers, dispatch, "đổi");
      await getListPhieuXuatPending(headers, dispatch);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateIsLoading(false));
    }
  };

  useEffect(() => {
    getAllData(headers, dispatch);
  }, [headers, dispatch]);

  useEffect(() => {
    if (listPhieuXuatPending.length > 0) {
      setDonHangSelected(listPhieuXuatPending?.[index]);

      const currentPhieu = listPhieuXuatPending?.[index];
      if (currentPhieu) {
        const { doiTacId } = currentPhieu;
        const findIndex = listKhachHang?.findIndex(
          (item) => item.doiTacId === doiTacId
        );
        if (findIndex !== -1) {
          setIndexItem(findIndex);
        }
      }
    } else {
      setDonHangSelected(null);
    }
  }, [listPhieuXuatPending, listKhachHang, index]);

  useEffect(() => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(0);
    }
  }, [length]);

  useEffect(() => {
    getSanPham(headers, dispatch, giaoDich);
    getLoaiVo(headers, dispatch);

    if (length === 0) {
      setIndexItem(-1);
    }
  }, [giaoDich, donHangId, length, headers, dispatch]);

  return (
    <div id="banHang">
      <BanHangMenuBar handleSelectMenu={handleSelectMenu} giaoDich={giaoDich} />
      <TimKiem
        postTimKiem={postTimKiemKhachHang}
        placeholder="Tìm khách hàng..."
      />
      <DoiTac
        listDoiTac={listKhachHang}
        handleSelectDoiTac={handleSelectDoiTac}
        indexItem={indexItem}
      />

      {/* thông tin đơn hàng */}
      <div className="donHangContent mb10">
        <div className="flex jcsbw plr10">
          <h5 className="title">Phiếu xuất</h5>
        </div>
        <div className="donHangContent">
          {donHangSelected ? (
            <PhieuItem
              item={donHangSelected}
              headers={headers}
              setGiaoDich={setGiaoDich}
            />
          ) : (
            <div className="noData">
              <h1>Chưa có đơn</h1>
            </div>
          )}

          {listPhieuXuatPending.length > 0 && (
            <>
              {index > 0 && (
                <i
                  className="fa-solid fa-angles-left slickPrev"
                  onClick={handlePrevPhieu}
                ></i>
              )}
              <span className="numberOfPhieu">
                {index + 1}/{length}
              </span>
              {index < length - 1 && (
                <i
                  className="fa-solid fa-angles-right slickNext"
                  onClick={handleNextPhieu}
                ></i>
              )}
            </>
          )}
        </div>
      </div>

      {/* sản phẩm */}
      <div className="sanPhamContent mb10">
        <div className="flex jcsbw plr10">
          <h5 className="title">Sản phẩm</h5>
        </div>
        {giaoDich === "đổi" || giaoDich === "bán" ? (
          <SliderSanPham
            giaoDich={giaoDich}
            khachHangSelected={khachHangSelected}
            donHangSelected={donHangSelected}
          />
        ) : (
          <SliderVo
            giaoDich={giaoDich}
            khachHangSelected={khachHangSelected}
            donHangSelected={donHangSelected}
          />
        )}
      </div>
    </div>
  );
};

export default BanHang;
