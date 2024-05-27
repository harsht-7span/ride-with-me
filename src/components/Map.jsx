import React, { useRef, useEffect, useContext, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { MapContext } from "../context/MapContext";
import ProfilePage from "@/pages/Profile/Profile";

const Map = () => {
  const mapContainerRef = useRef(null);
  const {
    setOriginInput,
    setDestinationInput,
    setRouteDistance,
    setOriginCoordinates,
    setDestinationCoordinates,
    setDirections,
    setMap,
  } = useContext(MapContext);

  const [isProfileVisible, setIsProfileVisible] = useState(false);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWF5YW5rLTAiLCJhIjoiY2x1MmhweHRmMHRnZTJtcGRvZXd1dzdxaCJ9.Jv2qrYH63lMJsb_JNvixzA";

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
          const address = data.features[0]?.text || "Unknown";
          setOriginInput(address);
        })
        .catch(() => {
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
        scrollZoom: true,
      });

      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showAccuracyCircle: true,
        showUserHeading: true,
        showUserLocation: true,
      });

      map.addControl(geolocate);

      map.on("load", () => {
        geolocate.trigger();
      });

      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/driving",
      });

      const nav = new mapboxgl.NavigationControl({
        showCompass: false,
        showZoom: false,
      });
      map.addControl(nav);

      map.addControl(directions, "top-right");

      directions.on("route", (e) => {
        const route = e.route && e.route[0];
        if (route) {
          const originCoords = route.legs[0].steps[0].maneuver.location;
          const destinationCoords =
            route.legs[0].steps.slice(-1)[0].maneuver.location;

          setOriginCoordinates(originCoords);
          setDestinationCoordinates(destinationCoords);

          const distanceInMeters = route.distance;
          const distanceInKm = distanceInMeters / 1000;
          setRouteDistance(distanceInKm);
        }
      });

      setMap(map);
      setDirections(directions);
    }
  }, []);

  const toggleProfileDrawer = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  return (
    <>
      <div
        ref={mapContainerRef}
        className="map-wrap w-full h-screen overflow-hidden"
      />
      <div className="fixed top-0 cursor-pointer" onClick={toggleProfileDrawer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </div>
      <ProfilePage
        isOpen={isProfileVisible}
        toggleDrawer={toggleProfileDrawer}
      />
    </>
  );
};

export default Map;
