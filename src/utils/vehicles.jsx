import { Bike, Auto, Mini, Xl } from "@/assets/icons/index";

export const vehicles = [
  {
    type: "Bike",
    description: "Get bikes at your doorstep",
    icon: <Bike />,
    pricePerKm: 20,
  },
  {
    type: "Auto",
    description: "Get autos at your doorstep",
    icon: <Auto />,
    pricePerKm: 30,
  },
  {
    type: "Mini",
    description: "Comfy, sconomical cars ",
    icon: <Mini />,
    pricePerKm: 40,
  },
  {
    type: "Premium",
    description: "Spacious sedans, top drivers",
    icon: <Xl />,
    pricePerKm: 50,
  },
  {
    type: "Xl",
    description: "Spacious sedans, top drivers",
    icon: <Xl />,
    pricePerKm: 60,
  },
];
