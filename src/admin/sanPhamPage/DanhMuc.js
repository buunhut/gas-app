import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDanhMuc } from "../../api/postAPI";
import { putListDanhMuc } from "../../api/putAPI";
import { deleteDanhMuc } from "../../api/deleteAPI";

const DanhMuc = ({
  handleSelectDanhMuc,
  editDanhMuc,
  danhMucSelected,
  setEditDanhMuc,
}) => {
  const dispatch = useDispatch();
  const { listDanhMuc, headers } = useSelector((state) => state.dataSlice);
  const handleTaoDanhMuc = () => {
    postDanhMuc(headers, dispatch);
  };

  const handleUpdateDanhMuc = () => {
    const { danhMucId, danhMucName, danhMucImage } = editDanhMuc;
    //gọi apii update
    const data = {
      danhMucId,
      danhMucName,
      imageId: danhMucImage,
    };
    putListDanhMuc(data, headers, dispatch);
  };

  const handleDeleteDanhMuc = (item) => {
    const { danhMucId, danhMucName } = item;
    const confirm = window.confirm(
      `Bạn có chắc muốn xoá ${danhMucName?.toUpperCase()} ?`
    );
    if (confirm) {
      const data = { danhMucId };
      deleteDanhMuc(data, headers, dispatch);
    }
  };

  return (
    <div className="mainContent">
      <div className="controller">
        <h5 className="title">Danh mục</h5>
        <button className="btn" onClick={handleTaoDanhMuc}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>

      <div className="category">
        <div className="categorySlider">
          {listDanhMuc?.map((item, index) => {
            const { danhMucId, danhMucName } = item;
            return (
              <div className="categoryWrap" key={index}>
                <div
                  className="categoryItem"
                  style={{
                    borderColor:
                      danhMucSelected?.danhMucId === danhMucId ? "#009900" : "",
                  }}
                  onClick={() => handleSelectDanhMuc(item)}
                >
                  <input
                    type="text"
                    className="tenSanPham"
                    placeholder="Tên danh mục"
                    value={
                      editDanhMuc?.danhMucName !== undefined &&
                      editDanhMuc?.danhMucId === danhMucId
                        ? editDanhMuc.danhMucName === null
                          ? ""
                          : editDanhMuc.danhMucName
                        : danhMucName === null
                        ? ""
                        : danhMucName
                    }
                    onChange={(e) => {
                      setEditDanhMuc({
                        ...item,
                        danhMucName: e.target.value,
                      });
                    }}
                    onBlur={handleUpdateDanhMuc}
                  />
                </div>
                <i
                  className="fa-solid fa-trash-can delete"
                  onClick={() => handleDeleteDanhMuc(item)}
                ></i>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DanhMuc;
