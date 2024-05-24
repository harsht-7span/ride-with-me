import React from "react";
// import { Rikshaw, Location, Verticleline, Driver, Phone } from "@/icons";
import OtpInput from "react-otp-input";
import { useState, useEffect } from "react";

import Drawer from "react-modern-drawer";

import "react-modern-drawer/dist/index.css";
import { getAllDriver } from "@/api/driver";
import { handler } from "tailwindcss-animate";
import { useNavigate } from "react-router-dom";

const RiderDetails = () => {
  const [otp, setOtp] = useState("");
  const [driver, setDriver] = useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const fetchData = async () => {
    try {
      getAllDriver().then((res) => {
        console.log(res.data.data[0]);
        setDriver(res.data.data[0]);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCancle = () => {
    navigate("/homepage");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* <button onClick={toggleDrawer}>Show</button> */}
      {/* <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="bottom"
        size="467px"
        className="bla bla bla rounded-t-3xl"
      > */}
      <div className="mx-4 text-left font-poppins ">
        <div className="mt-5">
          <h1 className="font-medium text-base leading-6">Ride Details</h1>
          <div className="flex flex-row mt-2">
            {/* <Location className="h-5 w-5" /> */}
            <p className=" font-normal text-sm text-[#A2A2A2] leading-5">
              {driver?.location.coordinates[0]}
            </p>
          </div>
          {/* <Verticleline className="m-1 left-1 relative" /> */}
          <div className="flex flex-row mt-2">
            {/* <Location className="h-5 w-5" /> */}
            <p className=" font-normal text-sm text-[#A2A2A2] leading-5">
              {driver?.location.coordinates[1]}
            </p>
          </div>
        </div>

        <hr className="mt-2" />

        <div>
          <h1 className="font-medium text-base mt-6 leading-6">
            {"fare"}
            Payment Details
          </h1>
          <p className="font-medium text-base leading-5 text-[#9E9E9E] mt-2 mb-2">
            <span className="pr-2">₹</span>
            <span>65</span>
          </p>
        </div>

        <hr />
        <div className="mt-7 flex flex-row justify-between">
          <div className="mb-4">
            <p className="font-medium text-sm mb-1">PIN for this ride</p>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span> &nbsp; </span>}
              inputStyle="bg-[#BCBBE8] rounded px-1 py-1 h-7 w-14 "
              inputType="number"
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    width: "35px",
                    height: "35px",
                    alignItems: "center",
                  }}
                />
              )}
            />
          </div>

          {/* <Rikshaw className="pr-4 h-[72px] w-[72px] -mt-5 " /> */}
        </div>

        <hr />

        <div className="flex flex-row justify-between mt-6">
          {/* <div className="flex flex-row gap-3"> */}
          {/* <img
            src="./src/assets/driver.png"
            alt="driver"
            className="h-12 w-12"
          /> */}
          <p className="font-medium text-base leading-6 max-w-24 -left-14 relative">
            {driver?.name}
            <span className="font-normal text-sm text-[#757575]">
              GJ03DQ5551
            </span>
          </p>

          {/* </div> */}
          <div>{/* <Phone className="h-8 w-8 mr-4" /> */}</div>
        </div>

        <button
          onClick={handleCancle}
          className="w-full h-12 rounded-xl p-2 text-white bg-[#FF6C96] font-semibold text-sm leading-5 mx-auto mt-5"
        >
          Cancel ride
        </button>
      </div>
      {/* </Drawer> */}
    </>
  );
};

export default RiderDetails;
