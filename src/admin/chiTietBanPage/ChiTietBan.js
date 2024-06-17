import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./chitietban.scss";
import { postSortPhieu } from "../../api/postAPI";
import ChiTietInfo from "./ChiTietInfo";
import ChiTietItem from "./ChiTietItem";
import moment from "moment";

const ChiTietBan = () => {
  const dispatch = useDispatch();
  const { headers, listPhieuXuatSaving } = useSelector(
    (state) => state.dataSlice
  );
  // console.log(listPhieuXuatSaving);

  const uniqueKhachHang = Array.from(
    new Map(
      listPhieuXuatSaving?.map((item) => [
        item.doiTacId,
        { tenDoiTac: item.tenDoiTac, doiTacId: item.doiTacId },
      ])
    ).values()
  );

  // console.log(uniqueKhachHang);

  // const date = new Date().toISOString().split("T")[0];
  const date = moment().utcOffset(7).format("YYYY-MM-DD");

  // const dateTime = moment().utcOffset(7).format("YYYY-MM-DD HH:mm:ss");
  // console.log(dateTime);

  const [sort, setSort] = useState({
    fromDay: date,
    toDay: null,
    doiTacId: null,
    sanPhamId: null,
    loaiPhieu: "px",
  });

  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    if (id === "doiTacId") {
      const selectedDoiTac = uniqueKhachHang.find(
        (kh) => kh.tenDoiTac.toLowerCase() === value.toLowerCase()
      );
      setSort((prevState) => ({
        ...prevState,
        [id]: selectedDoiTac ? selectedDoiTac.doiTacId : null,
      }));
    } else {
      setSort((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };
  const handleSortPhieu = async (sort, headers, dispatch) => {
    await postSortPhieu(sort, headers, dispatch);
  };

  useEffect(() => {
    handleSortPhieu(sort, headers, dispatch);
  }, [sort, headers, dispatch]);

  // useEffect(() => {
  //   handleSortPhieu(sort, headers, dispatch);
  // }, [sort]);

  const [phieuNoOnly, setPhieuNoOnly] = useState(false);

  return (
    <div className="chiTietBan">
      <h3 className="tac mt10">Chi tiết xuất hàng</h3>
      <div className="mt10">
        <form action="">
          <div className="flex aic jcsa gap10">
            <input
              type="date"
              id="fromDay"
              value={sort.fromDay}
              onChange={handleChangeInput}
            />
            <input type="date" id="toDay" onChange={handleChangeInput} />
          </div>

          <div className="flex aic jcsa gap10 mt10">
            <input
              list="doiTac"
              placeholder="Chọn khách hàng"
              id="doiTacId"
              onChange={handleChangeInput}
            />

            <datalist id="doiTac">
              {uniqueKhachHang?.map((item, index) => (
                <option key={index} value={item.tenDoiTac.toUpperCase()}>
                  {item.tenDoiTac.toUpperCase()}
                </option>
              ))}
            </datalist>
          </div>
        </form>
      </div>
      {listPhieuXuatSaving.length > 0 ? (
        <>
          <ChiTietInfo
            listPhieuXuatSaving={listPhieuXuatSaving}
            setPhieuNoOnly={setPhieuNoOnly}
          />
          {listPhieuXuatSaving?.map((phieu, index) => {
            if (phieuNoOnly === true) {
              const { tongNoTien, tongNoVo } = phieu;
              if (tongNoTien !== 0 || tongNoVo !== 0) {
                return <ChiTietItem phieu={phieu} key={index} sort={sort} />;
              }
            } else {
              return <ChiTietItem phieu={phieu} key={index} sort={sort} />;
            }
          })}
        </>
      ) : (
        <div className="noData">
          <h1>Không có dữ liệu</h1>
        </div>
      )}
    </div>
  );
};

export default ChiTietBan;
