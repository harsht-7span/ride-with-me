// import React, { useContext, useState } from "react";
// import { MapContext, MapProvider } from "../context/MapContext";
// import Map from "./Map";
// import RouteForm from "./RouteForm";
// import { Drawer } from "vaul";
// import TriggerDrawer from "./mapPageComponents/triggerDrawer";
// import { LocationSchema } from "@/validation";
// import { useToast } from "./ui/use-toast"; // Make sure to import useToast
// import Booking from "./booking/booking";
// import RiderDetails from "@/pages/RiderDetails/RiderDetails";
// import { useNavigate } from "react-router-dom";

// const Test2 = () => {
//   // const [view, setView] = useState("form");
//   const [snap, setSnap] = useState(1);
//   // const [open, setOpen] = useState(false);
//   const { originInput, destinationInput, directions, open, setOpen } =
//     useContext(MapContext);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const handleRouteSearch = (e) => {
//     setSnap(1);
//     const originResult = LocationSchema.safeParse(originInput);
//     const destinationResult = LocationSchema.safeParse(destinationInput);

//     if (!originResult.success || !destinationResult.success) {
//       toast({
//         variant: "destructive",
//         title: "Please enter a valid address.",
//         duration: 2000,
//       });
//       return;
//     }

//     if (directions && originInput && destinationInput) {
//       directions.setOrigin(originInput);
//       directions.setDestination(destinationInput);
//     }
//     // console.log(directions);
//   };

//   const handleBooking = () => {
//     setView("booking");
//     setSnap(0.6);
//   };

//   return (
//     <Drawer.Root
//       snapPoints={[0.6, 1]}
//       activeSnapPoint={snap}
//       setActiveSnapPoint={setSnap}
//       open={open}
//     >
//       <div className="map-wrap h-[100vh] w-full ">
//         <Map />
//         <Drawer.Trigger
//           onClick={() => {
//             setOpen(true);
//             setSnap(1);
//           }}
//         >
//           <TriggerDrawer />
//         </Drawer.Trigger>
//         <Drawer.Portal>
//           <Drawer.Content className="z-10 bg-white flex items-center flex-col rounded-t-[10px] h-full mt-24 fixed bottom-0 left-0 right-0">
//             {/* <RouteForm
//               handleRouteSearch={handleRouteSearch}
//               handleBooking={handleBooking}
//             /> */}

//             {view === "form" ? (
//               <RouteForm
//                 handleRouteSearch={handleRouteSearch}
//                 handleBooking={handleBooking}
//               />
//             ) : (
//               <Booking />
//             )}
//           </Drawer.Content>
//         </Drawer.Portal>
//       </div>
//     </Drawer.Root>
//   );
// };

// export default Test2;

import React, { useContext, useState } from "react";
import { MapContext, MapProvider } from "../context/MapContext";
import Map from "./Map";
import RouteForm from "./RouteForm";
import { Drawer } from "vaul";
import TriggerDrawer from "./mapPageComponents/triggerDrawer";
import { LocationSchema } from "@/validation";
import { useToast } from "./ui/use-toast";
import Booking from "./booking/booking";
import RiderDetails from "@/pages/RiderDetails/RiderDetails";
import { useNavigate } from "react-router-dom";
import PaymentDetails from "@/pages/Payment/PaymentDetails";

const Test2 = () => {
  // const [snap, setSnap] = useState(1);
  // const [view, setView] = useState("form");
  const {
    originInput,
    destinationInput,
    directions,
    open,
    setOpen,
    view,
    setView,
    snap,
    setSnap,
  } = useContext(MapContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRouteSearch = (e) => {
    setSnap(1);
    const originResult = LocationSchema.safeParse(originInput);
    const destinationResult = LocationSchema.safeParse(destinationInput);

    if (!originResult.success || !destinationResult.success) {
      toast({
        variant: "destructive",
        title: "Please enter a valid address.",
        duration: 2000,
      });
      return;
    }

    if (directions && originInput && destinationInput) {
      directions.setOrigin(originInput);
      directions.setDestination(destinationInput);
    }
  };

  const handleBooking = () => {
    setView("booking");
    setSnap(0.6);
  };

  const handleRiderDetails = () => {
    setView("riderDetails");
    setSnap(0.6);
  };

  return (
    <Drawer.Root
      snapPoints={[0.6, 1]}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      open={open}
      dismissible={false}
    >
      <div className="map-wrap h-[100vh] w-full">
        <Map />
        <Drawer.Trigger
          onClick={() => {
            setOpen(true);
            setSnap(1);
          }}
        >
          <TriggerDrawer />
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Content className="z-10 bg-white flex items-center flex-col rounded-t-[10px] h-full mt-24 fixed bottom-0 left-0 right-0">
            {view === "form" && (
              <RouteForm
                handleRouteSearch={handleRouteSearch}
                handleBooking={handleBooking}
                handleRiderDetails={handleRiderDetails} // Add this prop to switch to rider details view
              />
            )}
            {view === "booking" && <Booking />}
            {view === "riderDetails" && <RiderDetails />}
            {view === "pay" && <PaymentDetails />}
          </Drawer.Content>
        </Drawer.Portal>
      </div>
    </Drawer.Root>
  );
};

export default Test2;
