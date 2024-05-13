import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { Button, Input } from "./ui";

import { Mini, Premium, Bike, Auto } from "@/assets/icons/index";
import { Drawer } from "vaul";

const MapboxPage = () => {
  const mapContainerRef = useRef(null);
  const [directionsRoute, setDirectionsRoute] = useState(null);
  const [originInput, setOriginInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [routeDistance, setRouteDistance] = useState(
    parseFloat(localStorage.getItem("routeDistance")) || null
  );

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWF5YW5rLTAiLCJhIjoiY2x1Mm1tNjJrMHUyZzJydDR0OG9mZ2libyJ9.Czqb7ulfDBjMpnF4pJUubQ";

    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true,
    });

    function successLocation(position) {
      setupMap([position.coords.longitude, position.coords.latitude]);
    }

    function errorLocation() {
      setupMap([-2.24, 53.48]);
    }

    const bounds = [
      [22.9, 72.4],
      [23.1, 72.7],
    ];

    function setupMap(center) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: center,
        zoom: 10,
        // maxBounds: bounds,
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

          const origin = route.legs[0].steps[0].maneuver.location;
          const destination =
            route.legs[0].steps.slice(-1)[0].maneuver.location;

          console.log("Origin Coordinates:", origin);
          console.log("Destination Coordinates:", destination);

          // Extract distance from the route in meters
          const distanceInMeters = route.distance;

          // Convert distance to kilometers
          const distanceInKm = distanceInMeters / 1000;

          // Update state and save to localStorage
          setRouteDistance(distanceInKm);
          localStorage.setItem("routeDistance", distanceInKm);
        }
      });

      setMap(map);
      setDirections(directions);
    }
    return () => map.remove();
  }, []);

  const handleOriginInputChange = (event) => {
    setOriginInput(event.target.value);
  };

  const handleDestinationInputChange = (event) => {
    setDestinationInput(event.target.value);
  };
  const handleRouteSearch = () => {
    if (directions && originInput && destinationInput) {
      directions.setOrigin(originInput);
      directions.setDestination(destinationInput);
    }
  };

  return (
    <div className="map-wrap h-[100vh] w-full relative">
      <Drawer.Root shouldScaleBackground>
        <div ref={mapContainerRef} className="w-full h-full" />
        <div className="absolute  bg-white p-10 bottom-0  w-screen gap-4 items-center flex flex-col">
          <div className="flex rounded items-center w-full border border-black">
            {/* <GreenMarker /> */}
            <Input
              className="border-none"
              type="text"
              placeholder="Origin"
              value={originInput}
              onChange={handleOriginInputChange}
            />
          </div>
          <div className="flex rounded items-center w-full border border-black">
            {/* <RedMarker /> */}
            <Input
              className="border-none"
              type="text"
              placeholder="Destination"
              value={destinationInput}
              onChange={handleDestinationInputChange}
            />
          </div>
          <Drawer.Trigger asChild>
            <Button onClick={handleRouteSearch} className="rounded-[8px]">
              Confirm Location
            </Button>
          </Drawer.Trigger>

          {routeDistance !== null && (
            <p className="text-center mt-2">
              Route Distance: {routeDistance.toFixed(2)} km
            </p>
          )}
        </div>
        <Drawer.Portal>
          <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
            {routeDistance !== null && (
              <div className="flex flex-col justify-center">
                <div className="bookingCategory flex flex-col gap-5 ">
                  <div className="bike grid grid-cols-3  justify-items-center ">
                    <Bike />
                    <div>
                      <h2>Bike</h2>
                      <p>Get autos at your doorstep</p>
                    </div>
                    <h3>₹{routeDistance.toFixed() * 20}</h3>
                  </div>
                  <div className="auto  grid grid-cols-3  justify-items-center">
                    <Auto />
                    <div>
                      <h2>Auto</h2>
                      <p>Get autos at your doorstep</p>
                    </div>
                    <h3>₹{routeDistance.toFixed() * 30}</h3>
                  </div>
                  <div className="mini  grid grid-cols-3  justify-items-center">
                    <Mini />
                    <div>
                      <h2>Mini</h2>
                      <p>Compfy, sconomical cars</p>
                    </div>
                    <h3>₹{routeDistance.toFixed() * 40}</h3>
                  </div>
                  <div className="premium  grid grid-cols-3  justify-items-center ">
                    <Premium />
                    <div>
                      <h2>Premium</h2>
                      <p>Spacious sedans, top drivers</p>
                    </div>
                    <h3>₹{routeDistance.toFixed() * 50}</h3>
                  </div>
                </div>
                <Button className="m-2 bg-rose rounded">Book Auto</Button>
              </div>
            )}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default MapboxPage;
