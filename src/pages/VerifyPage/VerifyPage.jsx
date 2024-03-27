import { useState, useRef, useEffect } from "react";
function VerifyPage() {
  const [codes, setCodes] = useState(["", "", "", ""]);
  const codeInputs = useRef([]);

  useEffect(() => {
    codeInputs.current[0].focus();
  }, []);

  const handleChange = (index, e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCodes = [...codes];
      newCodes[index] = value;
      setCodes(newCodes);
      if (value !== "" && index < 3) {
        codeInputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && codes[index] === "") {
      codeInputs.current[index - 1].focus();
    }
  };

  return (
    <div>
      <div className="container pt-16">
        <div className="flex justify-start">
          <h1 className="text-4xl text-black font-poppins">Verify</h1>
        </div>
        <div className="flex justify-start mt-2">
          <p className="text-sm font-normal text-grayB text-wrap font-poppins">
            Enter the code sent to xxxxx xxxxx
          </p>
        </div>
        <div className="flex h-64 mt-8 justify-evenly grow">
          {codes.map((code, index) => (
            <input
              key={index}
              type="text"
              id={`verificationCode${index}`}
              name={`verificationCode${index}`}
              value={code}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(input) => (codeInputs.current[index] = input)}
              maxLength="1"
              autoComplete="off"
              className="w-16 h-16 mr-2 text-2xl text-center border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
            />
          ))}
        </div>
        <div className="flex font-thin border-2 mt-9 rounded-xl bg-BrandColor">
          <button
            type="submit"
            className="w-full gap-2 px-4 py-4 text-sm font-normal text-white font-poppins"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyPage;
