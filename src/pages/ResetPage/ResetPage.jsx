import mobile from "../../assets/signup/phone.svg";

const ResetPage = () => {
  return (
    <div>
      <div className="container pt-16">
        {/* <!--[--> */}
        <div className="flex justify-start">
          <h1 className="font-poppins font-semibold text-black text-4xl">
            Reset
          </h1>
        </div>
        <p className="mt-2 text-grayB text-left text-wrap font-poppins text-sm font-thin">
          Don’t worry! It occurs. Please enter the email address link with your
          account
        </p>
        <div className="mt-16">
          {/* <!--[--> */}
          <form>
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
          </form>
        </div>
        <div>
          {/* <!--[--> */}
          <div className="flex border-2 mt-9 font-thin rounded-xl bg-BrandColor">
            <button
              type="submit"
              className="font-poppins w-full py-4 px-4 gap-2 text-white font-normal text-sm"
            >
              Send Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResetPage;
