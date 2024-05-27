import React, { useContext } from "react";
// import { Rikshaw, Location, Verticleline, Driver, Phone } from "@/icons";
import OtpInput from "react-otp-input";
import { useState, useEffect } from "react";

import Drawer from "react-modern-drawer";

import "react-modern-drawer/dist/index.css";
import { driverByID, getAllDriver } from "@/api/driver";
import { handler } from "tailwindcss-animate";
import { useNavigate } from "react-router-dom";
import { MapContext } from "@/context/MapContext";
import Phone from "@/assets/icons/phone";
import User from "@/assets/icons/user";
import { toast, useToast } from "@/components/ui/use-toast";
import { LocationMarker } from "@/assets/icons";

const RiderDetails = () => {
  const { setSnap, setView } = useContext(MapContext);
  const [driver, setDriver] = useState(null);
  const [driverId, setDriverId] = useState(null);
  const [vehicleID, setVehicleId] = useState(null);
  const {
    selectedVehicle,
    originInput: originString,
    destinationInput: destinationString,
  } = useContext(MapContext);

  const navigate = useNavigate();

  const { toast } = useToast();

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const fetchData = async () => {
    try {
      await getAllDriver().then((res) => {
        console.log(res.data.data[0]);
        setDriver(res.data.data[0]);
      });

      await driverByID(driver?._id).then((res) => {
        setDriverId(res.data.data.driver);
        setVehicleId(res.data.data.vehicles);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(selectedVehicle);

  const handleCancle = () => {
    navigate("/home");
  };

  const handlePay = () => {
    setView("pay");
  };

  const handlePhone = () => {
    const phoneNumber = driver?.phoneNumber;

    if (phoneNumber) {
      navigator.clipboard
        .writeText(phoneNumber)
        .then(() => {
          console.log("Phone number copied to clipboard:", phoneNumber);
          toast({
            variant: "success",
            autodismisstimeout: 1,
            title: "Copied",
            description: `${phoneNumber} `,
            status: "success",
          });
        })
        .catch((err) => {
          console.error("Failed to copy phone number:", err);
          // Optionally, show an error message to the user
        });
    } else {
      console.log("Phone number is not available");
      // Optionally, show a message indicating that the phone number is not available
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className=" w-full px-5 text-left font-poppins ">
        <div className="pt-5">
          <h1 className="font-medium text-base leading-6">Ride Details</h1>
          <div className="flex items-center gap-2 pt-2">
            <LocationMarker className="h-5 w-5" />
            <p className=" font-normal text-sm text-[#A2A2A2] leading-5">
              {originString}
            </p>
          </div>
          <div className="w-[3px] h-5 bg-gray-300 ml-1"></div>
          <div className="flex items-center gap-2 ">
            <LocationMarker className="h-5 w-5" />
            <p className=" font-normal text-sm text-[#A2A2A2] leading-5">
              {destinationString}
            </p>
          </div>
        </div>

        <hr className="mt-2" />

        <div>
          <h1 className="font-medium text-base mt-6 leading-6">
            Payment Details
          </h1>
          <p className="font-medium text-base leading-5 text-[#9E9E9E] mt-2 mb-2">
            <span className="pr-2">₹</span>
            <span>65</span>
          </p>
        </div>

        <hr />
        <div className="pt-7 flex flex-row justify-between">
          <div className="mb-4">
            <p className="font-medium text-sm mb-1">PIN for this ride</p>
            <OtpInput
              value={driverId?.digit}
              numInputs={4}
              renderSeparator={<span> &nbsp; </span>}
              inputStyle="bg-[#BCBBE8] text-center rounded px-1 py-1 h-7 w-14 "
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
          {selectedVehicle.icon}
        </div>

        <hr />

        <div className="flex flex-row justify-between mt-6">
          {/* <div className="flex flex-row gap-3"> */}
          {/* <img
            src="./src/assets/driver.png"
            alt="driver"
            className="h-12 w-12"
          /> */}
          <User className="h-32 w-32" />
          <p className="font-medium text-base leading-6 max-w-24 -left-14 relative">
            {driver?.name}
            <p className="font-normal text-sm text-[#757575]">
              {vehicleID?.licensePlate}
            </p>
          </p>

          {/* </div> */}
          <div onClick={handlePhone} className="cursor-pointer">
            <Phone className="h-8 w-8 mr-4" />
          </div>
        </div>

        <button
          onClick={handlePay}
          className="w-full h-12 rounded-xl p-2 text-white bg-[#FF6C96] font-semibold text-sm leading-5 mx-auto mt-5"
        >
          Pay
        </button>

        <button
          onClick={handleCancle}
          className="w-full h-12 rounded-xl p-2 text-white bg-[#FF6C96] font-semibold text-sm leading-5 mx-auto mt-5"
        >
          Cancel ride
        </button>
      </div>
    </>
  );
};

export default RiderDetails;
