import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "./api";

const Verify = () => {
  const [otp, setotp] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state;
  const [phoneNumbers] = useState(phoneNumber);
  const [stateVariable] = useState("91XXXX");
  const maskedPhoneNumber = phoneNumbers.replace(/\d(?=\d{3})/g, "X");

  const handleOtp = async () => {
    try {
      const response = await axios.post(
        ` ${url}api/v1/user/verify-otp`,
        { phoneNumber, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Handle response if needed
      console.log("Response:", response);
      if (response.data.success == false) {
        // navigate("/SignIn", { state: phoneNumber });
        alert("Invalid OTP");
      }
      if (response.data.success == true) {
        // navigate("/SignIn", { state: phoneNumber });

        navigate("/success");
      }
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };

  return (
    <div className="mt-16 mx-4 font-Poppins ">
      <div className="pb-[42px]">
        <p className="font-semibold text-3xl leading-[48px] ">Verify</p>
        <p className="font-normal text-sm leading-5 text-[#A2A2A2]">
          Enter the code sent to +91 {maskedPhoneNumber}
        </p>
      </div>
      <div className="flex flex-row h-[72px] gap-4 justify-center">
        <InputOTP maxLength={4} value={otp} onChange={(value) => setotp(value)}>
          <InputOTPGroup className="otp-group flex flex-row gap-4 justify-center">
            <InputOTPSlot
              index={0}
              className={`w-[70px] h-[72px] font-Poppins text-5xl leading-[72px] rounded-lg px-2 py-0 border border-[#9E9E9E]  ${
                otp.length > 0 ? "border-[#FF6C96]" : ""
              }`}
            />
            <InputOTPSlot
              index={1}
              className={`w-[70px] h-[72px] font-Poppins text-5xl leading-[72px] rounded-lg px-2 py-0 border border-[#9E9E9E]  ${
                otp.length > 1 ? "border-[#FF6C96]" : ""
              }`}
            />
            <InputOTPSlot
              index={2}
              className={`w-[70px] h-[72px] font-Poppins text-5xl leading-[72px] rounded-lg px-2 py-0 border border-[#9E9E9E]  ${
                otp.length > 2 ? "border-[#FF6C96]" : ""
              }`}
            />
            <InputOTPSlot
              index={3}
              className={`w-[70px] h-[72px] font-Poppins text-5xl leading-[72px] rounded-lg px-2 py-0 border border-[#9E9E9E]  ${
                otp.length > 3 ? "border-[#FF6C96]" : ""
              }`}
            />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="flex flex-row justify-center">
        <button
          className="w-11/12 h-12 rounded-xl p-2 text-white bg-[#FF6C96] font-semibold text-sm leading-5  mt-6 mx-auto"
          onClick={handleOtp}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Verify;
