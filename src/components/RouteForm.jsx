// components/RouteForm.js
import React, { useContext } from "react";
import { MapContext } from "../context/MapContext";
import { Button, Input } from "./ui";
import { Marker } from "@/assets/icons/index";
import { AddressAutofill } from "@mapbox/search-js-react";
import { useToast } from "./ui/use-toast";
import { vehicles } from "@/utils/vehicles";

import Arrow from "@/assets/icons/arrow";
import { VehicleCard } from "./mapPageComponents/vehicleCard";

const RouteForm = ({ handleRouteSearch, handleBooking }) => {
  const {
    originInput,
    setOriginInput,
    destinationInput,
    setDestinationInput,
    routeDistance,
    selectedVehicle,
    setSelectedVehicle,
    setOpen,
  } = useContext(MapContext);

  const { toast } = useToast();

  const handleOriginInputChange = (event) => {
    setOriginInput(event.target.value);
  };

  const handleDestinationInputChange = (event) => {
    setDestinationInput(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure handleRouteSearch is called here or on button click
    if (handleRouteSearch) {
      handleRouteSearch();
    } else {
      console.error("handleRouteSearch function is not provided");
    }
  };

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="overflow-auto">
        <div className="flex items-center gap-5 py-4 px-2">
          <button type="button" onClick={() => setOpen(false)}>
            <Arrow className="cursor-pointer" />
          </button>
          <h2 className="font-semibold text-xl">Pickup</h2>
        </div>
        <div className="bg-white p-10 w-screen gap-4 items-center flex flex-col">
          <div className="flex rounded items-center w-full border map-box-list border-black">
            <Marker className="flex-none px-1 w-8 h-8 text-green-500" />
            <AddressAutofill accessToken="pk.eyJ1IjoibWF5YW5rLTAiLCJhIjoiY2x1MmhweHRmMHRnZTJtcGRvZXd1dzdxaCJ9.Jv2qrYH63lMJsb_JNvixzA">
              <Input
                autoComplete="shipping street-address"
                className="border-none text-gray-500 flex-grow"
                type="text"
                placeholder="Origin"
                value={originInput}
                onChange={handleOriginInputChange}
              />
            </AddressAutofill>
          </div>
          <div className="flex rounded items-center w-full map-box-list border border-black">
            <Marker className="flex-none px-1 w-8 h-8 text-red-500" />
            <AddressAutofill accessToken="pk.eyJ1IjoibWF5YW5rLTAiLCJhIjoiY2x1MmhweHRmMHRnZTJtcGRvZXd1dzdxaCJ9.Jv2qrYH63lMJsb_JNvixzA">
              <Input
                autoComplete="shipping street-address"
                className="border-none text-gray-500 flex-grow"
                type="text"
                placeholder="Destination"
                value={destinationInput}
                onChange={handleDestinationInputChange}
              />
            </AddressAutofill>
          </div>
          <Button
            type="button"
            onClick={handleRouteSearch}
            className="rounded-[8px] w-full"
          >
            Confirm Location
          </Button>
          {routeDistance !== null && (
            <p className="text-center mt-2">
              Route Distance: {routeDistance.toFixed(2)}km
            </p>
          )}
        </div>
        {routeDistance !== null && (
          <div className="bg-white flex flex-col justify-start pb-10 h-64 2xl:h-auto overflow-auto container">
            <div className="bookingCategory flex flex-col gap-4 overflow-auto">
              {vehicles.map((vehicle, index) => (
                <VehicleCard
                  key={index}
                  vehicle={vehicle}
                  routeDistance={routeDistance}
                  onSelect={handleSelectVehicle}
                />
              ))}
              {selectedVehicle && (
                <div className="flex flex-col gap-2 fixed inset-x-0 bottom-0 top-auto">
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
        )}
      </div>
    </form>
  );
};

export default RouteForm;
