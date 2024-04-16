export const VehicleCard = ({ vehicle, routeDistance, onSelect }) => {
  const { type, description, icon, pricePerKm } = vehicle;
  const price = routeDistance ? routeDistance.toFixed() * pricePerKm : 0;

  return (
    <div
      onClick={() => onSelect(vehicle)}
      className={`vehicle grid grid-cols-3 justify-items-center p-2 border-2 hover:border-rose rounded-xl `}
    >
      {icon}
      <div>
        <h2>{type}</h2>
        <p>{description}</p>
      </div>
      <h3>₹{price}</h3>
    </div>
  );
};
