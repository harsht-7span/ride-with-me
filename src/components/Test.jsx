import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "./ui";

function Test() {
  const api =
    "https://api.distancematrix.ai/maps/api/distancematrix/json?origins=51.4822656,-0.1933769&destinations=51.4994794,-0.1269979&key=qA2T7pGKEmxhaJj5pB5RY2M3YSTbRs9crSRmPzEeW5bKaiU0GHSZhhyFJzlqnwXc";
  const mapDistance = axios
    .get(api)
    .then((res) => {
      console.log("then: ", res?.data?.rows[0]?.elements[0]?.distance?.text);
    })
    .catch((res) => {
      console.log("catch: ", res);
    });
  return (
    <>
      <div>
        <Button> Click </Button>
      </div>
    </>
  );
}

export default Test;
