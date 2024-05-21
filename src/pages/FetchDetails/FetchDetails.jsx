import React from "react";
import { Rikshaw, Location, Verticleline } from "@/icons";

// import component 👇
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";

const FetchDetails = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <button onClick={toggleDrawer}>Show</button>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="bottom"
        size="360px"
        className="bla bla bla rounded-t-3xl"
      >
        <div className="mx-4 text-left font-poppins ">
          <h1 className="font-medium mt-4 text-2xl leading-9">
            Confirming your auto
          </h1>
          <div className="my-7 flex flex-row justify-around">
            <div>
              <div class="progress-bar">
                <div class="progress-fill"></div>
              </div>
            </div>
            <div>
              <div class="progress-bar">
                <div class="progress-fill"></div>
              </div>
            </div>
            <div>
              <div class="progress-bar">
                <div class="progress-fill"></div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <Rikshaw className="h-[72px] -mt-4 w-[72px] " />
            <div>
              <p className="font-medium text-sm leading-5">Auto</p>
              <span className="font-normal text-[10px] leading-4">
                Get autos at your doorstep
              </span>
            </div>
            <p className="font-normal text-sm leading-5">₹123</p>
          </div>

          <div className="mt-4">
            <h1 className="font-medium text-base leading-6">Ride Details</h1>
            <div className="flex flex-row mt-2">
              <Location className="h-5 w-5" />
              <p className=" font-normal text-sm text-[#A2A2A2] leading-5">
                Marengo CIMS Hospital
              </p>
            </div>
            <Verticleline className="m-1 left-1 relative" />
            <div className="flex flex-row mt-2">
              <Location className="h-5 w-5" />
              <p className=" font-normal text-sm text-[#A2A2A2] leading-5">
                Marengo CIMS Hospital
              </p>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default FetchDetails;
