import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./chitietban.scss";
import { postSortPhieu } from "../../api/postAPI";
import ChiTietInfo from "./ChiTietInfo";
import ChiTietItem from "./ChiTietItem";
import moment from "moment";

const ChiTietBan = () => {
  const dispatch = useDispatch();
  const { headers, listPhieuXuatSaving, listKhachTraNo } = useSelector(
    (state) => state.dataSlice
  );
  // console.log(listKhachTraNo);
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

  const date = moment().utcOffset(7).format("YYYY-MM-DD");

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

  // console.log(listPhieuXuatSaving);

  const listPhieuTraVoKhachLoai = listPhieuXuatSaving?.filter(
    (item) => !item.cungLoai
  );

  // console.log(listPhieuTraVoKhachLoai);

  useEffect(() => {
    handleSortPhieu(sort, headers, dispatch);
  }, [sort, headers, dispatch]);

  // useEffect(() => {}, [listPhieuXuatSaving]);

  const [phieuNoOnly, setPhieuNoOnly] = useState(false);
  const [phieuTraKhacLoaiOnly, setPhieuTraKhacLoaiOnly] = useState(false);

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

      {listPhieuXuatSaving.length === 0 && listKhachTraNo === 0 ? (
        <div className="noData">
          <h1>Không có dữ liệu</h1>
        </div>
      ) : (
        <>
          {listPhieuXuatSaving.length > 0 && (
            <>
              <ChiTietInfo
                listPhieuXuatSaving={listPhieuXuatSaving}
                setPhieuNoOnly={setPhieuNoOnly}
                listPhieuTraVoKhachLoai={listPhieuTraVoKhachLoai}
                phieuTraKhacLoaiOnly={phieuTraKhacLoaiOnly}
                setPhieuTraKhacLoaiOnly={setPhieuTraKhacLoaiOnly}
              />
              {phieuTraKhacLoaiOnly
                ? listPhieuTraVoKhachLoai.map((phieu, index) => {
                    return (
                      <ChiTietItem phieu={phieu} key={index} sort={sort} />
                    );
                  })
                : listPhieuXuatSaving?.map((phieu, index) => {
                    if (phieuNoOnly === true) {
                      const { tongNoTien, tongNoVo } = phieu;
                      if (tongNoTien !== 0 || tongNoVo !== 0) {
                        return (
                          <ChiTietItem phieu={phieu} key={index} sort={sort} />
                        );
                      }
                    } else {
                      return (
                        <ChiTietItem phieu={phieu} key={index} sort={sort} />
                      );
                    }
                  })}
            </>
          )}
          {listKhachTraNo.length > 0 && (
            <>
              <div className="khachTraNo">
                <h3>KHÁCH TRẢ NỢ</h3>
              </div>
              {listKhachTraNo?.map((tra, index) => {
                const {
                  tenDoiTac,
                  ngay,
                  donHangId,
                  giaoDich,
                  loaiPhieu,
                  traTien,
                  traVo,
                } = tra;

                return (
                  <div className="traNoItem" key={index}>
                    <div className="title">
                      <p>{moment(ngay).format("DD/MM/YYYY")}</p>
                      <p>
                        #ID{donHangId}_{loaiPhieu?.toUpperCase()}
                      </p>
                      <p>{giaoDich?.toUpperCase()}</p>
                    </div>
                    <div className="khachHang">
                      <h3>{tenDoiTac}</h3>
                      <h3>Trả nợ</h3>
                    </div>
                    <div className="traNoContent">
                      {traTien.length > 0 &&
                        traTien?.map((tien, index) => {
                          const { ngay, soTien } = tien;
                          return (
                            <div key={index} className="traItem">
                              <p>{moment(ngay).format("DD/MM/YYYY")}</p>
                              <p>{soTien?.toLocaleString()}</p>
                            </div>
                          );
                        })}
                      {traVo.length > 0 &&
                        traVo?.map((vo, index) => {
                          const { ngay, loaiVo, soLuong } = vo;
                          return (
                            <div key={index} className="traItem">
                              <p>{moment(ngay).format("DD/MM/YYYY")}</p>
                              <p>
                                {soLuong?.toLocaleString()}
                                {loaiVo?.toUpperCase()}
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </>
      )}

      {/* {listPhieuXuatSaving.length > 0 ? (
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
      )} */}
    </div>
  );
};

export default ChiTietBan;
