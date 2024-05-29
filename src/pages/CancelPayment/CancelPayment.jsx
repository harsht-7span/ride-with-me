import { useNavigate } from "react-router-dom";
import cancel from "../../assets/signup/cancel.svg";
import congrats from "../../assets/signup/congrats.svg";
import Tick from "@/assets/icons/tick";
import { Button } from "@/components/ui";
import { CancelOutline } from "@/assets/icons/cancel";
// import { log } from "console";

const CancelPayment = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="container flex items-center justify-center h-svh">
      <div className="flex flex-col justify-center items-center rounded-lg bg-congratsBg h-72">
        <CancelOutline className="text-red-500 h-32 w-32" />
        <span className="mt-3 text-2xl font-semibold text-center font-poppins">
          Your Payment was unsuccessful!
        </span>
        <div className="flex justify-center grow"></div>
        <div className="px-5 mt-4 mb-4">
          <Button
            type="submit"
            onClick={handleClick}
            className="gap-2 text-sm font-normal text-white rounded-xl bg-rose h-11 w-36 font-poppins"
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CancelPayment;
