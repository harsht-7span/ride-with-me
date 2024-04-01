import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

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

  return <div id="map" style={{ width: "100%", height: "100vh" }}></div>;
};

export default MapboxPage;
