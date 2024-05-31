// context/MapContext.js
import React, { createContext, useState } from "react";

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [originInput, setOriginInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");
  const [routeDistance, setRouteDistance] = useState(null);
  const [originCoordinates, setOriginCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("form");
  const [snap, setSnap] = useState(1);
  const [driverId, setDriverId] = useState(null);
  const [vehicleID, setVehicleId] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  return (
    <MapContext.Provider
      value={{
        bookingId,
        setBookingId,
        driverId,
        setDriverId,
        vehicleID,
        setVehicleId,
        view,
        setView,
        open,
        setOpen,
        originInput,
        setOriginInput,
        destinationInput,
        setDestinationInput,
        routeDistance,
        setRouteDistance,
        originCoordinates,
        setOriginCoordinates,
        destinationCoordinates,
        setDestinationCoordinates,
        selectedVehicle,
        setSelectedVehicle,
        directions,
        setDirections,
        map,
        setMap,
        snap,
        setSnap,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
