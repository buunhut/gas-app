import React, { useState } from "react";
import SelectOptionComponent from "./SelectOptionComponent";
import { useDispatch, useSelector } from "react-redux";
import { putSanPham } from "../../api/putAPI";
import { deleteImage, deleteSanPham } from "../../api/deleteAPI";
import { postUploadImages } from "../../api/postAPI";

export const LINK_IMAGE = process.env.REACT_APP_LINK_IMAGE;

const SanPhamItem = ({ item, headers }) => {
  const dispatch = useDispatch();
  const { listLoaiVo } = useSelector((state) => state.dataSlice);
  const {
    sanPhamId,
    tenSanPham,
    giaNhap,
    giaDoi,
    giaDoiGan,
    giaDoiXa,
    loaiVoId,
    loaiVo,
    tonKho,
    images,
  } = item;

  let image = null;

  const imageName = images?.imageName || null;

  if (imageName !== null) {
    image = imageName[0];
  }

  // console.log(item);
  const [editSanPham, setEditSanPham] = useState(null);

  const handleChangInput = (e) => {
    const { className, value } = e.target;
    if (className !== "tenSanPham") {
      setEditSanPham({
        sanPhamId,
        tenSanPham,
        giaNhap,
        giaDoi,
        giaDoiGan,
        giaDoiXa,
        loaiVoId,
        loaiVo,
        tonKho,
        [className]:
          +value.replaceAll(/[^0-9]/g, "") === null
            ? 0
            : +value.replaceAll(/[^0-9]/g, ""),
      });
    } else {
      setEditSanPham({
        sanPhamId,
        tenSanPham,
        giaNhap,
        giaDoi,
        giaDoiGan,
        giaDoiXa,
        loaiVoId,
        loaiVo,
        tonKho,
        [className]: value,
      });
    }
  };

  const handleUpdateProduct = () => {
    putSanPham(editSanPham, headers, dispatch);
  };

  const handleDeleteProduct = (item) => {
    const { sanPhamId } = item;
    const data = { sanPhamId };
    const confirm = window.confirm(
      `Bạn có chắc muốn xoá ${item.tenSanPham.toUpperCase()}`
    );
    if (confirm) {
      deleteSanPham(data, headers);
    }
  };

  const handleUploadImages = async (e, item) => {
    const { sanPhamId } = item;

    const files = e.target.files;

    const formData = new FormData();

    // Append each file to the FormData object
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    formData.append("sanPhamId", sanPhamId);

    await postUploadImages(formData, headers, dispatch);
  };
  const handleDeleteImage = async (item) => {
    const confirm = window.confirm(
      `Bạn có muốn xoá hình ${item.tenSanPham?.toUpperCase()}`
    );
    if (confirm) {
      const { sanPhamId } = item;
      const data = { sanPhamId };
      await deleteImage(data, headers, dispatch);
    }
  };

  return (
    <div className="productWrap">
      <div className="productItem">
        {image ? (
          <img
            className="img"
            src={`${LINK_IMAGE}/${image}`}
            alt=""
            onClick={() => handleDeleteImage(item)}
          />
        ) : (
          <div className="upload">
            <label className="custom-file-upload">
              <input
                type="file"
                id="file"
                name="file"
                accept="image/jpeg, image/png, image/gif"
                multiple
                onChange={(e) => handleUploadImages(e, item)}
              />
              <i className="fa-regular fa-image "></i>
            </label>
          </div>
        )}
        <div className="textContent">
          <div className="flex mt5">
            <input
              type="text"
              placeholder="Tên sản phẩm"
              className="tenSanPham"
              value={
                editSanPham?.sanPhamId !== undefined &&
                editSanPham?.sanPhamId === sanPhamId
                  ? editSanPham?.tenSanPham === null
                    ? ""
                    : editSanPham?.tenSanPham
                  : tenSanPham === null
                  ? ""
                  : tenSanPham
              }
              onChange={handleChangInput}
              onBlur={handleUpdateProduct}
            />
          </div>
          <div className="flex mt5">
            <input
              type="text"
              placeholder="Giá nhập"
              className="giaNhap"
              value={
                editSanPham?.sanPhamId !== undefined &&
                editSanPham?.sanPhamId === sanPhamId
                  ? editSanPham?.giaNhap === null || editSanPham?.giaNhap === 0
                    ? ""
                    : editSanPham?.giaNhap.toLocaleString()
                  : giaNhap === null || giaNhap === 0
                  ? ""
                  : giaNhap.toLocaleString()
              }
              onChange={handleChangInput}
              onBlur={handleUpdateProduct}
            />
            <input
              type="text"
              placeholder="Giá đổi"
              className="giaDoi"
              value={
                editSanPham?.sanPhamId !== undefined &&
                editSanPham?.sanPhamId === sanPhamId
                  ? editSanPham?.giaDoi === null || editSanPham?.giaDoi === 0
                    ? ""
                    : editSanPham?.giaDoi.toLocaleString()
                  : giaDoi === null || giaDoi === 0
                  ? ""
                  : giaDoi.toLocaleString()
              }
              onChange={handleChangInput}
              onBlur={handleUpdateProduct}
            />
          </div>
          <div className="flex mt5">
            <input
              type="text"
              placeholder="Giá đổi gần"
              className="giaDoiGan"
              value={
                editSanPham?.sanPhamId !== undefined &&
                editSanPham?.sanPhamId === sanPhamId
                  ? editSanPham?.giaDoiGan === null ||
                    editSanPham?.giaDoiGan === 0
                    ? ""
                    : editSanPham?.giaDoiGan.toLocaleString()
                  : giaDoiGan === null || giaDoiGan === 0
                  ? ""
                  : giaDoiGan.toLocaleString()
              }
              onChange={handleChangInput}
              onBlur={handleUpdateProduct}
            />
            <input
              type="text"
              placeholder="Giá đổi xa"
              className="giaDoiXa"
              value={
                editSanPham?.sanPhamId !== undefined &&
                editSanPham?.sanPhamId === sanPhamId
                  ? editSanPham?.giaDoiXa === null ||
                    editSanPham?.giaDoiXa === 0
                    ? ""
                    : editSanPham?.giaDoiXa.toLocaleString()
                  : giaDoiXa === null || giaDoiXa === 0
                  ? ""
                  : giaDoiXa.toLocaleString()
              }
              onChange={handleChangInput}
              onBlur={handleUpdateProduct}
            />
          </div>
          <div className="flex aic jcsbw pl5 mt5">
            <SelectOptionComponent
              item={item}
              listLoaiVo={listLoaiVo}
              title={loaiVo}
              headers={headers}
            />
          </div>
        </div>
        <div className="tonKho">
          <p>Kho: {tonKho.toLocaleString()}</p>
        </div>
      </div>
      <i
        className="fa-solid fa-trash-can delete"
        onClick={() => handleDeleteProduct(item)}
      ></i>
    </div>
  );
};

export default SanPhamItem;
