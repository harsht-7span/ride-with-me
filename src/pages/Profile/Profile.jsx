import React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({ isOpen, toggleDrawer }) => {
  const navigate = useNavigate();

  // Get the name from local storage
  const cus_name = localStorage.getItem("name");

  const edit = () => {
    navigate("/edit");
  };
  const back = () => {
    navigate("-1");
  };

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        size="249px"
        className="bla bla bla rounded-r-3xl"
      >
        <div className="ml-5 font-poppins flex flex-col">
          <label
            htmlFor="filee"
            className="w-16 h-16 bg-white mt-9 cursor-pointer"
          >
            <div className="h-16 w-16 bg-red-400 rounded-full flex justify-center items-center">
              <h2 className="text-white font-semibold text-2xl leading-6">
                {cus_name ? cus_name.charAt(0) : "heli"}
              </h2>
            </div>
          </label>

          <div className="font-medium text-[#414141] mt-5 text-left">
            <p className="text-lg leading-6">{cus_name ? cus_name : "User"}</p>
          </div>

          <div className="mt-10 font-normal text-sm leading-4">
            <div className="flex flex-row mt-2 mb-4">
              <p className="text-left cursor-pointer" onClick={edit}>
                Edit Profile
              </p>
            </div>
            <hr />
            <div className="flex flex-row  mt-2 mb-4">
              <p className="text-left">About Us</p>
            </div>
            <hr />
            <div className="flex flex-row  mt-2 mb-4">
              <p className="text-left">Help and Support</p>
            </div>
            <hr />
            <div className="flex flex-row  mt-2 mb-4">
              <p className="text-left">Logout</p>
            </div>
            <hr />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default ProfilePage;
