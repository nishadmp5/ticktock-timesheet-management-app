import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "@/lib/auth";
import Footer from "@/components/Footer";

const MainLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  return (
    <>
      <Header />
      <main className="container pt-[calc(var(--header-height)+27px)] pb-18.5">
        {children}
        <Footer />
      </main>
    </>
  );
};

export default MainLayout;
