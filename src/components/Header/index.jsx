import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "@/lib/auth";
import { IoChevronDownOutline } from "react-icons/io5";


const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="fixed w-full  px-4 py-4 bg-white shadow-[0_0_2px] shadow-[#E2F3EA]">
      <div className="flex justify-between items-center">
        <div className="flex justify-between gap-8 items-center">
          <p className="font-semibold text-24 leading-5 tracking-0">ticktock</p>
          <p className="font-medium text-14 leading-5 tracking-0">Timesheets</p>
        </div>
        <div className="flex justify-between items-center gap-1.5">
          <p className="font-medium text-base leading-5 tracking-0 text-secondary">{session?.user?.name}</p>
          <IoChevronDownOutline className="text-secondary"/>
        </div>
      </div>
    </header>
  );
};

export default Header;
