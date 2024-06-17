import React, { useContext, useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { Progress } from "../ui/progress";
import { Marker } from "@/assets/icons";
import { booking } from "@/api/booking";
import { MapContext } from "@/context/MapContext";
import { Button } from "../ui";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserId } from "@/lib/utils";

const Booking = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const userIdlocal = getUserId();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const {
    selectedVehicle,
    originInput: originString,
    destinationInput: destinationString,
    routeDistance,
    originCoordinates,
    destinationCoordinates,
    setView,
    setSnap,
    setBookingId,
  } = useContext(MapContext);

  const location = useLocation();

  const price = routeDistance
    ? routeDistance.toFixed() * selectedVehicle.pricePerKm
    : 0;

  const payload = {
    vehicleClass: selectedVehicle.type,
    pickupLocation: originString,
    dropoffLocation: destinationString,
    origin: {
      type: "Point",
      coordinates: originCoordinates,
    },
    destination: {
      type: "Point",
      coordinates: destinationCoordinates,
    },
    fare: price,
    customer: userIdlocal,
  };

  const makeBooking = async () => {
    try {
      setLoadingProgress(20);
      const response = await booking(payload);
      setLoadingProgress(60);
      const id = response.data.data._id;
      setBookingId(id);

      navigate(`${location.pathname}?bookingId=${id}`);
      setLoadingProgress(100);

      toast({
        variant: "success",
        autodismisstimeout: 1,
        title: "Confirming your Booking",
        description: `You requested booking with a fare of ₹${price}`,
        status: "success",
      });
    } catch (error) {
      toast({
        autodismisstimeout: 1,
        variant: "destructive",
        title: "Booking Failed",
        description: `There was an issue confirming your booking: ${error.message}`,
        status: "error",
      });
      setLoadingProgress(0);
    }
  };

  useEffect(
    () => {
      makeBooking();
    },
    [
      // selectedVehicle,
      // originString,
      // destinationString,
      // originCoordinates,
      // destinationCoordinates,
    ]
  );

  const handlerDriver = () => {
    setView("riderDetails");
    setSnap(0.6);
  };

  return (
    <>
      <div className="w-7 h-1 bg-gray-500 mt-5 rounded" />
      <div className="px-4">
        <h2 className="py-4 font-medium text-2xl">
          Confirming your {selectedVehicle.type}
        </h2>
        {/* {loadingProgress < 100 && (
          <div className="my-7">
            <Progress value={loadingProgress} className="" />
          </div>
        )} */}
        <div className="my-7 flex flex-row justify-around">
          <div>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
          <div>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
          <div>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
        </div>
        <div
          className={`vehicle grid grid-cols-3 my-7 justify-between items-center p-2 border-2 hover:border-rose rounded-xl `}
        >
          <div className="mx-auto">{selectedVehicle.icon}</div>
          <div>
            <h2 className="text-sm font-medium ">{selectedVehicle.type}</h2>
            <p>{selectedVehicle.description}</p>
          </div>
          <div className="mx-auto">
            <h3>₹{price}</h3>
          </div>
        </div>
        <p className="font-medium text-base">Ride Details</p>
        <div className="text-gray-500">
          <div className="flex items-center">
            <Marker className="w-7 h-7 text-gray-400" />
            <p>{originString}</p>
          </div>
          <div className="w-[3px] h-5 ml-3 bg-gray-400"></div>
          <div className="flex items-center">
            <Marker className="w-7 h-7 text-gray-400" />
            <p> {destinationString}</p>
          </div>
        </div>
        <Button className="w-full rounded" onClick={handlerDriver}>
          Driver details
        </Button>
      </div>
    </>
  );
};

export default Booking;
