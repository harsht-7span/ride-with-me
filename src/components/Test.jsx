// import React, { useRef, useEffect, useState, useCallback } from "react";
// import mapboxgl from "mapbox-gl";
// import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
// import { Button, Input } from "./ui";
// import { Marker, Search } from "@/assets/icons/index";
// import { Drawer } from "vaul";
// import { VehicleCard } from "./mapPageComponents/vehicleCard";
// import { LocationSchema } from "../validation/index";
// import { useToast } from "./ui/use-toast";
// import { AddressAutofill } from "@mapbox/search-js-react";
// import { vehicles } from "@/utils/vehicles";
// import TriggerDrawer from "./mapPageComponents/triggerDrawer";
// import { useNavigate } from "react-router-dom";
// import Booking from "./booking/booking";

// const Test = () => {
//   const originCoordinate = "";
//   const destinationCoordinate = "";
//   const mapContainerRef = useRef(null);
//   const [directionsRoute, setDirectionsRoute] = useState(null);
//   const [originInput, setOriginInput] = useState("");
//   const [destinationInput, setDestinationInput] = useState("");
//   const [map, setMap] = useState(null);
//   const [directions, setDirections] = useState(null);
//   const [routeDistance, setRouteDistance] = useState(
//     parseFloat(localStorage.getItem("routeDistance")) || null
//   );
//   const [selectedVehicle, setSelectedVehicle] = useState(null);
//   const [view, setView] = useState("form");
//   const [snap, setSnap] = useState(1);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const handleSelectVehicle = (vehicle) => {
//     setSelectedVehicle(vehicle);
//   };

//   useEffect(() => {
//     mapboxgl.accessToken =
//       "pk.eyJ1IjoibWF5YW5rLTAiLCJhIjoiY2x1Mm1tNjJrMHUyZzJydDR0OG9mZ2libyJ9.Czqb7ulfDBjMpnF4pJUubQ";

//     navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
//       enableHighAccuracy: true,
//     });

//     function successLocation(position) {
//       const { latitude, longitude } = position.coords;

//       fetch(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           const address = data.features[0]?.place_name || "Unknown";
//           setOriginInput(address);
//         })
//         .catch((error) => {
//           console.error("Error fetching address:", error);
//           setOriginInput("Unknown");
//         });
//       setupMap([longitude, latitude]);
//     }

//     function errorLocation() {
//       setupMap([-2.24, 53.48]);
//     }

//     const bounds = [
//       [72.4, 22.9],
//       [72.7, 23.1],
//     ];

//     function setupMap(center) {
//       const map = new mapboxgl.Map({
//         container: mapContainerRef.current,
//         style: "mapbox://styles/mapbox/streets-v12",
//         center: center,
//         zoom: 10,
//         maxBounds: bounds,
//       });

//       // const searchBox =
//       map.addControl(
//         new mapboxgl.GeolocateControl({
//           positionOptions: {
//             enableHighAccuracy: true,
//           },
//           trackUserLocation: true,
//           showUserHeading: true,
//         })
//       );

//       const directions = new MapboxDirections({
//         accessToken: mapboxgl.accessToken,
//         unit: "metric",
//         profile: "mapbox/driving",
//         controls: {
//           inputs: {
//             destinationInput,
//             originInput,
//           },
//         },
//       });

//       const nav = new mapboxgl.NavigationControl();
//       map.addControl(nav);

//       map.addControl(directions, "top-right");

//       directions.on("route", (e) => {
//         const route = e.route && e.route[0];
//         if (route) {
//           setDirectionsRoute(route);

//           const originCoordinate = route.legs[0].steps[0].maneuver.location;
//           const destinationCoordinate =
//             route.legs[0].steps.slice(-1)[0].maneuver.location;

//           console.log("Origin Coordinates:", originCoordinate);
//           console.log("Destination Coordinates:", destinationCoordinate);

