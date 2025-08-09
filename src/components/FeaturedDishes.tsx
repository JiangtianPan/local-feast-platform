
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import strawberryCoconut from '@/assets/menu/strawberry_coconut.jpg';
import brownMilkTea from '@/assets/menu/brown_sugar_pearl.jpg';
import matchaMilk from '@/assets/menu/matcha_brown_sugar.jpg';

interface Dish {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

const FeaturedDishes = () => {
  // Mock data for featured dishes
  const featuredDishes: Dish[] = [
    {
      id: 1,
      name: "Fresh Strawberry Coconut",
      description: "",
      price: "6.29(M) /6.89(L)",
      image: strawberryCoconut,
      category: "Fresh Coconut Series"
    },
    {
      id: 2,
      name: "Brown Sugar Pearl Milk Tea",
      description: "",
      price: "5.79(M) /6.39(L)",
      image: brownMilkTea,
      category: "Signature Milk Tea Series"
    },
    {
      id: 3,
      name: "Matcha Brown Sugar Fresh Milk",
      description: "",
      price: "6.09(M) /6.69(L)",
      image: matchaMilk,
      category: "Fresh Milk Tea Series"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif">Top Sellers</h2>
          <div className="w-24 h-1 bg-restaurant-500 mx-auto mt-4 mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These are our most popular drinks, each one created with our chef's dedication and creativity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDishes.map((dish) => (
            <div key={dish.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <div className="h-56 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold">{dish.name}</h3>
                  <span className="text-restaurant-600 font-bold">${dish.price}</span>
                </div>
                <p className="text-gray-600 mb-4">{dish.description}</p>
                <div className="flex justify-between items-center">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {dish.category}
                  </span>
                  <Link to={`/menu`}>
                    <Button className="bg-restaurant-600 hover:bg-restaurant-700 text-white">
                      Add to Cart
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/menu">
            <Button variant="outline" className="border-restaurant-600 text-restaurant-600 hover:bg-restaurant-600 hover:text-white px-8 py-2">
              View Full Menu
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;
