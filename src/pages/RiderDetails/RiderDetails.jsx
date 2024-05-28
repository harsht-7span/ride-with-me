import React, { useContext, useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { driverByID, getAllDriver } from "@/api/driver";
import { useNavigate } from "react-router-dom";
import { MapContext } from "@/context/MapContext";
import Phone from "@/assets/icons/phone";
import { User } from "@/assets/icons";
import { toast, useToast } from "@/components/ui/use-toast";
import { LocationMarker } from "@/assets/icons";

const RiderDetails = () => {
  const { setSnap, setView } = useContext(MapContext);
  const [driver, setDriver] = useState(null);
  const [driverId, setDriverId] = useState(null);
  const [vehicleID, setVehicleId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    selectedVehicle,
    originInput: originString,
    destinationInput: destinationString,
    routeDistance,
  } = useContext(MapContext);

  const navigate = useNavigate();
  const { toast } = useToast();

  const price = routeDistance
    ? routeDistance.toFixed() * selectedVehicle.pricePerKm
    : 0;

  const fetchData = async () => {
    try {
      const allDriversResponse = await getAllDriver();
      const driverData = allDriversResponse.data.data[0];
      setDriver(driverData);

      const driverByIdResponse = await driverByID("66541be363af318f355d340a");
      setDriverId(driverByIdResponse.data.data.driver);
      setVehicleId(driverByIdResponse.data.data.vehicles);
      setIsLoading(false);
      console.log(driverByIdResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  console.log(vehicleID);

  useEffect(() => {
    fetchData();
  }, []);

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
          toast({
            variant: "success",
            autodismisstimeout: 1,
            title: "Copied",
            description: `${phoneNumber}`,
            status: "success",
          });
        })
        .catch((err) => {
          console.error("Failed to copy phone number:", err);
        });
    } else {
      console.log("Phone number is not available");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full px-5 text-left font-poppins">
      <div className="pt-5">
        <h1 className="font-medium text-base leading-6">Ride Details</h1>
        <div className="flex items-center gap-2 pt-2">
          <LocationMarker className="h-5 w-5" />
          <p className="font-normal text-sm text-[#A2A2A2] leading-5">
            {originString}
          </p>
        </div>
        <div className="w-[3px] h-5 bg-gray-300 ml-1"></div>
        <div className="flex items-center gap-2">
          <LocationMarker className="h-5 w-5" />
          <p className="font-normal text-sm text-[#A2A2A2] leading-5">
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
          <span className="pr-2">₹{price}</span>
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
            inputStyle="bg-[#BCBBE8] text-center rounded px-1 py-1 h-7 w-14"
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

        {selectedVehicle.icon}
      </div>

      <hr />

      <div className="flex justify-between items-center mt-6">
        <div>
          <User className="h-8 w-8" />
        </div>
        <p className="font-medium text-base leading-6 max-w-24 -left-14 relative">
          {driver?.name}
          <p className="font-normal text-sm text-[#757575]">
            {vehicleID?.licensePlate}
          </p>
        </p>

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
  );
};

export default RiderDetails;