//           // Extract distance from the route in meters
//           const distanceInMeters = route.distance;

//           const distanceInKm = distanceInMeters / 1000;

//           setRouteDistance(distanceInKm);
//           // localStorage.setItem("routeDistance", distanceInKm);
//         }
//       });

//       setMap(map);
//       setDirections(directions);
//     }
//   }, []);

//   const handleOriginInputChange = (event) => {
//     setOriginInput(event.target.value);
//   };

//   const handleDestinationInputChange = (event) => {
//     setDestinationInput(event.target.value);
//   };

//   const handleRouteSearch = () => {
//     const originResult = LocationSchema.safeParse(originInput);
//     const destinationResult = LocationSchema.safeParse(destinationInput);

//     if (directions && originInput && destinationInput) {
//       directions.setOrigin(originInput);
//       directions.setDestination(destinationInput);
//     }
//     if (!originResult.success || !destinationResult.success) {
//       toast({
//         variant: "destructive",
//         title: "Please enter Address.",
//         duration: 2000,
//       });

//       return;
//     }
//   };

//   const handleSubmit = useCallback(async (e) => {
//     e.preventDefault();
//   });

//   const handleBooking = () => {
//     setView("booking");
//     setSnap(0.6);
//   };

//   return (
//     <>
//       <Drawer.Root
//         snapPoints={[0.6, 1]}
//         activeSnapPoint={snap}
//         setActiveSnapPoint={setSnap}
//       >
//         <div className="map-wrap h-[100vh] w-full  relative ">
//           <div ref={mapContainerRef} className="w-full h-full" />
//           {/* <Map /> */}
//           <Drawer.Trigger
//           // asChild
//           >
//             <TriggerDrawer />
//           </Drawer.Trigger>

//           <Drawer.Portal>
//             <Drawer.Content className="bg-zinc-100 flex items-center flex-col rounded-t-[10px] h-[90%] mt-24 fixed bottom-0 left-0 right-0">
//               {view === "form" ? (
//                 <form onSubmit={handleSubmit}>
//                   <div className="overflow-auto">
//                     <div className=" bg-white p-10 w-screen gap-4 items-center flex flex-col">
//                       <div className="w-7 h-1  bg-blue-500 rounded" />
//                       <div className="flex rounded items-center w-full border map-box-list  border-black">
//                         <Marker className="flex-none px-1 w-8 h-8  text-green-500" />

//                         <AddressAutofill accessToken="pk.eyJ1IjoibWF5YW5rLTAiLCJhIjoiY2x1MmhweHRmMHRnZTJtcGRvZXd1dzdxaCJ9.Jv2qrYH63lMJsb_JNvixzA">
//                           <Input
//                             autoComplete="street-address"
//                             className="border-none text-gray-500 flex-grow"
//                             type="text"
//                             placeholder="Origin"
//                             value={originInput}
//                             onChange={handleOriginInputChange}
//                           />
//                         </AddressAutofill>
//                       </div>
//                       <div className="flex rounded items-center w-full map-box-list border border-black">
//                         <Marker className="flex-none px-1 w-8 h-8 text-red-500" />

//                         <AddressAutofill accessToken="pk.eyJ1IjoibWF5YW5rLTAiLCJhIjoiY2x1Mm1tNjJrMHUyZzJydDR0OG9mZ2libyJ9.Czqb7ulfDBjMpnF4pJUubQ">
//                           <Input
//                             autoComplete="street-address"
//                             className="border-none text-gray-500"
//                             type="text"
//                             placeholder="Destination"
//                             value={destinationInput}
//                             onChange={handleDestinationInputChange}
//                           />
//                         </AddressAutofill>
//                       </div>

//                       <Button
//                         onClick={handleRouteSearch}
//                         className="rounded-[8px]"
//                       >
//                         Confirm Location
//                       </Button>

//                       {routeDistance !== null && (
//                         <p className="text-center mt-2">
//                           Route Distance: {routeDistance.toFixed(2)}km
//                         </p>
//                       )}
//                     </div>

