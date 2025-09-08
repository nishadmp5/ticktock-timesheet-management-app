"use client";

import { signOut } from "next-auth/react";
import React from "react";
import { IoChevronDownOutline } from "react-icons/io5";

const Logout = ({username}) => {


  const handleLogoutClick = () => {
    signOut({ callbackUrl: '/login' });
  }
  return (
    <div
      onClick={handleLogoutClick}
      className="flex justify-between items-center gap-1.5 relative cursor-pointer group"
    >
      <p className="font-medium text-base leading-5 tracking-0 text-secondary">
        {username}
      </p>
      <IoChevronDownOutline className="text-secondary" />
      <div className="absolute top-full left-0 bg-white p-5 hidden group-hover:block">
        <p className="text-14 text-secondary">Logout</p>
      </div>
    </div>
  );
};

export default Logout;
