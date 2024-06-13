import axios from "axios";
import { API_URL } from "../user/DangNhap";
import {
  getDanhMuc,
  getKhachHang,
  getKhachHangNo,
  getListPhieuNhapPending,
  getListPhieuXuatPending,
  getLoaiVo,
  getNhaPhanPhoi,
  getNoNhaPhanPhoi,
  getSanPham,
} from "./getAPI";
import { postSortPhieu } from "./postAPI";

export const deleteLoaiVo = async (data, headers, dispatch) => {
  await axios({
    method: "delete",
    url: `${API_URL}/loai-vo`,
    headers,
    data,
  })
    .then(async (res) => {
      const { statusCode } = res.data;
      if (statusCode === 200) {
        await getLoaiVo(headers, dispatch);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteDanhMuc = async (data, headers, dispatch) => {
  await axios({
    method: "delete",
    url: `${API_URL}/danh-muc`,
    headers,
    data,
  })
    .then(async (res) => {
      const { statusCode } = res.data;
      if (statusCode === 200) {
        await getDanhMuc(headers, dispatch);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteSanPham = async (data, headers, dispatch) => {
  await axios({
    method: "delete",
    url: `${API_URL}/san-pham`,
    data,
    headers,
  })
    .then(async (res) => {
      const { statusCode } = res.data;
      if (statusCode === 200) {
        await getDanhMuc(headers, dispatch);
        await getSanPham(headers, dispatch);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteKhachHang = async (data, headers, dispatch) => {
  await axios({
    method: "delete",
    url: `${API_URL}/doi-tac`,
    data,
    headers,
  })
    .then(async (res) => {
      const { statusCode } = res.data;
      if (statusCode === 200) {
        await getKhachHang(headers, dispatch);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteNhaPhanPhoi = async (data, headers, dispatch) => {
  await axios({
    method: "delete",
    url: `${API_URL}/doi-tac`,
    data,
    headers,
  })
    .then(async (res) => {
      const { statusCode } = res.data;
      if (statusCode === 200) {
        await getNhaPhanPhoi(headers, dispatch);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteChiTiet = async (data, headers, dispatch, sort) => {
  await axios({
    method: "delete",
    url: `${API_URL}/chi-tiet`,
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
            //gọi phiếu nhập pending
            getListPhieuNhapPending(headers, dispatch);
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

export const deleteTraTien = async (data, headers, dispatch, sort) => {
  await axios({
    method: "delete",
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
            //gọi phiếu nhập pending
            getListPhieuNhapPending(headers, dispatch);
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

export const deleteTraVo = async (data, headers, dispatch, sort) => {
  await axios({
    method: "delete",
    url: `${API_URL}/tra-vo`,
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
            //gọi phiếu nhập pending
            getListPhieuNhapPending(headers, dispatch);
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

export const deleteDonHang = async (data, headers, dispatch, sort) => {
  await axios({
    method: "delete",
    url: `${API_URL}/phieu`,
    headers,
    data,
  })
    .then(async (res) => {
      const { statusCode, content } = res.data;
      if (statusCode === 200) {
        if (content === "px") {
          // console.log(sort);
          if (sort) {
            await postSortPhieu(sort, headers, dispatch);
            return;
          }
          await getListPhieuXuatPending(headers, dispatch);
          // await getListPhieuXuatDaGiao(headers, dispatch);
          await getKhachHangNo(headers, dispatch);
        } else {
          if (sort) {
            await postSortPhieu(sort, headers, dispatch);
            return;
          }
          await getListPhieuNhapPending(headers, dispatch);
          // await getListPhieuXuatDaGiao(headers, dispatch);
          await getNoNhaPhanPhoi(headers, dispatch);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const deleteImage = async (data, headers, dispatch) => {
  await axios({
    method: "delete",
    url: `${API_URL}/upload`,
    headers,
    data,
  })
    .then(async (res) => {
      const { statusCode } = res.data;
      if (statusCode === 200) {
        getSanPham(headers, dispatch);
        getDanhMuc(headers, dispatch);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
