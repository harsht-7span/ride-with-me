import { Search } from "@/assets/icons";
import { Input } from "../ui";

function TriggerDrawer() {
  return (
    <div className="bg-white rounded-t-xl inset-x-0 w-full h-fit flex flex-col items-center gap-3 absolute bottom-0 p-3 ">
      <div className="w-7 h-1 bg-gray-500 rounded" />
      <div className="w-full border border-gray-500 flex items-center rounded px-4 gap-1">
        <Search />
        <Input
          className="border-none text-gray-500"
          type="text"
          placeholder="Search destination"
          autoComplete="street-address"
        />
      </div>
      <h2 className="text-xl font-medium py-4">Where would you like to go?</h2>
    </div>
  );
}

export default TriggerDrawer;
