import React, { useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { Progress } from "../ui/progress";
import { Marker } from "@/assets/icons";
import { booking } from "@/api/booking";

const Booking = ({
  vehicle,
  originString,
  destinationString,
  routeDistance,
  originCoordinates,
  destinationCoordinates,
}) => {
  const { toast } = useToast();
  const price = routeDistance
    ? routeDistance.toFixed() * vehicle.pricePerKm
    : 0;

  // console.log(vehicle);

  useEffect(() => {
    // const payload = {
    //   pickupLocation: originString,
    //   dropoffLocation: destinationString,
    //   vehicleClass: vehicle.type,
    //   fare: price,
    //   origin: {
    //     type: "Point",
    //     coordinates: originCoordinates,
    //   },
    //   destination: {
    //     type: "Point",
    //     coordinates: destinationCoordinates,
    //   },
    // };

    const makeBooking = async () => {
      try {
        const response = await booking(payload);
        // console.log(response);

        toast({
          variant: "success",
          autodismisstimeout: 1,
          title: "Booking Confirmed",
          description: `Your booking has been confirmed with a fare of ₹${price}`,
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
      }
    };

    makeBooking();
  }, [
    vehicle,
    originString,
    destinationString,
    originCoordinates,
    destinationCoordinates,
  ]);

  return (
    <div className="px-4">
      <h2 className="py-4 font-medium text-2xl">Confirming your auto</h2>
      {/* <div>
        <Progress value={40} className="" />
      </div> */}
      <div
        className={`vehicle grid grid-cols-3 my-7 justify-between items-center p-2 border-2 hover:border-rose rounded-xl `}
      >
        <div className="mx-auto">{vehicle.icon}</div>
        <div>
          <h2 className="text-sm font-medium ">{vehicle.type}</h2>
          <p>{vehicle.description}</p>
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
    </div>
  );
};

export default Booking;
