import { useNavigate } from "react-router-dom";
import cancel from "../../assets/signup/cancel.svg";
import congrats from "../../assets/signup/congrats.svg";
import Tick from "@/assets/icons/tick";
import { Button } from "@/components/ui";
// import { log } from "console";

const SuccessfullPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <div className="container flex items-center justify-center h-svh">
      <div className="flex flex-col justify-center items-center rounded-lg bg-congratsBg h-72">
        {/* <div className="flex justify-end mt-5 mr-4">
          <img
            onClick={handleClick}
            src={cancel}
            alt="cancel button"
            className="cursor-pointer"
          />
        </div> */}
        {/* <img
          src={Tick.url}
          alt="congrats"
          // className="flex justify-center size-20 cursor-pointer"
        /> */}
        <Tick />
        <span className="mt-3 text-2xl font-semibold text-center font-poppins">
          Your verification is successful
        </span>
        <div className="flex justify-center grow"></div>
        <div className="px-5 mt-4 mb-4">
          <Button
            type="submit"
            onClick={handleClick}
            className="gap-2 text-sm font-normal text-white rounded-xl bg-rose h-11 w-36 font-poppins"
          >
            Let’s ride!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessfullPage;
