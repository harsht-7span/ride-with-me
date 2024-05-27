// import React, { useState } from "react";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { url } from "./api";

// const Verify = () => {
//   const [otp, setotp] = React.useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const phoneNumber = location.state;
//   const [phoneNumbers] = useState(phoneNumber);
//   const [stateVariable] = useState("91XXXX");
//   const maskedPhoneNumber = phoneNumbers.replace(/\d(?=\d{3})/g, "X");

//   const handleOtp = async () => {
//     try {
//       const response = await axios.post(
//         ` ${url}api/v1/user/verify-otp`,
//         { phoneNumber, otp },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       // Handle response if needed
//       console.log("Response:", response);
//       if (response.data.success == false) {
//         // navigate("/SignIn", { state: phoneNumber });
//         alert("Invalid OTP");
//       }
//       if (response.data.success == true) {
//         // navigate("/SignIn", { state: phoneNumber });

//         navigate("/success");
//       }
//     } catch (error) {
//       // Handle error
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="mt-16 mx-4 font-Poppins ">
//       <div className="pb-[42px]">
//         <p className="font-semibold text-3xl leading-[48px] ">Verify</p>
//         <p className="font-normal text-sm leading-5 text-[#A2A2A2]">
//           Enter the code sent to +91 {maskedPhoneNumber}
//         </p>
//       </div>
//       <div className="flex flex-row h-[72px] gap-4 justify-center">
//         <InputOTP maxLength={4} value={otp} onChange={(value) => setotp(value)}>
//           <InputOTPGroup className="otp-group flex flex-row gap-4 justify-center">
//             <InputOTPSlot
//               index={0}
//               className={`w-[70px] h-[72px] font-Poppins text-5xl leading-[72px] rounded-lg px-2 py-0 border border-[#9E9E9E]  ${
//                 otp.length > 0 ? "border-[#FF6C96]" : ""
//               }`}
//             />
//             <InputOTPSlot
//               index={1}
//               className={`w-[70px] h-[72px] font-Poppins text-5xl leading-[72px] rounded-lg px-2 py-0 border border-[#9E9E9E]  ${
//                 otp.length > 1 ? "border-[#FF6C96]" : ""
//               }`}
//             />
//             <InputOTPSlot
//               index={2}
//               className={`w-[70px] h-[72px] font-Poppins text-5xl leading-[72px] rounded-lg px-2 py-0 border border-[#9E9E9E]  ${
//                 otp.length > 2 ? "border-[#FF6C96]" : ""
//               }`}
//             />
//             <InputOTPSlot
//               index={3}
//               className={`w-[70px] h-[72px] font-Poppins text-5xl leading-[72px] rounded-lg px-2 py-0 border border-[#9E9E9E]  ${
//                 otp.length > 3 ? "border-[#FF6C96]" : ""
//               }`}
//             />
//           </InputOTPGroup>
//         </InputOTP>
//       </div>
//       <div className="flex flex-row justify-center">
//         <button
//           className="w-11/12 h-12 rounded-xl p-2 text-white bg-[#FF6C96] font-semibold text-sm leading-5  mt-6 mx-auto"
//           onClick={handleOtp}
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Verify;

import { verifyOtp } from "@/api/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { setToken } from "@/lib/utils";
import { otpSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const phoneNumber = location.state;
  const maskedPhoneNumber = `91xxxx xx${phoneNumber.slice(-3)}`;

  console.log(phoneNumber);

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      phoneNumber: phoneNumber,
      otp: "",
    },
  });

  const onSubmit = (val) => {
    const { otp } = val;

    let payload = {
      phoneNumber: phoneNumber,
      otp: otp,
    };

    verifyOtp(payload)
      .then((res) => {
        console.log(res);
        setToken(res.data.token);
        toast({
          variant: "success",
          title: res.data.message,
        });
        navigate("/success");
      })
      .catch((res) => {
        toast({
          variant: "destructive",
          title: res.data.message,
        });
      });
    otpForm.reset();
  };

  return (
    <div>
      <div className="container pt-16">
        <div className="flex justify-start">
          <h1 className="text-4xl text-black font-poppins">Verify</h1>
        </div>

        <div className="flex justify-start mt-2">
          <p className="text-sm font-normal text-grayB text-wrap font-poppins">
            Enter the code sent to {maskedPhoneNumber}
          </p>
        </div>

        <div className="flex h-64 mt-8 justify-evenly grow">
          <Form {...otpForm}>
            <form onSubmit={otpForm.handleSubmit(onSubmit)}>
              <FormField
                key="otp"
                name="otp"
                control={otpForm.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <InputOTP maxLength={4} {...field} className="rounded">
                          <InputOTPGroup className="space-x-4">
                            <InputOTPSlot
                              index={0}
                              className="w-[70px] h-[72px] font-Poppins text-5xl leading-[72px]  px-2 py-0 border border-[#9E9E9E] focus:ring-rose focus:border-rose"
                            />
                            <InputOTPSlot
                              index={1}
                              className="w-[70px] h-[72px] font-Poppins text-5xl leading-[72px] px-2 py-0 border border-[#9E9E9E]"
                            />
                            <InputOTPSlot
                              index={2}
                              className=" w-[70px] h-[72px] font-Poppins text-5xl leading-[72px]  px-2 py-0 border border-[#9E9E9E]"
                            />
                            <InputOTPSlot
                              index={3}
                              className="w-[70px] h-[72px] font-Poppins text-5xl leading-[72px]  px-2 py-0 border border-[#9E9E9E]"
                            />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div className="flex font-thin border-2 mt-9 rounded-xl bg-rose">
                <button
                  type="submit"
                  className="w-full gap-2 px-4 py-4 text-sm font-normal text-white font-poppins"
                >
                  Continue
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default VerifyPage;
