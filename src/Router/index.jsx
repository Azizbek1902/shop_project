import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Home from "../views/Home";
import Order from "../views/Order";
import Category from "../views/Category";

export default () => {
  const [page, setPage] = useState("home");
  const [open, setOpen] = useState(true);
  const handleClik = () => {
    setOpen(!open);
  };
  const handlePage = (page) => {
    setPage(page);
  };
  let pages = {
    home: <Home pageFunc={handlePage} />,
    category: <Category />,
    about: <Order />,
  };
  return (
    <div>
      <div className="flex">
        <div
          className={` transitionNav border-r-2 border-blue-300 h-screen ${
            open ? "w-[340px]" : "w-[90px]"
          }`}
        >
          <Navbar open={open} onclik={handleClik} pageFunk={handlePage} />
        </div>
        <div className="w-full">{pages[page]}</div>
      </div>
    </div>
  );
};
