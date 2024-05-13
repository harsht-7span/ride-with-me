import React, { useState } from "react";
import MapboxPage from "../../components/MapBoxPage";

import AutofillCheckoutDemo from "@/components/autofill";

function HomePage() {
  const [isSearchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <div id="homeParent" className="relative ">
        <div id="map">
          {/* <MapboxPage /> */}
          <Test />
          {/* <AutofillCheckoutDemo /> */}
        </div>
      </div>
    </>
  );
}

export default HomePage;
