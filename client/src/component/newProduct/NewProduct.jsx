import React, { useEffect, useState } from "react";
import "./newProduct.css";
import axios from "axios";
import { useNavigate } from "react-router";

export default function NewProduct() {
  const [productName, setProductName] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [phoneList, setPhoneList] = useState([]);
  const [category, setCategory] = useState(1);
  const [phone, setPhone] = useState(1);
  const [price, setPrice] = useState("");
  const [describe, setDescribe] = useState("");
  const [avatar, setAvatar] = useState({ file: [] });
  const [amount, setAmount] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleCreate = () => {
    const formdata = new FormData();
    formdata.append("avatar", avatar.file);
    formdata.append("loaisp", category);
    formdata.append("tendt", phone);
    formdata.append("tensp", productName);
    formdata.append("gia", price);
    formdata.append("mota", describe);
    formdata.append("soluong", amount);
    formdata.append("mausac", color);
    axios
      .post("/sanpham/them", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/admin/productManager");
      })
      .catch((error) => {
        if (error.response.status === 402) {
          setError(error.response.data.message);
          console.log("Lỗi nhập chưa nhập đủ thông tin");
        } else console.log("Thêm sản phẩm không thành công");
      });
  };

  useEffect(() => {
    axios
      .get("/loaisp")
      .then((res) => {
        setCategoryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("/dienthoai")
      .then((res) => {
        setPhoneList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const selectChange = (value) => {
    setCategory(value.target.value);
  };
  const selectPhoneChange = (value) => {
    setPhone(value.target.value);
  };

  const uploadImage = (e) => {
    // if (e.target.files[0]) {
    //   const reader = new FileReader();
    //   reader.addEventListener("load", () => {
    //     setAvatar(reader.result);
    //   });
    //   reader.readAsDataURL(e.target.files[0]);
    // }
    setAvatar({
      ...avatar,
      file: e.target.files[0],
    });
  };

  return (
    <div className="newProduct">
      <h1 className="newProductTitle">Thêm sản phẩm</h1>
      <form className="newProductForm">
        <div className="newProductItem">
          <label> Tên sản phẩm</label>
          <input
            type="text"
            value={productName}
            onChange={(value) => setProductName(value.target.value)}
          ></input>
        </div>
        <div className="newProductItem">
          <label>Loại sản phẩm</label>
          <select
            className="form-control"
            id="district"
            onChange={selectChange}
          >
             <option disabled default>
                    Chọn loại sản phẩm
                  </option>
                
            {

              categoryList.map((loaisp) => {
                return (
                  <option value={loaisp.id} key={loaisp.id}>
                    {loaisp.LSP_Ten}
                  </option>
                );
              })
              }
      
          </select>
        </div>
        <div className="newProductItem">
          <label>Giá tiền</label>
          <input
            type="text"
            value={price}
            onChange={(value) => setPrice(value.target.value)}
          ></input>
        </div>
        <div className="newProductItem">
          <label>Điện thoại</label>
          <select
            className="form-control"
            id="district"
            onChange={selectPhoneChange}
          >
              <option disabled default>
                    Chọn điện thoại
                  </option>
                
            {phoneList &&
              phoneList.map((val) => {
                return (
                  <option value={val.id} key={val.id}>
                    {val.DT_Ten}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="newProductItem">
          <label> Mô tả</label>
          <textarea
            type="text"
            value={describe}
            onChange={(value) => setDescribe(value.target.value)}
            rows="5"
          ></textarea>
        </div>
        <div className="newProductItem">
          <label> Số lượng</label>
          <input
            type="number"
            value={amount}
            onChange={(value) => setAmount(value.target.value)}
          ></input>
        </div>

        <div className="newProductItem">
          <label> Màu sắc</label>
          <input
            type="text"
            value={color}
            onChange={(value) => setColor(value.target.value)}
          ></input>
        </div>
        <div className="newProductItem">
          <label>Ảnh đại diện</label>
          <input type="file" id="file" onChange={uploadImage}></input>
        </div>

        <button
          className="newProductButton"
          type="button"
          onClick={handleCreate}
        >
          Lưu
        </button>
      </form>
    </div>
  );
}
