import React, { useState } from "react";
import MapboxPage from "../../components/MapBoxPage";

function HomePage() {
  const [isSearchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <div id="homeParent" className="relative ">
        <div id="map">
          <MapboxPage />
        </div>
        <div className="absolute bottom-0 w-full h-full ">
          <div className="overflow-hidden bg-white rounded-t-xl">
            {/* Place the button outside the search section div */}
            <div
              onClick={toggleSearch}
              className="px-4 py-2 m-auto text-center text-white bg-blue-500 rounded"
            >
              {isSearchOpen ? "Hide Search" : "Show Search"}
            </div>
          </div>

          <div
            className={`bg-white rounded-t-xl transition-all duration-300 ${
              isSearchOpen ? "h-full" : "h-0"
            }`}
          >
            <div id="directions" className="py-2 space-y-3">
              <input
                type="text"
                placeholder="from"
                className="w-full px-4 bg-gray-300 "
              />
              <input
                placeholder="destination"
                type="text"
                className="w-full px-4 bg-gray-300 "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
