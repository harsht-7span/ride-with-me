import React, { useState } from "react";
import geocoder from "geocoder";

function DistanceMatrix() {
  const [originCoordinate, setOriginCoordinate] = useState("");
  const [destinationCoordinate, setDestinationCoordinate] = useState("");
  const [originAddress, setOriginAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [originLatLng, setOriginLatLng] = useState("");
  const [destinationLatLng, setDestinationLatLng] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCoordinates = async () => {
    if (originAddress) {
      geocoder.geocode(originAddress, (err, data) => {
        if (!err && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setOriginLatLng(`${lat},${lng}`);
        } else {
          setOriginLatLng("");
          setError("Failed to fetch origin coordinates");
        }
      });
    }

    if (destinationAddress) {
      Geocoder.geocode(destinationAddress, (err, data) => {
        if (!err && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setDestinationLatLng(`${lat},${lng}`);
        } else {
          setDestinationLatLng("");
          setError("Failed to fetch destination coordinates");
        }
      });
    }
  };

  const handleFetchAddresses = async () => {
    if (!originCoordinate.trim() || !destinationCoordinate.trim()) {
      setError(
        "Please enter valid coordinates for both origin and destination"
      );
      return;
    }

    const [originLat, originLng] = originCoordinate.split(",");
    const [destLat, destLng] = destinationCoordinate.split(",");

    const apiUrl = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${originLat},${originLng}&destinations=${destLat},${destLng}&key=qA2T7pGKEmxhaJj5pB5RY2M3YSTbRs9crSRmPzEeW5bKaiU0GHSZhhyFJzlqnwXc`;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === "OK") {
        const originAddr = data.origin_addresses[0];
        const destAddr = data.destination_addresses[0];
        setOriginAddress(originAddr);
        setDestinationAddress(destAddr);
        fetchCoordinates(); // Fetch coordinates based on addresses
      } else {
        setOriginAddress("");
        setDestinationAddress("");
        setError("Addresses not found");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setOriginAddress("");
      setDestinationAddress("");
      setError("Error fetching addresses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOriginCoordinateChange = (e) => {
    setOriginCoordinate(e.target.value);
    setOriginAddress(""); // Clear origin address when origin coordinate changes
    setOriginLatLng(""); // Clear origin lat lng when origin coordinate changes
    setError(""); // Clear error message
  };

  const handleDestinationCoordinateChange = (e) => {
    setDestinationCoordinate(e.target.value);
    setDestinationAddress(""); // Clear destination address when destination coordinate changes
    setDestinationLatLng(""); // Clear destination lat lng when destination coordinate changes
    setError(""); // Clear error message
  };

  return (
    <div>
      <h2>Address Fetcher</h2>
      <div>
        <label>Origin Coordinates (latitude,longitude):</label>
        <input
          type="text"
          value={originCoordinate}
          onChange={handleOriginCoordinateChange}
        />
      </div>
      <div>
        <label>Destination Coordinates (latitude,longitude):</label>
        <input
          type="text"
          value={destinationCoordinate}
          onChange={handleDestinationCoordinateChange}
        />
      </div>
      <button onClick={handleFetchAddresses}>Fetch Addresses</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {originAddress && (
        <div>
          <p>Origin Address: {originAddress}</p>
          <p>Origin Lat/Lng: {originLatLng}</p>
        </div>
      )}
      {destinationAddress && (
        <div>
          <p>Destination Address: {destinationAddress}</p>
          <p>Destination Lat/Lng: {destinationLatLng}</p>
        </div>
      )}
    </div>
  );
}

export default DistanceMatrix;
