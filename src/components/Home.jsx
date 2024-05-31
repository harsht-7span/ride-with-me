import React, { useContext, useState } from "react";
import { MapContext, MapProvider } from "../context/MapContext";
import Map from "./Map";
import RouteForm from "./RouteForm";
import { Drawer } from "vaul";
import TriggerDrawer from "./mapPageComponents/triggerDrawer";
import { LocationSchema } from "@/validation";
import { useToast } from "./ui/use-toast";
import Booking from "./booking/booking";
import RiderDetails from "@/pages/RiderDetails/RiderDetails";
import { useNavigate } from "react-router-dom";
import PaymentDetails from "@/pages/Payment/PaymentDetails";
import VehicleSelect from "./vechicleSelect";

const Home = () => {
  const {
    originInput,
    destinationInput,
    directions,
    open,
    setOpen,
    view,
    setView,
    snap,
    setSnap,
    routeDistance,
    selectedVehicle,
    setSelectedVehicle,
  } = useContext(MapContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRouteSearch = (e) => {
    setView("vehicle");
    setSnap(1);
    const originResult = LocationSchema.safeParse(originInput);
    const destinationResult = LocationSchema.safeParse(destinationInput);

    if (!originResult.success || !destinationResult.success) {
      toast({
        variant: "destructive",
        title: "Please enter a valid address.",
        duration: 2000,
      });
      return;
    }

    if (directions && originInput && destinationInput) {
      directions.setOrigin(originInput);
      directions.setDestination(destinationInput);
    }
  };

  const handleBooking = () => {
    setView("booking");
    setSnap(0.6);
  };

  const handleRiderDetails = () => {
    setView("riderDetails");
    setSnap(0.6);
  };

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <Drawer.Root
      snapPoints={[0.6, 1]}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      open={open}
      dismissible={false}
    >
      <div className="map-wrap h-[100vh] w-full">
        <Map />
        <Drawer.Trigger
          onClick={() => {
            setOpen(true);
            setSnap(1);
          }}
        >
          <TriggerDrawer />
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Content className="z-10 bg-white flex items-center flex-col rounded-t-[10px] h-full mt-24 fixed bottom-0 left-0 right-0">
            {view === "form" && (
              <RouteForm
                handleRouteSearch={handleRouteSearch}
                handleBooking={handleBooking}
                handleRiderDetails={handleRiderDetails}
              />
            )}

            {view === "vehicle" && (
              <VehicleSelect
                routeDistance={routeDistance}
                selectedVehicle={selectedVehicle}
                onSelectVehicle={handleSelectVehicle}
                handleBooking={handleBooking}
              />
            )}
            {view === "booking" && <Booking />}
            {view === "riderDetails" && <RiderDetails />}
            {view === "pay" && <PaymentDetails />}
          </Drawer.Content>
        </Drawer.Portal>
      </div>
    </Drawer.Root>
  );
};

export default Home;
