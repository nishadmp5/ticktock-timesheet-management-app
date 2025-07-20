import React from "react";
import { BsThreeDots } from "react-icons/bs";

const ActionMenu = () => {


  return (
    <div  className="relative group " >
      <BsThreeDots className="text-secondary cursor-pointer z-1" />
      <div role="menu" className={`z-20 absolute right-0 top-full  rounded-lg bg-white shadow-[0_1px_3px_-1px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col group-hover:opacity-100 group-hover:pointer-events-auto opacity-0 pointer-events-none transition-opacity"}`}>
        <button role="menuitem" className="py-2.5 pl-4 pr-9.5 text-left text-[#374151] font-normal text-14 leading-5 tracking-0 hover:bg-[#f7f7f7] cursor-pointer">
          Edit
        </button>
        <button role="menuitem" className="py-2.5 pl-4 pr-9.5 text-left text-[#E02424] font-normal text-14 leading-5 tracking-0 hover:bg-[#f7f7f7] cursor-pointer">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ActionMenu;
