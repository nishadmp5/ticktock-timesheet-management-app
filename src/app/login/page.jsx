"use client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  //  Email and Password Validation
  const validateForm = () => {
    if (!email || !password) {
      toast.error("Email and password are required.");
      return false;
    } 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      remember: remember.toString(),
    });
    if (res.ok) {
      router.push("/");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <section className="w-full h-screen min-h-[600px] flex">
      {/* FORM SECTION  */}
      <div className="h-full w-1/2 flex justify-center items-center px-18 relative">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          <h2 className="font-bold text-20 leading-25 tracking-0 ">
            Welcome back
          </h2>
          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="email"
              className="font-medium text-14 leading-5 tracking-0"
            >
              Email
            </label>
            <input
              id="email"
              placeholder="name@example.com"
              type="email"
              value={email}
              className="w-full border border-[#D1D5DB] rounded-lg py-3 px-4 text-secondary outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="password"
              className="font-medium text-14 leading-5 tracking-0"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              className="w-full border border-[#D1D5DB] rounded-lg py-3 px-4 text-secondary outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              className="appearance-none size-4 rounded-sm border-[0.5px] border-[#D1D5DB] bg-[#F9FAFB] checked:bg-blue checked:bg-[url(/icons/white-tick.svg)] checked:bg-no-repeat checked:bg-contain checked:bg-center"
              id="checkbox"
              type="checkbox"
                onChange={(e) => setRemember(e.target.checked)}
            />
            <label
              htmlFor="checkbox"
              className="font-medium text-14 leading-3.5 tracking-0 text-secondary"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-primary-dark hover:bg-primary cursor-pointer transition-colors text-white font-medium  text-14 leading-5 tracking-0 rounded-lg py-2.5"
          >
            Sign in
          </button>
        </form>
        <div className="absolute bottom-12 w-full ">
          <p className="text-center font-normal text-14 leading-5 tracking-0 text-secondary">
            © 2024 abcd
          </p>
        </div>
      </div>

      {/* CONTEXT SECTION  */}
      <div className="h-full w-1/2 bg-primary flex justify-center items-center px-18">
        <div className="w-full flex flex-col">
          <h1 className="font-semibold text-40 leading-5 tracking-0 text-white">
            ticktock
          </h1>
          <p className="font-normal text-base leading-5 tracking-0 text-[#E5E7EB] mt-3">
            Introducing ticktock, our cutting-edge timesheet web application
            designed to revolutionize how you manage employee work hours. With
            ticktock, you can effortlessly track and monitor employee attendance
            and productivity from anywhere, anytime, using any
            internet-connected device.
          </p>
        </div>
      </div>
    </section>
  );
};

export default page;
