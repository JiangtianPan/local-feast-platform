
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import mangoCoconutImage from "@/assets/menu/mangoCoconut.jpg";

interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const Menu = () => {
  // Mock data for menu items
  const allDishes: Dish[] = [
    {
      id: 1,
      name: "Spicy Boiled Fish",
      description: "Fresh fish with spicy chili oil, flavorful and aromatic",
      price: 68,
      image: "https://images.unsplash.com/photo-1623689046286-01d812215f98?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Hot Dishes"
    },
    {
      id: 2,
      name: "Braised Lion's Head Meatballs",
      description: "Selected pork, handmade meatballs, slow-braised to perfection",
      price: 48,
      image: "https://images.unsplash.com/photo-1541833000669-8dce2f9b5849?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Hot Dishes"
    },
    {
      id: 3,
      name: "Sweet and Sour Pork",
      description: "Crispy on the outside, tender inside with a perfect balance of sweet and sour",
      price: 52,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Hot Dishes"
    },
    {
      id: 4,
      name: "Kung Pao Chicken",
      description: "Chicken, peanuts, and chili peppers, a classic Sichuan dish",
      price: 42,
      image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Hot Dishes"
    },
    {
      id: 5,
      name: "Cucumber Salad",
      description: "Crisp and refreshing appetizer",
      price: 18,
      image: "https://images.unsplash.com/photo-1552825896-a4ea3616668c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Cold Dishes"
    },
    {
      id: 6,
      name: "Century Egg Tofu",
      description: "Traditional appetizer with silky texture",
      price: 22,
      image: "https://images.unsplash.com/photo-1604908177453-7462950a6a3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Cold Dishes"
    },
    {
      id: 7,
      name: "Millet Porridge",
      description: "Selected millet, cooked to soft and sweet perfection",
      price: 8,
      image: "https://images.unsplash.com/photo-1612966869328-91f67b36aa88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Staples"
    },
    {
      id: 8,
      name: "Handmade Steamed Buns",
      description: "Traditional handmade, fluffy and delicious",
      price: 3,
      image: "https://images.unsplash.com/photo-1529042410759-48171276cdb8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Staples"
    },
    {
      id: 9,
      name: "芒果椰浆西米露",
      description: "新鲜芒果配椰浆西米，热带风味浓郁，口感丰富",
      price: 32,
      image: mangoCoconutImage,
      category: "Desserts"
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
