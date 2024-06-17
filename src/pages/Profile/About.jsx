import React from "react";

function About() {
  return (
    <>
      <div className="container max-w-96 mx-auto p-6 rounded-lg">
      <div className="flex justify-start mb-4">
        <h1 className="font-poppins text-black font-bold text-4xl">
          About Us
        </h1>
      </div>
      <hr className="mb-4 border-rose border" />
      
      <p className="text-lg leading-relaxed text-gray-700 text-justify">
        Welcome to <span className="font-semibold text-rose-500">EasyGo</span>, your ultimate solution for effortless travel. From daily commutes to spontaneous adventures, EasyGo offers a range of vehicle options to fit your lifestyle. Our goal is simple: to make transportation easy and reliable for everyone.
      </p>

      <p className="text-lg leading-relaxed text-gray-700 text-justify mt-8">
        With a user-friendly interface and a dedicated team, EasyGo ensures a smooth experience from booking to destination. Thank you for choosing EasyGo as your travel companion!
      </p>

        {/* <div className="mt-8">
        <h2 className="font-poppins text-black font-bold text-3xl">
          Meet the Team
        </h2>
        <ul className="text-lg leading-relaxed text-gray-700 mt-4 space-y-2">
          <li>
            <strong className="text-rose-500">Project Manager:</strong> Mayank Savlani
          </li>
          <li>
            <strong className="text-rose-500">Frontend Developers:</strong> Heli Joshi, Harsh Tank
          </li>
          <li>
            <strong className="text-rose-500">Backend Developers:</strong> Dhrumil Parekh, Keval Rabadiya, Tushar Bhimani
          </li>
          <li>
            <strong className="text-rose-500">Mobile App Developers:</strong> Rydham Hansaliya, Abhi Dedania
          </li>
          <li>
            <strong className="text-rose-500">UI/UX Designer:</strong> Chaitali Shah
          </li>
        </ul>
      </div> */}
      </div>
    </>
  );
}

export default About;
