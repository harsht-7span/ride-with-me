import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

const MapboxPage = () => {
  const mapContainerRef = useRef(null);
  const [directionsRoute, setDirectionsRoute] = useState(null);

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

    function setupMap(center) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
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

      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
      });

      map.addControl(directions, "bottom-left");

      directions.on("route", function (e) {
        const route = e.route && e.route[0];
        if (route) {
          // Clear previous route from localStorage and state
          localStorage.removeItem("directionsRoute");
          setDirectionsRoute(route);

          // Store new route in localStorage
          localStorage.setItem("directionsRoute", JSON.stringify(route));

          // Add custom markers for origin and destination
          const origin = route.legs[0].steps[0].maneuver.location;
          const destination =
            route.legs[0].steps.slice(-1)[0].maneuver.location;

          new mapboxgl.Marker({ color: "green" }).setLngLat(origin).addTo(map);

          new mapboxgl.Marker({ color: "red" })
            .setLngLat(destination)
            .addTo(map);
        }
      });

      // Check local storage for previous route
      // const storedRoute = localStorage.getItem("directionsRoute");
      // if (storedRoute) {
      //   const parsedRoute = JSON.parse(storedRoute);
      //   setDirectionsRoute(parsedRoute);
      //   // Set the route on the map
      //   directions.setOrigin(parsedRoute.legs[0].steps[0].maneuver.location);
      //   directions.setDestination(
      //     parsedRoute.legs[0].steps.slice(-1)[0].maneuver.location
      //   );

      // Add custom markers for origin and destination of stored route
      new mapboxgl.Marker({ color: "green" })
        .setLngLat(parsedRoute.legs[0].steps[0].maneuver.location)
        .addTo(map);

      new mapboxgl.Marker({ color: "red" })
        .setLngLat(parsedRoute.legs[0].steps.slice(-1)[0].maneuver.location)
        .addTo(map);
    }
    // }
  }, []);

  return (
    <div
      className="map-wrap"
      ref={mapContainerRef}
      style={{ width: "100%", height: "100vh" }}
    />
  );
};

export default MapboxPage;
