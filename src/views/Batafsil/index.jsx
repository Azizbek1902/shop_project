import { BiLogOut } from "react-icons/bi";
import { MdAddShoppingCart } from "react-icons/md";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { useDispatch, useSelector } from "react-redux";
import { updateCheck } from "../../redux/actions/product";

export default () => {
  const navigate = useNavigate();
  const dataProduct = useSelector((state) => state.productReducer.products);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { addItem } = useCart();
  let keyData = [];
  let valueData = [];
  if (state.property) {
    for (const [key, value] of Object.entries(state.property)) {
      keyData.push(key);
      valueData.push(value);
    }
  }
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
          navigate("/corzinka");
          dispatch(updateCheck(newData));
        }
      } else {
        console.log("errr");
      }
    });
  };
  return (
    <div className="">
      <div className=" absolute top-5 flex justify-center left-0 w-full">
        <button
          className=" outline-none px-5 py-2 rounded-md text-white font-medium
         font-sans bg-[#30B545]"
          onClick={() => {
            navigate("/");
          }}
        >
          <BiLogOut size={30} />
        </button>
      </div>
      <div className="flex justify-center mt-28">
        <div className="w-[90%] md:w-[90%]">
          <div className="grid shadowCard rounded-lg grid-cols-1 md:grid-cols-2 gap-10">
            <div className="rounded-md">
              <img
                src={state.img}
                className="w-full rounded-md h-auto"
                alt=""
              />
            </div>
            <div className="p-5 rounded-md">
              <table className="w-full">
                <tr className="border-2 border-[#aeaeae]">
                  <td className="text-lg font-bold py-2 px-3 border-2 border-[#aeaeae]">
                    Nomi:
                  </td>
                  <td className="text-md font-medium py-2 pl-3 border-2 border-[#aeaeae]">
                    {state.title}
                  </td>
                </tr>
                <tr className="border-2 border-[#aeaeae]">
                  <td className="text-lg font-bold py-2 px-3 border-2 border-[#aeaeae]">
                    Narxi:
                  </td>
                  <td className="text-md font-medium py-2 pl-3 border-2 border-[#aeaeae]">
                    {state.price}
                  </td>
                </tr>
                {keyData.map((item, ind) => (
                  <tr className="border-2 border-[#aeaeae]">
                    <td className="text-lg font-bold py-2 px-3 border-2 border-[#aeaeae]">
                      <span>{item}:</span>
                    </td>
                    <td className="text-md font-medium py-2 pl-3 border-2 border-[#aeaeae]">
                      {valueData[ind]}
                    </td>
                  </tr>
                ))}
                <tr className="border-2 border-[#aeaeae]">
                  <td className="text-lg font-bold py-2 px-3 border-2 border-[#aeaeae]">
                    Malumot:
                  </td>
                  <td className="text-md font-medium py-2 pl-3 border-2 border-[#aeaeae]">
                    {state.desc}
                  </td>
                </tr>
              </table>
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => handleClik(state)}
                  className="text-lg outline-none px-5 py-2 rounded-md text-white font-medium
           font-sans bg-[#30B545]"
                >
                  <MdAddShoppingCart size={30} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
