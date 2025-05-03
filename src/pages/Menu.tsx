
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DishCard from "@/components/DishCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

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
      name: "水煮鱼",
      description: "新鲜鱼肉，辣椒油浇制，香辣可口",
      price: 68,
      image: "https://images.unsplash.com/photo-1623689046286-01d812215f98?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "热菜"
    },
    {
      id: 2,
      name: "红烧狮子头",
      description: "精选猪肉，手工制作肉丸，红烧工艺",
      price: 48,
      image: "https://images.unsplash.com/photo-1541833000669-8dce2f9b5849?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "热菜"
    },
    {
      id: 3,
      name: "锅包肉",
      description: "酸甜可口，外酥里嫩",
      price: 52,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "热菜"
    },
    {
      id: 4,
      name: "宫保鸡丁",
      description: "鸡肉、花生、辣椒，经典川菜",
      price: 42,
      image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "热菜"
    },
    {
      id: 5,
      name: "凉拌黄瓜",
      description: "清脆爽口，开胃小菜",
      price: 18,
      image: "https://images.unsplash.com/photo-1552825896-a4ea3616668c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "凉菜"
    },
    {
      id: 6,
      name: "皮蛋豆腐",
      description: "传统小吃，口感绵软",
      price: 22,
      image: "https://images.unsplash.com/photo-1604908177453-7462950a6a3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "凉菜"
    },
    {
      id: 7,
      name: "小米粥",
      description: "精选小米，熬制绵软香甜",
      price: 8,
      image: "https://images.unsplash.com/photo-1612966869328-91f67b36aa88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "主食"
    },
    {
      id: 8,
      name: "手工馒头",
      description: "传统手工制作，松软可口",
      price: 3,
      image: "https://images.unsplash.com/photo-1529042410759-48171276cdb8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "主食"
    },
    {
      id: 9,
      name: "酸奶水果沙拉",
      description: "新鲜水果配酸奶，健康美味",
      price: 28,
      image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "甜品"
    }
  ];

  const categories = ["全部", ...Array.from(new Set(allDishes.map(dish => dish.category)))];
  
  const [activeCategory, setActiveCategory] = useState("全部");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>(allDishes);
  const [cart, setCart] = useState<Dish[]>([]);

  const handleAddToCart = (dish: Dish) => {
    setCart(prev => [...prev, dish]);
    // Show a toast or notification here
  };

  useEffect(() => {
    let result = allDishes;
    
    // Filter by category
    if (activeCategory !== "全部") {
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
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">我们的菜单</h1>
            <p className="max-w-2xl mx-auto">
              探索我们精心烹制的各类美食，从传统佳肴到创新菜品，总有一款适合您的口味。
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
                  placeholder="搜索菜品..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-restaurant-500 focus:border-restaurant-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            {/* Menu Items Grid */}
            {filteredDishes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDishes.map(dish => (
                  <DishCard key={dish.id} dish={dish} onAddToCart={handleAddToCart} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">没有找到符合条件的菜品</p>
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
