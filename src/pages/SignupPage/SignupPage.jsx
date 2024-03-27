import user from "../../assets/signup/user.svg";
import mobile from "../../assets/signup/phone.svg";
import email from "../../assets/signup/email.svg";
import password from "../../assets/signup/email.svg";

const SignUpPage = () => {
  return (
    <>
      <div className="container pt-16">
        {/* <!--[--> */}
        <div className="flex justify-start">
          <h1 className="font-poppins text-black font-semibold text-4xl">
            Sign Up
          </h1>
        </div>
        <div className="flex justify-start mt-2">
          <span className="text-grayB font-poppins text-sm font-normal">
            Please enter your details
          </span>
        </div>
        <div className="mt-14">
          {/* <!--[--> */}
          <form>
            <div className="flex border-2 border-grayB font-thin w-full rounded-md py-4 px-4 gap-2">
              <img src={user} alt="image" />
              <input
                type="text"
                id="username"
                placeholder="Name"
                className="font-poppins text-grayB font-normal text-sm"
              />
            </div>
            <div className="flex border-2 mt-9 border-grayB font-thin w-full rounded-md py-4 px-4 gap-2">
              <img src={mobile} alt="image" />
              <input
                type="number"
                id="mobile"
                pattern="[0-9]{10}"
                placeholder="Mobile"
                className="font-poppins text-grayB font-extralight text-sm"
              />
            </div>
            <div className="flex border-2 mt-9 border-grayB font-thin w-full rounded-md py-4 px-4 gap-2">
              <img src={email} alt="image" />
              <input
                type="email"
                id="email"
                placeholder="Email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                className="font-poppins text-grayB font-normal text-sm"
              />
            </div>
            <div className="flex border-2 mt-9 border-grayB font-thin w-full rounded-md py-4 px-4 gap-2">
              <img src={password} alt="image" />
              <input
                type="password"
                id="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                placeholder="Password"
                className="font-poppins text-grayB font-normal text-sm"
              />
            </div>
          </form>
        </div>
        <div>
          {/* <!--[--> */}
          <div className="flex border-2 mt-9  font-thin rounded-xl bg-BrandColor">
            <button
              type="submit"
              className="font-poppins w-full py-4 px-4 gap-2 text-white font-normal text-sm"
            >
              Verify mobile number
            </button>
          </div>
          <div className="mb-6 top-96 flex justify-center grow h-52 items-end">
            <h3 className="text-sm text-grayB">
              Already have an account?{" "}
              <button className="text-sm font-normal text-BrandColor">
                Sign In
              </button>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
