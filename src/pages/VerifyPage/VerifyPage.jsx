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
  const maskedPhoneNumber = `${phoneNumber.slice(
    0,
    2
  )}xxx xx${phoneNumber.slice(-3)}`;

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
        setToken(res.data);
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
