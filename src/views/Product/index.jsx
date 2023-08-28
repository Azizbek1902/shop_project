import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { BiCheckCircle } from "react-icons/bi";
import { TiShoppingCart } from "react-icons/ti";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCheck } from "../../redux/actions/product";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";

export default () => {
  const { addItem, items, totalUniqueItems } = useCart();
  const dataProduct = useSelector((state) => state.productReducer.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClik = (data) => {
    dataProduct.map((item) => {
      if (item.id == data.id) {
        if (!item.checked) {
          console.log(item, "item");
          let newData = {
            id: data.id,
            img: data.img,
            title: data.title,
            desc: data.desc,
            price: data.price,
            checked: true,
          };
          addItem(data);
          dispatch(updateCheck(newData));
        }
      } else {
        console.log("errr");
      }
    });
  };

  return (
    <div>
      <div className="mt-4 mb-10 flex overflow-x-auto justify-center mx-4">
        <div className="flex gap-4 w-[900px] md:pl-0 pl-44 justify-center">
          <button
            className="text-lg outline-none h-16 px-5 py-2 w-40 rounded-md focus:text-white text-black font-bold
           font-sans bg-[#F0F0F0] focus:bg-[#EE8108]"
          >
            Cheescakes
          </button>
          <button
            className="text-lg outline-none h-16 px-5 py-2 w-40 rounded-md focus:text-white text-black font-bold
           font-sans bg-[#F0F0F0] focus:bg-[#EE8108]"
          >
            Cakes
          </button>
          <button
            className="text-lg outline-none h-16 px-5 py-2 w-40 leading-6 rounded-md focus:text-white text-black font-bold
           font-sans bg-[#F0F0F0] focus:bg-[#EE8108]"
          >
            Muchniy izdeliya
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-[95%] md:w-[90%]">
          <div className="grid grid-cols-2 gap-7 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4">
            {dataProduct.map((item, ind) => (
              <div key={ind + 1}>
                <div className="md:p-10 p-5 rounded-lg shadowCard">
                  <div
                    className="flex cursor-pointer justify-center"
                    onClick={() => {
                      navigate("/batafsil", {
                        state: item,
                      });
                    }}
                  >
                    <img src={item.img} className="rounded-full" alt="" />
                  </div>
                  <div className="flex py-5 flex-col md:flex-row justify-center md:justify-between gap-3">
                    <h1 className="text-xl font-semibold text-center">
                      {item.title.length > 9
                        ? item.title.slice(0, 9) + "...."
                        : item.title}
                    </h1>
                    <h1 className="text-xl font-semibold text-center">
                      {item.price} UZS
                    </h1>
                  </div>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleClik(item)}
                      className={`text-lg outline-none flex justify-center items-center px-5 py-2 rounded-md text-white font-medium
           font-sans ${item.checked ? "bg-[#30B545]" : "bg-[#EE8108]"}`}
                    >
                      {item.checked ? (
                        <BiCheckCircle color="white" size={25} />
                      ) : (
                        <TiShoppingCart color="white" size={25} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {items?.length ? (
            <div className="">
              <div className="flex fixed justify-center bottom-10 right-4">
                <button
                  onClick={() => {
                    navigate("/corzinka");
                  }}
                  className="outline-none relative pl-3 pr-7 shadowShopIcon py-5 rounded-full bg-[#30b544e7] text-white font-medium
           font-sans border-2 border-[#30B545]"
                >
                  <MdOutlineShoppingCartCheckout size={35} color="white" />
                  <span className="top-1 right-1 absolute  font-bold font-serif text-base px-2 items-center rounded-full text-white">
                    ({totalUniqueItems})
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};