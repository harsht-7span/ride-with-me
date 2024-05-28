import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@/components/ui";
import React from "react";
import loginImg from "../../assets/login.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation";
import Phone from "@/assets/icons/phone";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "@/api/auth";
import { useToast } from "@/components/ui/use-toast";

function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const numberInputOnWheelPreventChange = (e) => {
    // Prevent the input value change
    e.target.blur();

    // Prevent the page/container scrolling
    e.stopPropagation();

    setTimeout(() => {
      e.target.focus();
    }, 0);
  };

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onsubmit = (val) => {
    const { phoneNumber } = val;

    let payload = {
      phoneNumber: phoneNumber,
    };

    logIn(payload)
      .then((res) => {
        toast({
          variant: "success",
          title: res.data.message,
          isClosable: true,
          autodismisstimeout: 1,
        });
        navigate("/verify", { state: phoneNumber });
      })
      .catch((res) => {
        toast({
          variant: "destructive",
          title: "NO USER FOUND!!" || res.message,
          isClosable: true,
          autodismisstimeout: 1,
        });
        // navigate("/signup");
        // navigate("/verify");
      });

    loginForm.reset();
  };

  return (
    <div
      id="parent"
      className="container w-screen h-screen flex flex-col justify-between pb-6"
    >
      <div>
        <div id="loginImg" className="flex justify-center pb-3 pt-7">
          <img src={loginImg} alt="" />
        </div>

        <h1 className="text-2xl font-semibold text-center">
          Welcome to Easy Go!
        </h1>

        <Form {...loginForm}>
          <form
            className="pt-10 flex flex-col gap-10"
            onSubmit={loginForm.handleSubmit(onsubmit)}
          >
            <FormField
              key="phoneNumber"
              name="phoneNumber"
              control={loginForm.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center px-2 border rounded">
                        <Phone />
                        <Input
                          onInput={(e) => {
                            if (e.target.value.length >= 10) {
                              e.target.value = e.target.value.slice(0, 10);
                            }
                          }}
                          type="number"
                          onWheel={numberInputOnWheelPreventChange}
                          placeholder="Mobile"
                          {...field}
                          className="text-gray-500 border-0"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit" className="w-full text-sm font-bold rounded">
              Sign In
            </Button>
          </form>
        </Form>
      </div>
      <div>
        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-rose">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
