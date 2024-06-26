import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/validation";
import { signUp } from "@/api/auth";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@/components/ui";
import Phone from "@/assets/icons/phone";
import { User } from "@/assets/icons";
import Email from "@/assets/icons/email";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { setToken } from "@/lib/utils";

function SignUpPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const phoneNumber = location.state;

  const numberInputOnWheelPreventChange = (e) => {
    // Prevent the input value change
    e.target.blur();

    // Prevent the page/container scrolling
    e.stopPropagation();

    setTimeout(() => {
      e.target.focus();
    }, 0);
  };

  const signupForm = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      phoneNumber: phoneNumber,
      email: "",
      role: "user",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = (val) => {
    const { name, phoneNumber, email } = val;

    let payload = {
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      role: "user",
      // availability: "unavailable",
    };

    signUp(payload)
      .then((res) => {
        setToken(res.data);
        toast({
          variant: "success",
          title: res.data.message,
        });
        navigate("/");
      })
      .catch((res) => {
        toast({
          variant: "destructive",
          title: res.response.data.message,
        });
        navigate("/login");
      });

    signupForm.reset();
  };

  return (
    <>
      <div className="container max-w-96 pt-16">
        <div className="flex justify-start">
          <h1 className="font-poppins text-black font-semibold text-4xl">
            Sign Up
          </h1>
        </div>
        <div className="flex justify-start mt-2">
          <span className="text-gray-400 font-poppins text-sm font-normal">
            Please enter your details
          </span>
        </div>

        <div className="pt-14">
          <Form {...signupForm}>
            <form onSubmit={signupForm.handleSubmit(onSubmit)}>
              <div className=" space-y-3">
                <FormField
                  key="name"
                  name="name"
                  control={signupForm.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center px-2  border rounded">
                            <User />
                            <Input
                              placeholder="Name"
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

                <FormField
                  key="phoneNumber"
                  name="phoneNumber"
                  control={signupForm.control}
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
                              placeholder="Mobile"
                              onWheel={numberInputOnWheelPreventChange}
                              type="number"
                              {...field}
                              className="text-gray-500 border-0 "
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  key="email"
                  name="email"
                  control={signupForm.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center px-2 border rounded">
                            <Email />
                            <Input
                              type="email"
                              placeholder="Email"
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
              </div>
              <Button
                type="submit"
                className="mt-10 w-full text-sm font-bold rounded"
              >
                Verify mobile number
              </Button>
            </form>
          </Form>
        </div>
        <div>
          <div className="mb-6 top-96 flex justify-center grow h-52 items-end">
            <h3 className="text-sm text-grayB">
              Already have an account?{" "}
              <span className="text-sm text-rose font-normal text-BrandColor">
                <Link to="/">Sign In</Link>
              </span>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
