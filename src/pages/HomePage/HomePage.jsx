import MapboxPage from "../../components/MapBoxPage";
import { Input } from "@/components/ui";
import Search from "@/assets/icons/search";
import LocationMarker from "@/assets/icons/locationMarker";
import { Drawer } from "vaul";

function HomePage() {
  return (
    <>
      <div className=" ">
        <div id="map">
          <MapboxPage />
        </div>

        {/* <div className="  w-full h-[100px] bottom-0 rounded-t-3xl absolute z-10 bg-green-500 container">
          <div className="w-7 h-1 bg-gray-500 rounded flex m-auto mt-2 mb-3"></div>
          <div className="flex gap-1 rounded items-center justify-center border-2 border-gray-500 mt-6 mb-4 ">
            <Search />
            <Input
              type="text"
              placeholder="Search destination"
              className="border-1  border-gray-500 bg-red-500 text-white "
            />
          </div>
          <h1 className="font-medium text-xl leading-8">
            Where would you like to go?
          </h1>
          <div className="flex gap-1 rounded items-center justify-center border-2 border-gray-500 mt-6 mb-4 ">
            <LocationMarker />
            <Input
              type="text"
              placeholder="Nearest location suggestion 1"
              className="border-1  border-gray-500 bg-red-500 text-white "
            />
          </div>
          <div className="flex gap-1 rounded items-center justify-center border-2 border-gray-500 mt-6 mb-4 ">
            <LocationMarker />
            <Input
              type="text"
              placeholder="Nearest location suggestion 2"
              className="border-1  border-gray-500 bg-red-500 text-white "
            />
          </div>
        </div> */}
      </div>
    </>
  );
}

export default HomePage;
