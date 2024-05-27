import {
  Backarrow,
  DisplayPhoto,
  Camera,
  DisplayEdit,
  Name,
  Phone,
} from "@/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {


  const navigate = useNavigate();
  const ProfilePage = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="mt-6 flex gap-5 ">
        <Backarrow className="ml-5"   onClick={ProfilePage} />
        <p className="font-semibold text-xl leading-5">Edit Profile</p>
      </div>

      <div className="mx-4 mt-[47px]">
        <div className="flex  justify-center">
          <label
            htmlFor="filee"
            className="w-[138px] h-[138px] bg-white mt-9 text-center cursor-pointer"
          >
            <DisplayEdit />
          </label>
          <input id="filee" type="file" className="w-16 h-16 hidden" />
        </div>

        <div className="mt-8">
          <p className="font-medium text-3xl leading-9 text-[#616161]">
            Anne Blake
          </p>

          <div className="flex flex-col gap-3 mt-8 items-center ">
            {/* <Name /> */}
            <input
              type="text"
              className="border w-[328px] h-[48px] rounded-lg  pl-5 py-3 "
              placeholder="Name"
            />

            {/* <Phone /> */}
            <input
              type="tel"
              className="border w-[328px] h-[48px] rounded-lg pl-5 py-3"
              placeholder="Phone"
              maxLength={10}
              required
            />

            <button className="w-80 h-12 rounded-xl p-2 text-white bg-[#FF6C96] font-semibold text-sm leading-5 mx-auto mt-10">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
