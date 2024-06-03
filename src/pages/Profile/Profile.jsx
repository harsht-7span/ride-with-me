import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { getUserId, removeToken } from "@/lib/utils";
import { deleteUser, userId } from "@/api/user";

const ProfilePage = ({ isOpen, toggleDrawer }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const userIdlocal = getUserId();

  const fetchUserData = async () => {
    try {
      const response = await userId(userIdlocal);
      if (response.data.success) {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    removeToken();
    try {
      await deleteUser(userIdlocal);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
    navigate("/login");
  };

  const about = () => {
    navigate("/about");
  };
  const edit = () => {
    navigate("/edit");
  };
  const help = () => {
    navigate("/help");
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
                {userData ? userData.name.charAt(0) : "U"}
              </h2>
            </div>
          </label>

          <div className="font-medium text-[#414141] mt-5 text-left">
            <p className="text-lg leading-6">
              {userData ? userData.name : "User"}
            </p>
          </div>

          <div className="mt-10 font-normal text-sm leading-4  ">
            <div
              className="flex flex-row mt-2 mb-4 w-full cursor-pointer"
              onClick={edit}
            >
              <p className="text-left">Edit Profile</p>
            </div>
            <hr />
            <div
              onClick={about}
              className="flex flex-row mt-2 mb-4  w-full cursor-pointer"
            >
              <p className="text-left">About Us</p>
            </div>
            <hr />
            <div
              onClick={help}
              className="flex flex-row  mt-2 mb-4  w-full cursor-pointer"
            >
              <p className="text-left">Help and Support</p>
            </div>
            <hr />
            <div
              className="flex flex-row mt-2 mb-4  w-full cursor-pointer"
              onClick={handleLogout}
            >
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
