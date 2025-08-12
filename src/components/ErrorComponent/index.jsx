import React from "react";

const ErrorComponent = ({errorMessage}) => {
  return (
    <div className="w-full h-[200px] flex justify-center items-center">
      <p className="text-danger font-medium text-14 leading-5 tracking-0">
        {errorMessage || "Something went wrong. Please try again later."}
      </p>
    </div>
  );
};

export default ErrorComponent;
