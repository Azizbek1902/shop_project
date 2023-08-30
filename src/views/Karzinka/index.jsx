import { BiLeftArrowAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import React from "react";
import { useCart } from "react-use-cart";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCheck } from "../../redux/actions/product";
import products from "../../services/products";

export default () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    isEmpty,
    totalUniqueItems,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
  } = useCart();
  if (isEmpty)
    return (
      <>
        <div className="flex justify-center mt-10">
          <button
            className=" outline-none pl-3 pr-4 py-3 rounded-md text-white font-medium
 font-sans bg-[#30B545]"
            onClick={() => {
              navigate("/");
            }}
          >
            <BiLeftArrowAlt size={30} />
          </button>
        </div>
        <p className="mt-16 text-2xl font-medium font-serif text-center">
          Korzinka mahsulot mavjud emas?
        </p>
      </>
    );
  const hanfldeClik = (data) => {
    removeItem(data._id);
    let newData = {
      id: data._id,
      img: data.img,
      title: data.title,
      desc: data.desc,
      price: data.price,
      status: false,
    };
    products
      .edit(data._id, newData)
      .then()
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="w-[90%] mt-10">
          <button
            className="absolute top-5 left-5 outline-none pl-3 pr-4 py-3 rounded-md text-white font-medium
         font-sans bg-[#30B545]"
            onClick={() => {
              navigate("/");
            }}
          >
            <BiLeftArrowAlt size={30} />
          </button>
          <div className="flex mt-14 justify-center">
            <h1 className="text-xl font-semibold font-mono">
              Sizning mahsulotlaringiz ({totalUniqueItems})
            </h1>
          </div>
          <div className="grid mt-10 grid-cols-1 gap-7 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4">
            {items.map((item, ind) => (
              <div key={ind + 1} className="relative shadowCard">
                <div className="flex items-center gap-5">
                  <button
                    className="text-lg top-3 right-3  absolute outline-none px-2 py-2 rounded-md text-white font-medium
         font-sans bg-[#ff3e34]"
                    onClick={() => hanfldeClik(item)}
                  >
                    <AiFillDelete size={21} />
                  </button>
                  <div className="md:p-10 flex items-center p-2 w-full rounded-lg">
                    <div className="flex pt-5 justify-center">
                      <img
                        src={item.img}
                        className="rounded-full w-36 h-28"
                        alt=""
                      />
                    </div>
                    <div className="w-full pl-5">
                      <div className="flex pb-5 flex-col md:flex-row justify-center md:justify-between gap-3">
                        <h1 className="text-xl font-semibold text-start">
                          {item.title.length > 10
                            ? item.title.slice(0, 10) + "...."
                            : item.title}
                        </h1>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <button
                          className="text-3xl outline-none px-3 pb-1 rounded-md text-white font-medium
         font-sans bg-[#EE8108]"
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <h1 className="text-xl font-sans font-medium">
                          {item.quantity}
                        </h1>
                        <button
                          className="text-3xl outline-none px-3 pb-1 rounded-md text-white font-medium
         font-sans bg-[#EE8108]"
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                        <h1 className="text-xl font-semibold text-center">
                          {item.itemTotal} UZS
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-between">
            <h1 className="text-2xl font-semibold ">Jami summa: </h1>
            <h1 className="text-2xl font-semibold ">{cartTotal} UZS</h1>
          </div>
          <div className="flex justify-center">
            <button
              className="mt-10 mb-5 outline-none pl-3 pr-4 py-3 rounded-md text-white font-medium
         font-sans bg-[#30B545]"
            >
              Buyurtma berish
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
