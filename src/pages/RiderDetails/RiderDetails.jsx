// import React, { useContext, useState, useEffect } from "react";
// import OtpInput from "react-otp-input";
// import Drawer from "react-modern-drawer";
// import "react-modern-drawer/dist/index.css";
// import { driverByID, driverOtp, getAllDriver, rideRequest } from "@/api/driver";
// import { useLocation, useNavigate } from "react-router-dom";
// import { MapContext } from "@/context/MapContext";
// import Phone from "@/assets/icons/phone";
// import { User } from "@/assets/icons";
// import { toast, useToast } from "@/components/ui/use-toast";
// import { LocationMarker } from "@/assets/icons";
// import { updateBooking } from "@/api/booking";

// const RiderDetails = () => {
//   const { setSnap, setView } = useContext(MapContext);
//   const [drivers, setDrivers] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [driversAvailable, setDriversAvailable] = useState(false);
//   const location = useLocation();

//   const {
//     selectedVehicle,
//     originInput: originString,
//     destinationInput: destinationString,
//     routeDistance,
//     vehicleID,
//     setVehicleId,
//     driverId,
//     setDriverId,
//     bookingId,
//   } = useContext(MapContext);

//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const price = routeDistance
//     ? routeDistance.toFixed() * selectedVehicle.pricePerKm
//     : 0;

//   const fetchData = async () => {
//     try {
//       const allDriversResponse = await rideRequest();

//       // if (allDriversResponse.data.driverDetails.length === 0) {
//       toast({
//         variant: "destructive",
//         autodismisstimeout: 1,
//         title: allDriversResponse.data.message,
//         description: "No drivers found. Please try again later.",
//       });
//       setIsLoading(false);
//       setDriversAvailable(false);
//       // return;
//       // }

//       const driverData = allDriversResponse.data;
//       setDrivers(driverData);

//       // const driverByIdResponse = await driverByID(driverData._id);

//       // const getOtp = await driverOtp(driverData._id);
//       // console.log(getOtp);

//       // setDriverId(driverByIdResponse.data.data);
//       setDriversAvailable(true);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       toast({
//         variant: "destructive",
//         autodismisstimeout: 1,
//         title: "Error",
//         description: "Failed to fetch data. Please try again later.",
//       });
//       setIsLoading(false);
//       setDriversAvailable(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const bookingStatus = {
//     status: "cancelled",
//   };

//   const handleCancel = async () => {
//     try {
//       await updateBooking(bookingStatus, bookingId);
//       setView("form");
//     } catch (error) {
//       console.error("Failed to cancel the booking:", error);
//       toast({
//         variant: "error",
//         autodismisstimeout: 1,
//         title: "Cancellation Failed",
//         description: "Failed to cancel the booking. Please try again.",
//       });
//     }
//   };

//   const handlePay = () => {
//     setView("pay");
//   };

//   const handlePhone = () => {
//     const phoneNumber = driverId?.[0]?.phoneNumber;
//     if (phoneNumber) {
//       navigator.clipboard
//         .writeText(phoneNumber)
//         .then(() => {
//           toast({
//             variant: "success",
//             autodismisstimeout: 1,
//             title: "Copied",
//             description: `${phoneNumber}`,
//             status: "success",
//           });
//         })
//         .catch((err) => {
//           console.error("Failed to copy phone number:", err);
//           toast({
//             variant: "destructive",
//             autodismisstimeout: 1,
//             title: "Copy Failed",
//             description: "Failed to copy phone number. Please try again.",
//           });
//         });
//     } else {
//       toast({
//         variant: "destructive",
//         autodismisstimeout: 1,
//         title: "No Phone Number",
//         description: "Phone number is not available for this driver.",
//       });
//     }
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="w-full px-5 text-left font-poppins">
//       <div className="pt-5">
//         <h1 className="font-medium text-base leading-6">Ride Details</h1>
//         <div className="flex items-center gap-2 pt-2">
//           <LocationMarker className="h-5 w-5" />
//           <p className="font-normal text-sm text-[#A2A2A2] leading-5">
//             {originString}
//           </p>
//         </div>
//         <div className="w-[3px] h-5 bg-gray-300 ml-1"></div>
//         <div className="flex items-center gap-2">
//           <LocationMarker className="h-5 w-5" />
//           <p className="font-normal text-sm text-[#A2A2A2] leading-5">
//             {destinationString}
//           </p>
//         </div>
//       </div>

//       <hr className="mt-2" />

//       <div>
//         <h1 className="font-medium text-base mt-6 leading-6">
//           Payment Details
//         </h1>
//         <p className="font-medium text-base leading-5 text-[#9E9E9E] mt-2 mb-2">
//           <span className="pr-2">₹{price}</span>
//         </p>
//       </div>

//       <hr />
//       <div className="pt-7 flex flex-row justify-between">
//         <div className="mb-4">
//           <p className="font-medium text-sm mb-1">PIN for this ride</p>
//           <OtpInput
//             value={driverId?.[0]?.digit || ""}
//             numInputs={4}
//             renderSeparator={<span> &nbsp; </span>}
//             inputStyle="bg-[#BCBBE8] text-center rounded px-1 py-1 h-7 w-14"
//             inputType="number"
//             renderInput={(props) => (
//               <input
//                 {...props}
//                 style={{
//                   width: "35px",
//                   height: "35px",
//                   alignItems: "center",
//                 }}
//               />
//             )}
//           />
//         </div>

