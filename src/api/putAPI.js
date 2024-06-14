import axios from "axios";
import { API_URL } from "../user/DangNhap";
import {
  getDanhMuc,
  getKhachHang,
  getKhachHangNo,
  getListPhieuNhapPending,
  // getListPhieuXuatDaGiao,
  getListPhieuXuatPending,
  getLoaiVo,
  getNhaPhanPhoi,
  getNoNhaPhanPhoi,
} from "./getAPI";
import { postSortPhieu } from "./postAPI";
import { updateAlert } from "../redux/dataSlice";

export const putLoaiVo = async (data, headers, dispatch) => {
  await axios({
    method: "put",
    url: `${API_URL}/loai-vo`,
    headers,
    data,
  })
    .then((res) => {
      const { statusCode } = res.data;
      if (statusCode === 200) {
        getLoaiVo(headers, dispatch);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const putListDanhMuc = async (data, headers, dispatch) => {
  await axios({
    method: "put",
    url: `${API_URL}/danh-muc`,
    headers,
    data,
  })
    .then((res) => {
      const { statusCode } = res.data;
      if (statusCode === 200) {
        getDanhMuc(headers, dispatch);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const putSanPham = async (data, headers, dispatch) => {
  await axios({
    method: "put",
    url: `${API_URL}/san-pham`,
    data,
    headers,
  })
    .then((res) => {
      const { statusCode } = res.data;
      if (statusCode === 200) {
        getDanhMuc(headers, dispatch);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const putKhachHang = async (data, headers, dispatch) => {
  const res = await axios({
    method: "put",
    url: `${API_URL}/doi-tac`,
    data,
    headers,
  })
    .then((res) => {
      const { statusCode } = res.data;
      if (statusCode === 200) {
        getKhachHang(headers, dispatch);
      } else if (statusCode === 209) {
        return statusCode;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return res;
};

export const putNhaPhanPhoi = async (data, headers, dispatch) => {
  const res = await axios({
    method: "put",
    url: `${API_URL}/doi-tac`,
    data,
    headers,
  })
    .then(async (res) => {
      const { statusCode } = res.data;
      if (statusCode === 200) {
        await getNhaPhanPhoi(headers, dispatch);
      } else if (statusCode === 209) {
        return statusCode;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return res;
};

export const putChiTiet = async (data, headers, dispatch, sort) => {
  await axios({
    method: "put",
    url: `${API_URL}/chi-tiet`,
    headers,
    data,
  })
    .then(async (res) => {
      const { statusCode, content } = res.data;
      if (statusCode === 200) {
        if (content.loaiPhieu === "px") {
          if (content.trangThai === "pending") {
            await getListPhieuXuatPending(headers, dispatch);
          } else {
            if (sort) {
              await postSortPhieu(sort, headers, dispatch);
            }
            await getKhachHangNo(headers, dispatch);
          }
        } else {
          if (content.trangThai === "pending") {
            await getListPhieuNhapPending(headers, dispatch);
          } else {
            if (sort) {
              await postSortPhieu(sort, headers, dispatch);
            }
            await getNoNhaPhanPhoi(headers, dispatch);
          }
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const putTraTien = async (data, headers, dispatch, sort) => {
  await axios({
    method: "put",
    url: `${API_URL}/tra-tien`,
    headers,
    data,
  })
    .then(async (res) => {
      const { statusCode, content } = res.data;
      if (statusCode === 200) {
        if (content.trangThai === "pending") {
          if (content.loaiPhieu === "px") {
            await getListPhieuXuatPending(headers, dispatch);
          } else if (content.loaiPhieu === "pn") {
            await getListPhieuNhapPending(headers, dispatch);
          }
        } else if (content.trangThai === "saving") {
          if (content.loaiPhieu === "px") {
            if (sort) {
              await postSortPhieu(sort, headers, dispatch);
              return;
            }
            await getKhachHangNo(headers, dispatch);
          } else if (content.loaiPhieu === "pn") {
            //gọi nợ nhà phân phôi
            if (sort) {
              await postSortPhieu(sort, headers, dispatch);
              return;
            }
            await getNoNhaPhanPhoi(headers, dispatch);
          }
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
