import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { Button, Input } from "./ui";

import { Mini, Premium, Bike, Auto } from "@/assets/icons/index";
import { Drawer } from "vaul";

const MapboxPage = () => {
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWF5YW5rLTAiLCJhIjoiY2x1Mm1tNjJrMHUyZzJydDR0OG9mZ2libyJ9.Czqb7ulfDBjMpnF4pJUubQ";

    const successLocation = (position) => {
      setupMap([position.coords.longitude, position.coords.latitude]);
    };

    const errorLocation = () => {
      setupMap([72.49, 22.98]);
    };

    const setupMap = (center) => {
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: center,
        zoom: 10,
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

      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav);
      const coloradoJSON = {
        type: "circle",
        "circle-radius": {
          base: 1.75,
          stops: [
            [12, 2],
            [22, 180],
          ],
        },
      };
      map.on("load", () => {
        map.addSource("ethnicity", {
          type: "vector",
          url: "mapbox://examples.8fgz4egr",
        });
        map.addLayer(
          {
            id: "population",
            type: "circle",
            source: "ethnicity",
            "source-layer": "sf2010",
            paint: {
              // Make circles larger as the user zooms from z12 to z22.
              "circle-radius": {
                base: 1.75,
                stops: [
                  [12, 2],
                  [22, 180],
                ],
              },
              // Color circles by ethnicity, using a `match` expression.
              "circle-color": [
                "match",
                ["get", "ethnicity"],
                "White",
                "#fbb03b",
                "Black",
                "#223b53",
                "Hispanic",
                "#e55e5e",
                "Asian",
                "#3bb2d0",
                /* other */ "#ccc",
              ],
            },
          },
          // Place polygons under labels, roads and buildings.
          "aeroway-polygon"
        );
      });

      map.addLayer({
        id: "polygon",
        type: "fill",
        source: "polygon",
        layout: {},
        paint: {
          "fill-color": "blue",
          "fill-opacity": 0.6,
        },
      });

      var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/driving-traffic",
      });

      map.addControl(directions, "top-left");

      directions.on("route", function (e) {
        const origin = e.route[0].legs[0].steps[0].maneuver.location;

        const destination =
          e.route[0].legs[0].steps.slice(-1)[0].maneuver.location;

        console.log("origin", origin);
        console.log("destination", destination);
      });
    };

    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true,
    });

    return () => {
      // Clean up resources
    };
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