//         {selectedVehicle.icon}
//       </div>

//       <hr />

//       <div className="flex justify-between items-center mt-6">
//         <div>
//           <User className="h-8 w-8" />
//         </div>
//         <p className="font-medium text-base leading-6 max-w-24 -left-14 relative">
//           {driverId?.[0]?.name}
//           <p className="font-normal text-sm text-[#757575]">
//             {driverId?.[0]?.phoneNumber}
//           </p>
//         </p>

//         <div onClick={handlePhone} className="cursor-pointer">
//           <Phone className="h-8 w-8 mr-4" />
//         </div>
//       </div>

//       <button
//         onClick={handlePay}
//         className="w-full h-12 rounded-xl p-2 text-white bg-[#FF6C96] font-semibold text-sm leading-5 mx-auto mt-5"
//         disabled={!driversAvailable}
//       >
//         Pay
//       </button>

//       <button
//         onClick={handleCancel}
//         className="w-full h-12 rounded-xl p-2 text-white bg-[#FF6C96] font-semibold text-sm leading-5 mx-auto mt-5"
//       >
//         Cancel ride
//       </button>
//     </div>
//   );
// };

// export default RiderDetails;

import React, { useContext, useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { driverByID, driverOtp, getAllDriver, rideRequest } from "@/api/driver";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContext } from "@/context/MapContext";
import Phone from "@/assets/icons/phone";
import { User } from "@/assets/icons";
import { toast, useToast } from "@/components/ui/use-toast";
import { LocationMarker } from "@/assets/icons";
import { updateBooking } from "@/api/booking";

const RiderDetails = () => {
  const { setSnap, setView } = useContext(MapContext);
  const [drivers, setDrivers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [driversAvailable, setDriversAvailable] = useState(false);
  const location = useLocation();

  const {
    selectedVehicle,
    originInput: originString,
    destinationInput: destinationString,
    routeDistance,
    vehicleID,
    setVehicleId,
    driverId,
    setDriverId,
    bookingId,
  } = useContext(MapContext);

  const navigate = useNavigate();
  const { toast } = useToast();

  const price = routeDistance
    ? routeDistance.toFixed() * selectedVehicle.pricePerKm
    : 0;

  const fetchData = async () => {
    try {
      const allDriversResponse = await rideRequest();
      const driverData = allDriversResponse.data;

      if (driverData.driverDetails.length === 0) {
        toast({
          variant: "destructive",
          autodismisstimeout: 1,
          title: allDriversResponse.data.message,
          description: "No drivers found within 2 km. Please try again later.",
        });
        setIsLoading(false);
        setDriversAvailable(false);
        return;
      }

      setDrivers(driverData.driverDetails);
      setDriversAvailable(true);
      setIsLoading(false);
    } catch (error) {
      // toast({
      //   variant: "destructive",
      //   autodismisstimeout: 1,
      //   title: "Error",
      //   description: "Failed to fetch data. Please try again later.",
      // });
      setIsLoading(false);
      setDriversAvailable(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const bookingStatus = {
    status: "cancelled",
  };

  const handleCancel = async () => {
    try {
      await updateBooking(bookingStatus, bookingId);
      setView("form");
    } catch (error) {
      console.error("Failed to cancel the booking:", error);
      toast({
        variant: "error",
        autodismisstimeout: 1,
        title: "Cancellation Failed",
        description: "Failed to cancel the booking. Please try again.",
      });
    }
  };

  const handlePay = () => {
    setView("pay");
  };

  const handlePhone = () => {
    const phoneNumber = driverId?.[0]?.phoneNumber;
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
          toast({
            variant: "destructive",
            autodismisstimeout: 1,
            title: "Copy Failed",
            description: "Failed to copy phone number. Please try again.",
          });
        });
    } else {
      toast({
        variant: "destructive",
        autodismisstimeout: 1,
        title: "No Phone Number",
        description: "Phone number is not available for this driver.",
      });
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
            value={driverId?.[0]?.digit || ""}
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
          {driverId?.[0]?.name}
          <p className="font-normal text-sm text-[#757575]">
            {driverId?.[0]?.phoneNumber}
          </p>
        </p>

        <div onClick={handlePhone} className="cursor-pointer">
          <Phone className="h-8 w-8 mr-4" />
        </div>
      </div>

      <button
        onClick={handlePay}
        className="w-full h-12 rounded-xl p-2 text-white bg-[#FF6C96] font-semibold text-sm leading-5 mx-auto mt-5"
        disabled={!driversAvailable}
      >
        Pay
      </button>

      <button
        onClick={handleCancel}
        className="w-full h-12 rounded-xl p-2 text-white bg-[#FF6C96] font-semibold text-sm leading-5 mx-auto mt-5"
      >
        Cancel ride
      </button>
    </div>
  );
};

export default RiderDetails;
