import "react-modern-drawer/dist/index.css";
import Phone from "@/assets/icons/phone";
import { MapContext } from "@/context/MapContext";
import { payment } from "@/api/payment";
import { getUserId } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { userId } from "@/api/user";

const PaymentDetails = () => {
  const {
    selectedVehicle,
    originInput: originString,
    destinationInput: destinationString,
    routeDistance,
    vehicleID,
    setVehicleId,
    driverId,
    setDriverId,
  } = useContext(MapContext);

  const [bookingId, setBookingId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const price = routeDistance
    ? routeDistance.toFixed() * selectedVehicle.pricePerKm
    : 0;

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const userIdlocal = getUserId();

  const fetchUserData = async () => {
    try {
      const response = await userId(userIdlocal);
      if (response.data.success) {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const bookingIdparams = params.get("bookingId");
    setBookingId(bookingIdparams);
  }, [location.search]);

  const checkOut = async () => {
    if (!userData) {
      console.log("User data is not available");
      return;
    }

    const payload = {
      booking: [
        {
          fullName: userData.name,
          fare: price,
          userId: userIdlocal,
          bookingId: bookingId,
          paymentMethod: "cash",
          status: "pending",
        },
      ],
    };

    try {
      const response = await payment(payload);
      console.log(response);
      const url = response?.data?.url;
      if (url) {
        window.location.href = url;
        // console.log(payload);
        // window.open(url, "_blank");
      }
    } catch (error) {
      console.log("Error at payment");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="px-4 w-full text-left font-poppins ">
        <div className="mt-5">
          <h1 className="font-medium text-base leading-6">Ride Details</h1>
          <div className="flex flex-row mt-2">
            <p className=" font-normal text-sm text-[#A2A2A2] leading-5">
              {originString}
            </p>
          </div>
          <div className="flex flex-row mt-2">
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
            <span className="pr-2">₹{price}</span>
          </p>
        </div>

        <hr />

        <hr />

        <div className="flex flex-row justify-between mt-6">
          <img
            src="./src/assets/driver.png"
            alt="driver"
            className="h-12 w-12"
          />
          <p className="font-medium text-base leading-6 max-w-24 -left-14 relative">
            David Black{" "}
            <span className="font-normal text-sm text-[#757575]">
              {vehicleID?.licensePlate}
            </span>
          </p>

          <div>
            <Phone className="h-8 w-8 mr-4" />
          </div>
        </div>

        <button
          onClick={checkOut}
          className="w-full h-12 items-center rounded-xl p-2 text-white bg-rose font-semibold text-sm leading-5 mx-auto mt-[120px]"
        >
          Pay
        </button>
      </div>
    </>
  );
};

export default PaymentDetails;
