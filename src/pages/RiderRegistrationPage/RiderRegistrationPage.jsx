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
      <p className="mt-3 text-sm font-normal text-left text-gray-500 font-poppins">
        The last step is to fill out your vehicle information{" "}
      </p>
      <form className="mt-9">
        <label className="flex justify-start text-xl font-medium text-black font-poppins">
          Vehicle Type <span className="text-rose">*</span>
        </label>
        <div className="flex pb-6 pt-">
          <select
            id="model"
            className="w-full px-4 mt-2 border-2 rounded-md font-poppins text-gray-500 h-14 border-grayB"
            required
          >
            <option disabled selected className="">
              Select car model
            </option>
          </select>
        </div>
        <label className="flex justify-start text-xl font-medium text-black font-poppins">
          Model<span className="text-rose">*</span>
        </label>
        <div className="flex">
          <select
            id="model"
            className="w-full px-4 mt-2 border-2 rounded-md font-poppins text-gray-500 h-14 border-grayB"
            required
          >
            <option disabled selected className="">
              Type
            </option>
          </select>
        </div>
        <label className="flex justify-start mt-4 text-xl font-medium text-black font-poppins">
          Year<span className="text-rose">*</span>
        </label>
        <div className="flex">
          <select
            id="model"
            className="w-full px-4 mt-2 border-2 rounded-md font-poppins text-gray-500 h-14 border-grayB"
            required
          >
            <option disabled selected className="">
              Select
            </option>
          </select>
        </div>

        <h2 className="flex justify-start text-2xl font-semibold text-black font-poppins mt-14">
          Captain’s Document
        </h2>
        <div id="captainDetails" className="grid grid-cols-2 w-full gap-4 ">
          <div>
            <h3 className="flex justify-start text-base font-medium font-poppins pt-9">
              Captain’s license
              <span className="text-base text-rose">*</span>
            </h3>
            <div className="flex items-center justify-center mt-2 border-2 border-grayB p-11 rounded">
              <div className="flex flex-col">
                <label htmlFor="upload-photo" className="flex justify-center">
                  <img src={upload} alt="upload"></img>
                </label>
                <input type="file" name="photo" id="upload-photo" />
                <span className="flex justify-start text-sm italic font-poppins text-gray-500">
                  Upto 1MB
                </span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="flex justify-start text-base font-medium font-poppins pt-9">
              Aadhar card
              <span className="text-base text-rose">*</span>
            </h3>
            <div className="flex items-center justify-center mt-2 border-2 border-grayB p-11 rounded">
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default RiderRegistrationPage;
