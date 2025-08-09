
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

import mangoCoconut from '@/assets/menu/mango_coconut.jpg';
import pineappleCoconut from '@/assets/menu/pineapple_machiato.jpg';
import strawberryCoconut from '@/assets/menu/strawberry_coconut.jpg';
import taroMatcha from '@/assets/menu/taro_matcha.jpg';

import mangoMacchiato from '@/assets/menu/mango_matchiato.jpg';
import grapeMacchiato from '@/assets/menu/grape_machiato.jpg';
import strawberryMacchiato from '@/assets/menu/strawberry_machiato.jpg';
import pineappleMacchiato from '@/assets/menu/pineapple_machiato.jpg';
import matchaMacchiato from '@/assets/menu/matcha_machiato.jpg';
import chocolateMacchiato from '@/assets/menu/chocalate_machiato.jpg';

import signatureMilkTea from '@/assets/menu/signature_milktea.jpg';
import jasmineMilkTea from '@/assets/menu/jasmin_milk_green_tea.jpg';
import brownMilkTea from '@/assets/menu/brown_sugar_pearl.jpg';
import puddingMilkTea from '@/assets/menu/pudding_milktea.jpg';
import grassMilkTea from '@/assets/menu/grass_jelly.jpg';
import readbeanMilkTea from '@/assets/menu/redbean_milktea.jpg';
import coconutjellyMilkTea from '@/assets/menu/coconut_jelly.jpg';
import twoGirls from '@/assets/menu/coconut_jelly.jpg';
import threeBoys from '@/assets/menu/three_boys.jpg';
import taroMilkTea from '@/assets/menu/taro_bubble.jpg';
import taroGreenTea from '@/assets/menu/taro_bubble.jpg';

import jasmineMilk from '@/assets/menu/jasmin_milk_green_tea.jpg';
import honeyMilk from '@/assets/menu/jasmin_milk_green_tea.jpg';
import muddyMilk from '@/assets/menu/muddy_freshmilk.jpg';
import matchaMilk from '@/assets/menu/matcha_brown_sugar.jpg';
import strawberryMilk from '@/assets/menu/strawnberry_matcha.jpg';

import greenLemon from '@/assets/menu/lemon_green_tea.jpg';
import blackLemon from '@/assets/menu/lemon_black_tea.jpg';
import passionfruitLemon from '@/assets/menu/passion_fruit_lemon.jpg';
import strawberryLemon from '@/assets/menu/strawberry_lemon.jpg';
import mangoLemon from '@/assets/menu/mango_lemon_tea.jpg';

import passionfruitTea from '@/assets/menu/passion_fruit.jpg';
import orangeTea from '@/assets/menu/orange_ice_tea.jpg';
import grapeTea from '@/assets/menu/grape_machiato.jpg';
import mangoTea from '@/assets/menu/mango_lemon_tea.jpg';
import strawberryTea from '@/assets/menu/strawberry_lemon.jpg';
import mangoPomelo from '@/assets/menu/mango_pamelo.jpg';

