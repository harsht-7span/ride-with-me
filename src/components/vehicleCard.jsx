export const VehicleCard = ({ vehicle, routeDistance, onSelect }) => {
  const { type, description, icon, pricePerKm } = vehicle;
  const price = routeDistance ? routeDistance.toFixed() * pricePerKm : 0;

  return (
    <div
      onClick={() => onSelect(vehicle)}
      className={`vehicle grid grid-cols-3 justify-between items-center p-2 border-2 hover:border-rose rounded-xl `}
    >
      <div className="mx-auto">{icon}</div>
      <div>
        <h2 className="text-sm font-medium ">{type}</h2>
        <p>{description}</p>
      </div>
      <div className="mx-auto">
        <h3>₹{price}</h3>
      </div>
    </div>
  );
};
