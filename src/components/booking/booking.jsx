import React, { useEffect } from "react";
import { useToast } from "../ui/use-toast";

const Booking = ({
  vehicle,
  originString,
  destinationString,
  routeDistance,
  originCoordinates,
  destinationCoordinates,
}) => {
  const { toast } = useToast();

  useEffect(() => {
    const bookingData = {};
  });

  return (
    <div>
      <h2 className="py-4 font-medium text-2xl">Confirming your auto</h2>
      <div
        className={`vehicle grid grid-cols-3 justify-between items-center p-2 border-2 hover:border-rose rounded-xl `}
      >
        <div className="mx-auto">{vehicle.icon}</div>
        <div>
          <h2 className="text-sm font-medium ">{vehicle.type}</h2>
          <p>{vehicle.description}</p>
        </div>
        <div className="mx-auto">
          <h3>₹{vehicle.price}</h3>
        </div>
      </div>
      <p>Ride Details</p>
      <div>
        <p> origin: {originString}</p>
        <p>destination: {destinationString}</p>
      </div>

      <p>Route Distance: {routeDistance.toFixed(2)}km</p>
    </div>
  );
};

export default Booking;
