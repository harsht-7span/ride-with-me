import { Arrow } from "@/assets/icons";

import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentMode = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="mx-3">
      <div className="mt-4 flex gap-6">
        <div onClick={goBack} className="cursor-pointer">
          <Arrow className="mt-2 ml-2 cursor-pointer" />
        </div>
        <p className="font-semibold text-xl leading-7">Payment Information</p>
      </div>
      <div className="mt-11 flex justify-center">
        {/* <DisplayEdit className="h-24 w-24 " /> */}
      </div>

      <div className="flex flex-col mt-7">
        <div>
          <p className="font-normal flex justify-start text-sm leading-5 text-[#424242]">
            Full Name
          </p>
          <input
            type="text"
            className="border w-full h-[48px] rounded-lg  pl-5 py-3 "
            placeholder="Name"
          />
        </div>
        <div>
          <p className="font-normal flex justify-start text-sm leading-5 mt-6 text-[#424242]">
            Card Number
          </p>
          <input
            type="number"
            className="border w-full h-[48px] rounded-lg  pl-5 py-3 "
            maxLength={16}
            placeholder="1234 1234 1234 1234"
          />
        </div>
        <div>
          <p className="font-normal flex justify-start text-sm leading-5 mt-6 text-[#424242]">
            End Date
          </p>
          <input
            type="date"
            className="border w-full h-[48px] rounded-lg  pl-5 py-3 "
            placeholder="MM/YY"
          />
        </div>
        <div>
          <p className="font-normal flex justify-start text-sm leading-5 mt-6 text-[#424242]">
            CVV
          </p>
          <input
            type="text"
            className="border w-full h-[48px] rounded-lg  pl-5 py-3 "
            placeholder="..."
          />
        </div>
        <div>
          <p className="font-normal flex justify-start text-sm leading-5 mt-6 text-[#424242]">
            Zip Code
          </p>
          <input
            type="text"
            className="border w-full h-[48px] rounded-lg  pl-5 py-3 "
            maxLength={6}
            placeholder="123456"
          />
        </div>
        <div>
          <button className="w-full h-12 rounded-xl p-2 text-white bg-[#FF6C96] font-semibold text-sm leading-5 mx-auto mt-8">
            Confirm Payment
          </button>
          <p className="font-normal flex justify-start text-xs leading-4 mb-20">
            You verify that this info is correct
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMode;
