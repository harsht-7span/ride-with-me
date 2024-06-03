import React, { useContext } from "react";
import { Button } from "./ui";
import { vehicles } from "@/utils/vehicles";
import { MapContext } from "@/context/MapContext";
import GreenDot from "@/assets/icons/greenDot";
import RedDot from "@/assets/icons/redDot";
import { VehicleCard } from "./vehicleCard";

const VehicleSelect = ({
  routeDistance,
  selectedVehicle,
  onSelectVehicle,
  handleBooking,
}) => {
  const { originInput, destinationInput } = useContext(MapContext);

  return (
    <>
      <div className="w-full container py-5 space-y-3">
        <div className="flex gap-3 items-center">
          <GreenDot />
          {originInput}
        </div>
        <hr />
        <div className="flex gap-3  items-center">
          <RedDot />
          {destinationInput}{" "}
        </div>
      </div>
      <div className="bg-white flex flex-col justify-start pb-10 h-full container">
        <div className="bookingCategory flex flex-col gap-4 overflow-auto">
          {vehicles.map((vehicle, index) => (
            <VehicleCard
              key={index}
              vehicle={vehicle}
              routeDistance={routeDistance}
              onSelect={onSelectVehicle}
            />
          ))}
          {selectedVehicle && (
            <div className="flex flex-col gap-2 fixed inset-x-0 bottom-3 top-auto px-5">
              <Button
                onClick={handleBooking}
                className="mt-2 bg-rose rounded w-full"
              >
                Book {selectedVehicle.type}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VehicleSelect;
