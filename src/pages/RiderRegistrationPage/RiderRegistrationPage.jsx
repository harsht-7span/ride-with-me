import upload from "../../assets/signup/upload.svg";
const RiderRegistrationPage = () => {
  return (
    <div className="container pt-16">
      {/* <!--[--> */}
      <div className="flex justify-start">
        <h1 className="text-4xl font-semibold text-black font-poppins">
          Vechile
        </h1>
      </div>
      <p className="mt-3 text-sm font-normal text-left text-grayB font-poppins">
        The last step is to fill out your vehicle information{" "}
      </p>
      <form className="mt-9">
        <label className="flex justify-start text-xl font-medium text-black font-poppins">
          Model
        </label>
        <div className="flex">
          <select
            id="model"
            className="w-full px-4 mt-2 border-2 rounded-md font-poppins text-grayB h-14 border-grayB"
            required
          >
            <option disabled selected className="">
              Select car model
            </option>
          </select>
        </div>
        <label className="flex justify-start mt-4 text-xl font-medium text-black font-poppins">
          Year
        </label>
        <div className="flex">
          <select
            id="model"
            className="w-full px-4 mt-2 border-2 rounded-md font-poppins text-grayB h-14 border-grayB"
            required
          >
            <option disabled selected className="">
              Select
            </option>
          </select>
        </div>

        <h2 className="flex justify-start text-xl font-semibold text-black font-poppins mt-14">
          Document
        </h2>

        <h3 className="flex justify-start text-base font-medium font-poppins mt-9">
          Driver’s license<span className="text-base text-BrandColor">*</span>
        </h3>
        <div className="flex items-center justify-center mt-2 border-2 border-dashed border-grayB h-28 w-28">
          <div className="flex flex-col">
            <label htmlFor="upload-photo" className="flex justify-center">
              <img src={upload} alt="upload"></img>
            </label>
            <input type="file" name="photo" id="upload-photo" />
            <span className="flex justify-start text-sm italic font-poppins text-grayB">
              Upto 1MB
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RiderRegistrationPage;
