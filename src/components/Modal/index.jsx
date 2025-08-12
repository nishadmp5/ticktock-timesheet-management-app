"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, show, className, handleClose, ...props }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {typeof window !== "undefined" &&
        createPortal(
          <>
            {show && (
              <>
                <div
                  className="fixed pointer-events-none top-0 left-0 w-screen h-screen z-99 overflow-y-auto"
                  role="dialog"
                  tabIndex="-1"
                >
                  <div
                    className={`relative pointer-events-auto bg-white z-10  w-full transition-[transform,opacity] will-change-[opacity,transform] flex sm:me-0 sm:ms-auto h-screen xl:max-w-[950px] max-w-none
                    ${className}`}
                    {...props}
                  >
                    {children}
                  </div>
                </div>
                <div
                  className="fixed w-screen h-screen left-0 top-0 bg-[#00000094] z-98 hidden lg:block"
                  onClick={handleClose}
                ></div>
              </>
            )}
          </>,
          document.body
        )}
    </>
  );
};

export default Modal;
