import React from "react";
// import { Rikshaw, Location, Verticleline, Driver, Phone } from "@/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "react-modern-drawer/dist/index.css";
import Phone from "@/assets/icons/phone";

const PaymentDetails = () => {
  const navigate = useNavigate();

  const paymode = () => {
    navigate("/paymode");
  };

  return (
    <>
      <div className="px-4 w-full text-left font-poppins ">
        <div className="mt-5">
          <h1 className="font-medium text-base leading-6">Ride Details</h1>
          <div className="flex flex-row mt-2">
            {/* <Location className="h-5 w-5" /> */}
            <p className=" font-normal text-sm text-[#A2A2A2] leading-5">
              Marengo CIMS Hospital
            </p>
          </div>
          {/* <Verticleline className="m-1 left-1 relative" /> */}
          <div className="flex flex-row mt-2">
            {/* <Location className="h-5 w-5" /> */}
            <p className=" font-normal text-sm text-[#A2A2A2] leading-5">
              Marengo CIMS Hospital
            </p>
          </div>
        </div>

        <hr className="mt-2" />

        <div>
          <h1 className="font-medium text-base mt-6 leading-6">
            Payment Details
          </h1>
          <p className="font-medium text-base leading-5 text-[#9E9E9E] mt-2 mb-2">
            <span className="pr-2">₹</span>
            <span>65</span>
          </p>
        </div>

        <hr />

        <hr />

        <div className="flex flex-row justify-between mt-6">
          {/* <div className="flex flex-row gap-3"> */}
          <img
            src="./src/assets/driver.png"
            alt="driver"
            className="h-12 w-12"
          />
          <p className="font-medium text-base leading-6 max-w-24 -left-14 relative">
            David Black{" "}
            <span className="font-normal text-sm text-[#757575]">
              GJ03DQ5551
            </span>
          </p>

          {/* </div> */}
          <div>
            <Phone className="h-8 w-8 mr-4" />
          </div>
        </div>

        <button
          className="w-full h-12 items-center rounded-xl p-2 text-white bg-rose font-semibold text-sm leading-5 mx-auto mt-[120px]"
          onClick={paymode}
        >
          Pay
        </button>
      </div>
    </>
  );
};

export default PaymentDetails;
