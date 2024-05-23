import MapboxPage from "../../components/MapBoxPage";
import { Button, Input } from "@/components/ui";
import { Search } from "@/assets/icons";
// import LocationMarker from "@/assets/icons/locationMarker";
import { Drawer } from "vaul";
import Test from "@/components/Test";

function HomePage() {
  return (
    <>
      <div className="relative">
        <div id="map">
          {/* <MapboxPage /> */}
          <Test />
          {/* <RiderDetails /> */}
          {/* <AutofillCheckoutDemo /> */}
        </div>
        {/* <div className="absolute z-10 bottom-0 w-full translate-x-1/2 -translate-y-1/2 ">
          <Button className="bg-rose rounded-xl p-2 ">Book Auto</Button>
        </div> */}
      </div>
    </>
  );
}

export default HomePage;
