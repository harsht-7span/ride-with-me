import React, { useState } from "react";
import axios from "axios";

const DistanceMatrix = () => {
  const [originCoords, setOriginCoords] = useState("");
  const [destinationCoords, setDestinationCoords] = useState("");
  const [distance, setDistance] = useState(null);
  const apiKey =
    "qA2T7pGKEmxhaJj5pB5RY2M3YSTbRs9crSRmPzEeW5bKaiU0GHSZhhyFJzlqnwXc";

  const handleCalculateDistance = async () => {
    try {
      if (!originCoords || !destinationCoords) {
        alert("Please provide both origin and destination coordinates.");
        return;
      }

      const url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${originCoords}&destinations=${destinationCoords}&key=${apiKey}`;

      const response = await axios.get(url);

      if (response.data.status === "OK") {
        const distanceValue = response.data.rows[0].elements[0].distance.text;
        setDistance(distanceValue);
      } else {
        console.error("Distance calculation failed:", response.data.status);
        alert("Failed to calculate distance. Please try again.");
      }
    } catch (error) {
      console.error("Error calculating distance:", error);
      alert("Error calculating distance. Please try again.");
    }
  };

  const handleOriginChange = (event) => {
    setOriginCoords(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestinationCoords(event.target.value);
  };

  return (
    <div>
      <h2>Distance Calculator</h2>
      <div>
        <label>Origin Coordinates:</label>
        <input
          type="text"
          value={originCoords}
          onChange={handleOriginChange}
          placeholder="latitude,longitude"
        />
      </div>
      <div>
        <label>Destination Coordinates:</label>
        <input
          type="text"
          value={destinationCoords}
          onChange={handleDestinationChange}
          placeholder="latitude,longitude"
        />
      </div>
      <button onClick={handleCalculateDistance}>Calculate Distance</button>
      {distance && <p>Distance: {distance}</p>}
    </div>
  );
};

export default DistanceMatrix;