//                     {routeDistance !== null && (
//                       <div className="bg-white flex flex-col  justify-start pt-10 pb-32 h-96 container overflow-scroll">
//                         <div className="bookingCategory flex flex-col gap-5 ">
//                           {vehicles.map((vehicle, index) => (
//                             <VehicleCard
//                               key={index}
//                               vehicle={vehicle}
//                               routeDistance={routeDistance}
//                               onSelect={handleSelectVehicle}
//                             />
//                           ))}
//                         </div>
//                         {selectedVehicle && (
//                           <div className="flex flex-col gap-2">
//                             <Button
//                               onClick={handleBooking}
//                               className="m-2 bg-rose rounded"
//                             >
//                               Book {selectedVehicle.type}
//                             </Button>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </form>
//               ) : (
//                 <Booking
//                   vehicle={selectedVehicle}
//                   originString={originInput}
//                   originCoordinates={originCoordinate}
//                   destinationString={destinationInput}
//                   destinationCorrdinate={destinationCoordinate}
//                   routeDistance={routeDistance}
//                 />
//               )}
//             </Drawer.Content>
//           </Drawer.Portal>
//         </div>
//       </Drawer.Root>
//     </>
//   );
// };

// export default Test;
import React, { useRef, useEffect, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { Button, Input } from "./ui";
import { Marker } from "@/assets/icons/index";
import { Drawer } from "vaul";
import { VehicleCard } from "./mapPageComponents/vehicleCard";
import { LocationSchema } from "../validation/index";
import { useToast } from "./ui/use-toast";
import { AddressAutofill } from "@mapbox/search-js-react";
import { vehicles } from "@/utils/vehicles";
import TriggerDrawer from "./mapPageComponents/triggerDrawer";
import { useNavigate } from "react-router-dom";
import Booking from "./booking/booking";

const Test = () => {
  const mapContainerRef = useRef(null);
  const [directionsRoute, setDirectionsRoute] = useState(null);
  const [originInput, setOriginInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");
  const [originCoordinates, setOriginCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [routeDistance, setRouteDistance] = useState(
    parseFloat(localStorage.getItem("routeDistance")) || null
  );
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [view, setView] = useState("form");
  const [snap, setSnap] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWF5YW5rLTAiLCJhIjoiY2x1Mm1tNjJrMHUyZzJydDR0OG9mZ2libyJ9.Czqb7ulfDBjMpnF4pJUubQ";

    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true,
    });

    function successLocation(position) {
      const { latitude, longitude } = position.coords;

      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
      )
        .then((response) => response.json())
        .then((data) => {
          const address = data.features[0]?.place_name || "Unknown";
          setOriginInput(address);
        })
        .catch((error) => {
          console.error("Error fetching address:", error);
          setOriginInput("Unknown");
        });
      setupMap([longitude, latitude]);
    }

    function errorLocation() {
      setupMap([-2.24, 53.48]);
    }

    const bounds = [
      [72.4, 22.9],
      [72.7, 23.1],
    ];

    function setupMap(center) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: center,
        zoom: 10,
        maxBounds: bounds,
      });

      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        })
      );

      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/driving",
        controls: {
          inputs: {
            destinationInput,
            originInput,
          },
        },
      });

      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav);

      map.addControl(directions, "top-right");

      directions.on("route", (e) => {
        const route = e.route && e.route[0];
        if (route) {
          setDirectionsRoute(route);

          const originCoords = route.legs[0].steps[0].maneuver.location;
          const destinationCoords =
            route.legs[0].steps.slice(-1)[0].maneuver.location;

          setOriginCoordinates(originCoords);
          setDestinationCoordinates(destinationCoords);

          console.log("Origin Coordinates:", originCoords);
          console.log("Destination Coordinates:", destinationCoords);

          const distanceInMeters = route.distance;
          const distanceInKm = distanceInMeters / 1000;

          setRouteDistance(distanceInKm);
        }
      });

      setMap(map);
      setDirections(directions);
    }
  }, []);

  const handleOriginInputChange = (event) => {
    setOriginInput(event.target.value);
  };

  const handleDestinationInputChange = (event) => {
    setDestinationInput(event.target.value);
  };

  const handleRouteSearch = () => {
    const originResult = LocationSchema.safeParse(originInput);
    const destinationResult = LocationSchema.safeParse(destinationInput);

    if (directions && originInput && destinationInput) {
      directions.setOrigin(originInput);
      directions.setDestination(destinationInput);
    }
    if (!originResult.success || !destinationResult.success) {
      toast({
        variant: "destructive",
        title: "Please enter Address.",
        duration: 2000,
      });

      return;
    }
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
  });

  const handleBooking = () => {
    setView("booking");
    setSnap(0.6);
  };

  return (
    <>
      <Drawer.Root
        snapPoints={[0.6, 1]}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
      >
        <div className="map-wrap h-[100vh] w-full relative">
          <div ref={mapContainerRef} className="w-full h-full" />
          <Drawer.Trigger>
            <TriggerDrawer />
          </Drawer.Trigger>

          <Drawer.Portal>
            <Drawer.Content className="bg-zinc-100 flex items-center flex-col rounded-t-[10px] h-[90%] mt-24 fixed bottom-0 left-0 right-0">
              {view === "form" ? (
                <form onSubmit={handleSubmit}>
                  <div className="overflow-auto">
                    <div className="bg-white p-10 w-screen gap-4 items-center flex flex-col">
                      <div className="w-7 h-1 bg-blue-500 rounded" />
                      <div className="flex rounded items-center w-full border map-box-list border-black">
                        <Marker className="flex-none px-1 w-8 h-8 text-green-500" />

                        <AddressAutofill accessToken="pk.eyJ1IjoibWF5YW5rLTAiLCJhIjoiY2x1MmhweHRmMHRnZTJtcGRvZXd1dzdxaCJ9.Jv2qrYH63lMJsb_JNvixzA">
                          <Input
                            autoComplete="street-address"
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

                        <AddressAutofill accessToken="pk.eyJ1IjoibWF5YW5rLTAiLCJhIjoiY2x1Mm1tNjJrMHUyZzJydDR0OG9mZ2libyJ9.Czqb7ulfDBjMpnF4pJUubQ">
                          <Input
                            autoComplete="street-address"
                            className="border-none text-gray-500"
                            type="text"
                            placeholder="Destination"
                            value={destinationInput}
                            onChange={handleDestinationInputChange}
                          />
                        </AddressAutofill>
                      </div>

                      <Button
                        onClick={handleRouteSearch}
                        className="rounded-[8px]"
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
                      <div className="bg-white flex flex-col justify-start pt-10 pb-32 h-96 container overflow-scroll">
                        <div className="bookingCategory flex flex-col gap-5">
                          {vehicles.map((vehicle, index) => (
                            <VehicleCard
                              key={index}
                              vehicle={vehicle}
                              routeDistance={routeDistance}
                              onSelect={handleSelectVehicle}
                            />
                          ))}
                        </div>
                        {selectedVehicle && (
                          <div className="flex flex-col gap-2">
                            <Button
                              onClick={handleBooking}
                              className="m-2 bg-rose rounded"
                            >
                              Book {selectedVehicle.type}
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </form>
              ) : (
                <Booking
                  vehicle={selectedVehicle}
                  originString={originInput}
                  originCoordinates={originCoordinates}
                  destinationString={destinationInput}
                  destinationCoordinates={destinationCoordinates}
                  routeDistance={routeDistance}
                />
              )}
            </Drawer.Content>
          </Drawer.Portal>
        </div>
      </Drawer.Root>
    </>
  );
};

export default Test;
