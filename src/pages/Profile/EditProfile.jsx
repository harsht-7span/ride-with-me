import { userId, updateUser } from "@/api/user"; // Adjust the import path as needed
import { Arrow, UserOutline } from "@/assets/icons";
import Email from "@/assets/icons/email";
import { Input } from "@/components/ui";
import { useToast } from "@/components/ui/use-toast";
import { getUserId } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();
  const ProfilePage = () => {
    navigate(-1);
  };

  const userIdlocal = getUserId();

  const { toast } = useToast();

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await updateUser(userData, userIdlocal);
      if (response.data.success) {
        toast({
          variant: "success",
          title: "Profile Updated",
          isClosable: true,
          autodismisstimeout: 1,
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Profile Updated",
        isClosable: true,
        autodismisstimeout: 1,
      });
    }
  };

  return (
    <div>
      <div className="mt-6 flex gap-5 ">
        <div onClick={ProfilePage}>
          <Arrow />
        </div>
        <p className="font-semibold text-xl">Edit Profile</p>
      </div>

      <div className="mx-4 mt-[47px]">
        <div className="flex  justify-center">
          <label
            htmlFor="filee"
            className="w-[138px] h-[138px] bg-white mt-9 text-center cursor-pointer"
          >
            <div className="bg-blue-200 w-36 h-36 rounded-full flex items-center justify-center">
              <h2 className="text-black font-semibold text-7xl">
                {userData ? userData.name.charAt(0) : "U"}
              </h2>
            </div>
          </label>
          <input id="filee" type="file" className="w-16 h-16 hidden" />
        </div>

        <div className="pt-8">
          <p className="font-medium text-3xl leading-9 text-gray-500 text-center">
            {userData.name}
          </p>

          <div className="flex flex-col gap-3 mt-8 items-center max-w-96 mx-auto ">
            <div className="flex items-center border-2 rounded px-4 w-full">
              <UserOutline className="text-gray-400 h-4 w-4" />
              <Input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="border-none w-80 h-12 rounded-lg pl-5 py-3"
                placeholder="Name"
              />
            </div>

            <div className="flex items-center border-2 rounded w-full px-4">
              <Email className="text-gray-400 h-4 w-4" />
              <Input
                type="text"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="border-none w-80 h-12 rounded-lg pl-5 py-3"
                placeholder="Email"
              />
            </div>

            <button
              onClick={handleSave}
              className="h-12 w-full rounded p-2 text-white bg-[#FF6C96] font-semibold text-sm mt-10"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