interface Dish {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

const Menu = () => {
  // Mock data for menu items
  const allDishes: Dish[] = [
    {
      id: 1,
      name: "Fresh Mango Coconut",
      description: "210 cal (M) / 280 cal (L)",
      price: "6.09(M) /6.69(L)",
      image: mangoCoconut,
      category: "Fresh Coconut Series"
    },
    {
      id: 2,
      name: "Fresh Pineapple Coconut",
      description: "",
      price: "6.09(M) /6.69(L)",
      image: pineappleCoconut,
      category: "Fresh Coconut Series"
    },
    {
      id: 3,
      name: "Fresh Strawberry Coconut",
      description: "",
      price: "6.09(M) /6.69(L)",
      image: strawberryCoconut,
      category: "Fresh Coconut Series"
    },
    {
      id: 4,
      name: "Taro Matcha Coconut",
      description: "",
      price: "6.29(M) /6.89(L)",
      image: taroMatcha,
      category: "Fresh Coconut Series"
    },
    {
      id: 5,
      name: "Fresh Mango Macchiato",
      description: "",
      price: "5.99(M) /6.59(L)",
      image: mangoMacchiato,
      category: "Cheese Fresh Fruit Series"
    },
    {
      id: 6,
      name: "Grape Macchiato",
      description: "",
      price: "5.99(M) /6.59(L)",
      image: grapeMacchiato,
      category: "Cheese Fresh Fruit Series"
    },
    {
      id: 7,
      name: "Strawberry Macchiato",
      description: "",
      price: "5.99(M) /6.59(L)",
      image: strawberryMacchiato,
      category: "Cheese Fresh Fruit Series"
    },
    {
      id: 8,
      name: "Pineapple Macchiato",
      description: "",
      price: "5.99(M) /6.59(L)",
      image: pineappleMacchiato,
      category: "Cheese Fresh Fruit Series"
    },
    {
      id: 9,
      name: "Matcha Macchiato",
      description: "",
      price: "5.99(M) /6.59(L)",
      image: matchaMacchiato,
      category: "Cheese Fresh Fruit Series"
    },
    {
      id: 10,
      name: "Black Chololate Macchiato",
      description: "",
      price: "5.99(M) /6.59(L)",
      image: chocolateMacchiato,
      category: "Cheese Fresh Fruit Series"
    },
    {
      id: 11,
      name: "Signature Milk Tea",
      description: "",
      price: "5.29(M) /5.99(L)",
      image: signatureMilkTea,
      category: "Signature Milk Tea Series"
    },
    {
      id: 12,
      name: "Jasmine Milk Green Tea",
      description: "",
      price: "5.29(M) /5.99(L)",
      image: jasmineMilkTea,
      category: "Signature Milk Tea Series"
    },
    {
      id: 13,
      name: "Brown Sugar Pearl Milk Tea",
      description: "",
      price: "5.79(M) /6.39(L)",
      image: brownMilkTea,
      category: "Signature Milk Tea Series"
    },
    {
      id: 14,
      name: "Pudding Milk Tea",
      description: "",
      price: "5.59(M) /6.19(L)",
      image: puddingMilkTea,
      category: "Signature Milk Tea Series"
    },
    {
      id: 15,
      name: "Grass Jelly Milk Tea",
      description: "",
      price: "5.59(M) /6.19(L)",
      image: grassMilkTea,
      category: "Signature Milk Tea Series"
    },
    {
      id: 16,
      name: "Red Bean Milk Tea",
      description: "",
      price: "5.59(M) /6.19(L)",
      image: readbeanMilkTea,
      category: "Signature Milk Tea Series"
    },
    {
      id: 17,
      name: "Coconut Jelly Milk Tea",
      description: "",
      price: "5.79(M) /6.39(L)",
      image: coconutjellyMilkTea,
      category: "Signature Milk Tea Series"
    },
    {
      id: 18,
      name: "2 Girls",
      description: "",
      price: "5.89(M) /6.49(L)",
      image: twoGirls,
      category: "Signature Milk Tea Series"
    },
    {
      id: 19,
      name: "3 Boys",
      description: "",
      price: "5.99(M) /6.59(L)",
      image: threeBoys,
      category: "Signature Milk Tea Series"
    },
    {
      id: 20,
      name: "Taro Bubble Milk Tea",
      description: "",
      price: "5.89(M) /6.49(L)",
      image: taroMilkTea,
      category: "Signature Milk Tea Series"
    },
    {
      id: 21,
      name: "Taro Bubble Milk Green Tea",
      description: "",
      price: "5.89(M) /6.49(L)",
      image: taroGreenTea,
      category: "Signature Milk Tea Series"
    },
    {
      id: 22,
      name: "Jasmine Fresh Milk Tea",
      description: "",
      price: "5.89(M) /6.49(L)",
      image: jasmineMilk,
      category: "Fresh Milk Tea Series"
    },
    {
      id: 23,
      name: "Honey Fresh Milk Tea",
      description: "",
      price: "5.89(M) /6.49(L)",
      image: honeyMilk,
      category: "Fresh Milk Tea Series"
    },
    {
      id: 24,
      name: "Muddy Fresh Milk Tea (Cocoa)",
      description: "",
      price: "6.09(M) /6.69(L)",
      image: muddyMilk,
      category: "Fresh Milk Tea Series"
    },
    {
      id: 25,
      name: "Matcha Brown Sugar Fresh Milk",
      description: "",
      price: "6.09(M) /6.69(L)",
      image: matchaMilk,
      category: "Fresh Milk Tea Series"
    },
    {
      id: 26,
      name: "Strawberry Matcha Fresh Milk",
      description: "",
      price: "6.09(M) /6.69(L)",
      image: strawberryMilk,
      category: "Fresh Milk Tea Series"
    },
    {
      id: 27,
      name: "Lemon Green Tea",
      description: "",
      price: "4.79(M) /5.39(L)",
      image: greenLemon,
      category: "Lemon Tea Series"
    },
    {
      id: 28,
      name: "Lemon Black Tea",
      description: "",
      price: "4.79(M) /5.39(L)",
      image: blackLemon,
      category: "Lemon Tea Series"
    },
    {
      id: 29,
      name: "Passion Fruit Lemon Tea",
      description: "",
      price: "5.29(M) /5.89(L)",
      image: passionfruitLemon,
      category: "Lemon Tea Series"
    },
    {
      id: 30,
      name: "Strawberry Lemon Tea",
      description: "",
      price: "5.29(M) /5.89(L)",
      image: strawberryLemon,
      category: "Lemon Tea Series"
    },
    {
      id: 31,
      name: "Mango Lemon Tea",
      description: "",
      price: "5.29(M) /5.89(L)",
      image: mangoLemon,
      category: "Lemon Tea Series"
    },
    {
      id: 32,
      name: "Passion Fruit Tea",
      description: "",
      price: "5.89(M) /6.49(L)",
      image: passionfruitTea,
      category: "Fresh Fruit Tea Series"
    },
    {
      id: 33,
      name: "Orange Ice Tea",
      description: "",
      price: "5.49(M) /6.09(L)",
      image: orangeTea,
      category: "Fresh Fruit Tea Series"
    },
    {
      id: 34,
      name: "Grape Ice Tea",
      description: "",
      price: "5.49(M) /6.09(L)",
      image: grapeTea,
      category: "Fresh Fruit Tea Series"
    },
    {
      id: 35,
      name: "Mango Ice Tea",
      description: "",
      price: "5.49(M) /6.09(L)",
      image: mangoTea,
      category: "Fresh Fruit Tea Series"
    },
    {
      id: 36,
      name: "Strawberry Ice Tea",
      description: "",
      price: "5.49(M) /6.09(L)",
      image: strawberryTea,
      category: "Fresh Fruit Tea Series"
    },
    {
      id: 37,
      name: "Mango Pomelo Sago",
      description: "",
      price: "5.89(M) /6.49(L)",
      image: mangoPomelo,
      category: "Fresh Fruit Tea Series"
    }
  ];

  const categories = ["All", ...Array.from(new Set(allDishes.map(dish => dish.category)))];
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>(allDishes);

  useEffect(() => {
    let result = allDishes;
    
    // Filter by category
    if (activeCategory !== "All") {
      result = result.filter(dish => dish.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        dish => 
          dish.name.toLowerCase().includes(term) || 
          dish.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredDishes(result);
  }, [activeCategory, searchTerm]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-restaurant-700 text-white py-16">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">Our Menu</h1>
            <p className="max-w-2xl mx-auto">
              Explore our carefully prepared dishes, from traditional favorites to innovative creations.
            </p>
          </div>
        </section>

        {/* Menu Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="flex overflow-x-auto pb-2 mb-4 md:mb-0 gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    className={
                      activeCategory === category 
                        ? "bg-restaurant-600 hover:bg-restaurant-700 text-white" 
                        : "border-restaurant-600 text-restaurant-600 hover:bg-restaurant-600 hover:text-white"
                    }
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-restaurant-500 focus:border-restaurant-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            {/* Menu Items Grid */}
            {filteredDishes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredDishes.map(dish => (
                  <div key={dish.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
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
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {dish.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No dishes found matching your criteria</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Menu;
