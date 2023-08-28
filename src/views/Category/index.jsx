import { BiAddToQueue } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { BiMessageSquareEdit } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import category from "../../services/category";

export default () => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(null);
  const [categoryValue, setCategoryValue] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    category
      .getAll()
      .then((res) => {
        setData(res);
        setRefresh(refresh ? false : true);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  const handleClik = () => {
    const payload = {
      title: categoryValue,
    };
    if (edit !== null) {
      category
        .edit(edit, payload)
        .then()
        .catch((err) => console.log(err));
    } else {
      category
        .create(payload)
        .then()
        .catch((err) => console.log(err));
    }
    setCategoryValue("");
    setModal(false);
    setEdit(null);
    setRefresh(refresh ? false : true);
  };
  const handleEdit = (item) => {
    setModal(true);
    setEdit(item._id);
    setCategoryValue(item.title);
  };
  const handleDelete = (id) => {
    setRefresh(refresh ? false : true);
    category
      .delete(id)
      .then()
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {modal ? (
        <>
          <div className="absolute z-50 w-full left-0 bg-[#000000c6]">
            <div className="flex justify-center items-center h-screen">
              <div className="bg-white rounded-md p-10 md:min-w-[400px]">
                <h1
                  className="text-xl font-semibold text-center pb-5 "
                >
                  Kategoriya qo'shish
                </h1>
                <input
                  type="text"
                  placeholder="Nomi..."
                  value={categoryValue}
                  onChange={(e) => setCategoryValue(e.target.value)}
                  className="py-2 pl-4 mb-5 outline-none border-2 border-gray-400 w-full rounded-md"
                />

                <div className="flex justify-between gap-3">
                  <button
                    onClick={() => setModal(false)}
                    className={`text-lg outline-none flex justify-center items-center px-5 py-2 rounded-md text-white font-medium
                    font-sans bg-[#ff3e34]`}
                  >
                    Bekor qilish
                  </button>
                  <button
                    onClick={() => handleClik()}
                    className={`text-lg outline-none flex justify-center items-center px-5 py-2 rounded-md text-white font-medium
             font-sans bg-[#30B545]`}
                  >
                    {edit ? "Edit" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="flex justify-end mr-10 py-10">
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
      <div className="flex justify-center">
        <div className="w-[95%]">
          <div className="grid grid-cols-1 gap-5">
            {data.map((item) => (
              <div
                key={item.id}
                className="shadowCard flex justify-between items-center px-10 rounded-md p-3"
              >
                <div className="text-xl text-center font-semibold">
                  {item.title}
                </div>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className={`text-lg outline-none flex justify-center items-center px-5 py-2 rounded-md text-white font-medium
           font-sans bg-[#53b8f7]`}
                  >
                    <BiMessageSquareEdit size={25} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className={`text-lg outline-none flex justify-center items-center px-5 py-2 rounded-md text-white font-medium
           font-sans bg-[#ff3e34]`}
                  >
                    <AiFillDelete size={25} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
