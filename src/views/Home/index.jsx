import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import products from "../../services/products";
import category from "../../services/category";
import { useFormik } from "formik";
import { BiAddToQueue } from "react-icons/bi";
import Dropdown from "../../components/Dropdown";

export default () => {
  const [modal, setModal] = useState(false);
  const [dataProduct, setDataProduct] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [categorys, setCategorys] = useState([]);
  useEffect(() => {
    category
      .getAll()
      .then((res) => {
        setCategorys(res);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    products
      .getAll()
      .then((res) => {
        setDataProduct(res);
        setRefresh(true);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  const formik = useFormik({
    initialValues: {
      title: "",
      price: 0,
      storeCount: 0,
      desc: "",
      category: {},
    },
    onSubmit: (values) => {
      formData.append("title", values.title);
      formData.append("price", values.price);
      formData.append("storeCount", values.storeCount);
      formData.append("desc", values.desc);
      formData.append("category", values.category._id);
      formData.append("file", files[0]);
      if (isEdit.type) {
        products
          .edit(isEdit.data._id, formData)
          .then()
          .catch((err) => console.log(err));
      } else {
        products
          .create(formData)
          .then(res => console.log(res))
          .catch((err) => console.log(err));
      }
      formik.resetForm();
      setModal(false);
      setRefresh(false);
      setIsEdit({ type: false, data: null });
    },
  });
  const handleClik = (data) => {
    let categoryDrop = category.map((item) => item.value == data.category);
    setModal(true);
    formik.setValues({
      title: data.title,
      price: data.price,
      desc: data.desc,
      storeCount: data.storeCount,
      category: categoryDrop,
    });
    setIsEdit({ type: true, data: data });
  };
  const handleClikDelete = (id) => {
    setRefresh(false);
    products
      .delete(id)
      .then()
      .catch((err) => console.log(err));
  };
  const [isEdit, setIsEdit] = useState({ type: false, data: null });
  const [files, setFiles] = useState([]);

  const formData = new FormData();

  const handleCancel = () => {
    formik.resetForm();
    setModal(false);
    setIsEdit({ type: false, data: null });
  };
  return (
    <div>
      <div className="flex justify-center">
        <div className="w-[95%]">
          <div className="flex justify-between items-center mr-10 py-10">
            <h1 className="py-10 text-center text-xl lg:text-4xl font-medium font-serif">
              Mahsulotlar
            </h1>
            <button
              onClick={() => {
                setModal(true);
              }}
              className={`text-lg outline-none flex justify-center items-center px-5 py-2 rounded-md text-white font-medium
           font-sans bg-[#30B545]`}
            >
              <BiAddToQueue size={25} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {dataProduct.map((item, ind) => (
              <div key={ind + 1}>
                <div className="md:p-6 p-5 rounded-lg shadowCard max-h-[330px] overflow-y-auto">
                  <div className="flex cursor-pointer justify-center">
                    <img src={item.media} className="rounded-full" alt="" />
                  </div>
                  <table className="mb-5 w-full">
                    <tr className="flex border border-[#c3c3c3]">
                      <td className="pl-3 text-md font-semibold py-1 border border-[#c3c3c3] w-full">
                        Nomi:
                      </td>
                      <td className="pl-3 text-lg font-medium py-1 border border-[#c3c3c3] w-full">
                        {item.title.length > 8
                          ? item.title.slice(0, 8) + "...."
                          : item.title}
                      </td>
                    </tr>
                    <tr className="flex border border-[#c3c3c3]">
                      <td className="pl-3 text-md font-semibold py-1 border border-[#c3c3c3] w-full">
                        Narxi:
                      </td>
                      <td className="pl-3 text-lg font-medium py-1 border border-[#c3c3c3] w-full">
                        {item.price}
                      </td>
                    </tr>
                    <tr className="flex border border-[#c3c3c3]">
                      <td className="pl-3 text-md font-semibold py-1 border border-[#c3c3c3] w-full">
                        Soni:
                      </td>
                      <td className="pl-3 text-lg font-medium py-1 border border-[#c3c3c3] w-full">
                        {item.storeCount}
                      </td>
                    </tr>
                    <tr className="flex border border-[#c3c3c3]">
                      <td className="pl-3 text-md font-semibold py-1 border border-[#c3c3c3] w-full">
                        Malumot:
                      </td>
                      <td className="pl-3 text-md font-medium py-1 border border-[#c3c3c3] w-full">
                        {item.desc}
                      </td>
                    </tr>
                  </table>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleClik(item)}
                      className={`text-lg outline-none flex justify-center items-center px-5 py-2 rounded-md text-white font-medium
           font-sans bg-[#EE8108]`}
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleClikDelete(item._id)}
                      className={`text-lg outline-none flex justify-center items-center px-5 py-2 rounded-md text-white font-medium
           font-sans bg-[#ff3e34]`}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {modal ? (
        <>
          <div className="absolute z-50 top-0 w-full left-0 bg-[#000000c6]">
            <div className="flex justify-center items-center h-screen">
              <div className="bg-white max-h-[80vh] overflow-y-auto rounded-md p-10 md:min-w-[400px]">
                <h1 className="pb-5 text-center text-xl lg:text-3xl font-serif font-medium">
                  Product qo'shish
                </h1>
                <form
                  className="flex min-w-[280px] xl:max-w-2xl  flex-col gap-4"
                  onSubmit={formik.handleSubmit}
                >
                  <label className="text-lg pl-3 font-medium" htmlFor="title">
                    Mahsulot Nomi
                  </label>
                  <input
                    className="text-lg font-normal pl-3 w-96 rounded-md py-1 outline-none border-2 border-[#bfbfbf]"
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                  />
                  <label className="text-lg pl-3 font-medium" htmlFor="title">
                    Mahsulot Narxi
                  </label>
                  <input
                    className="text-lg font-normal pl-3 w-96 rounded-md py-1 outline-none border-2 border-[#bfbfbf]"
                    id="price"
                    name="price"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                  />
                  <label className="text-lg pl-3 font-medium" htmlFor="title">
                    Mahsulot haqida
                  </label>
                  <input
                    className="text-lg font-normal pl-3 w-96 rounded-md py-1 outline-none border-2 border-[#bfbfbf]"
                    id="desc"
                    name="desc"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.desc}
                  />
                  <Dropdown
                    value={formik.values.category}
                    border={`2px solid #bfbfbf`}
                    padding="13px 20px"
                    width="100%"
                    options={categorys}
                    placeholder="Kategoriyani tanlang"
                    handleItem={(item) =>
                      formik.setFieldValue("category", item)
                    }
                  />
                  <label className="text-lg pl-3 font-medium" htmlFor="title">
                    Mahsulot soni
                  </label>
                  <input
                    className="text-lg font-normal pl-3 w-96 rounded-md py-1 outline-none border-2 border-[#bfbfbf]"
                    id="storeCount"
                    name="storeCount"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.storeCount}
                  />
                  <label className="text-lg pl-3 font-medium" htmlFor="title">
                    Rasm tanlash
                  </label>
                  <input
                    className="text-lg font-normal pl-3 w-96 rounded-md py-1 outline-none border-2 border-[#bfbfbf]"
                    type="file"
                    name="img"
                    onChange={(e) => setFiles(e.target.files)}
                    value={formik.values.file}
                  />
                  <div className="flex justify-between gap-5">
                    <button
                      onClick={() => handleCancel()}
                      className="bg-[#ff3e34] rounded-md text-white text-base font-semibold font-serif py-2 px-5"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      className="bg-[#30B545] rounded-md text-white text-base font-semibold font-serif py-2 px-5"
                    >
                      {isEdit.type ? "O'zgartirish" : "Qo'shish"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
