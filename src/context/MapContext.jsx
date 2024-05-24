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

  return (
    <MapContext.Provider
      value={{
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
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
