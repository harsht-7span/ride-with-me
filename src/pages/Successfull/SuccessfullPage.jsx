import { useNavigate } from "react-router-dom";
import cancel from "../../assets/signup/cancel.svg";
import congrats from "../../assets/signup/congrats.svg";

const SuccessfullPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/homePage");
  };

  return (
    <div className="container flex items-center justify-center h-svh">
      <div className="flex flex-col justify-center rounded-lg bg-congratsBg h-72">
        <div className="flex justify-end mt-5 mr-4">
          <img
            onClick={handleClick}
            src={cancel}
            alt="cancel button"
            className="cursor-pointer"
          />
        </div>
        <span className="mt-3 text-2xl font-semibold text-center font-poppins">
          Your verification was successful
        </span>
        <div className="flex justify-center grow">
          <img
            src={congrats}
            alt="congrats"
            className="flex justify-center size-20 cursor-pointer"
          />
        </div>
        <div className="px-5 mt-4 mb-4">
          <button
            type="submit"
            className="gap-2 text-sm font-normal text-white rounded-lg bg-BrandColor h-11 w-36 font-poppins"
          >
            Let’s ride!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessfullPage;
