import React from "react";

function NotFound() {
  return (
    <div className="container flex items-center justify-center h-svh">
      <div className="flex flex-col justify-center items-center rounded-lg bg-congratsBg h-72">
        <img
          src="https://media1.tenor.com/m/9hvMOYJkWcYAAAAd/humanerror.gif"
          alt="404"
          className="h-48 w-48"
        />
        <span className="mt-3 text-2xl font-semibold text-center font-poppins">
          404 NotFound
        </span>
        <div className="flex justify-center grow"></div>
      </div>
    </div>
  );
}

export default NotFound;
