import { AiFillShop } from "react-icons/ai";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { RiMenuFoldFill } from "react-icons/ri";
import React from "react";
import { NavLink } from "react-router-dom";

export default ({ open, onclik, pageFunk }) => {
  return (
    <div className="z-30">
      <div className="relative">
        <div onClick={onclik} className="absolute top-3 right-4 bg-none">
          {open ? (
            <RiMenuFoldFill size={25} color="black" />
          ) : (
            <RiMenuUnfoldFill size={25} color="black" />
          )}
        </div>
        <div
          className={`overflow-hidden pt-20 flex ${
            open ? "justify-start pl-5" : "justify-center"
          }`}
        >
          <ul className="block">
            <li
              onClick={() => pageFunk("home")}
              className={`pb-5 text-xl font-semibold flex gap-5 font-serif`}
            >
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? `active py-2 pl-4 ${open ? "pr-16 pl-2" : "pl-2 pr-4"}`
                    : `default hover:pl-2 px-2  ${
                        open ? "hover:pr-16" : "hover:pr-2"
                      } py-2 pl-2`
                }
                to={"/dashboard"}
              >
                <AiFillHome size={25} />
                {open ? "Products" : <></>}
              </NavLink>
            </li>
            <li
              onClick={() => pageFunk("category")}
              className={`pb-5 text-xl font-semibold flex gap-5 font-serif`}
            >
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? `active py-2 pl-4 ${open ? "pr-16 pl-2" : "pl-2 pr-4"}`
                    : `default hover:pl-2 px-2  ${
                        open ? "hover:pr-16" : "hover:pr-2"
                      } py-2 pl-2`
                }
                to={"/dashboard"}
              >
                <AiFillShop size={25} />
                {open ? "Category" : <></>}
              </NavLink>
            </li>
            <li
              onClick={() => pageFunk("about")}
              className="pb-5 text-xl font-semibold flex gap-5 font-serif"
            >
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? `active py-2 pl-4 ${open ? "pr-16 pl-2" : "pl-2 pr-4"}`
                    : `default hover:pl-2 px-2  ${
                        open ? "hover:pr-16" : "hover:pr-2"
                      } py-2 pl-2`
                }
                to={"/dashboard"}
              >
                <BsFillPersonBadgeFill size={25} />
                {open ? "Order" : <></>}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
