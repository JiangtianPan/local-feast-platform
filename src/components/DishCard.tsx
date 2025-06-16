
interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface DishCardProps {
  dish: Dish;
}

const DishCard = ({ dish }: DishCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="h-48 overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">{dish.name}</h3>
          <span className="text-restaurant-600 font-bold">${dish.price}</span>
        </div>
        <p className="text-gray-600 text-sm mb-3 h-12 overflow-hidden">
          {dish.description}
        </p>
        <div className="flex justify-center">
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
            {dish.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
