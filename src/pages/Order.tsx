
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DishCard from "@/components/DishCard";
import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Search, ShoppingCart, X } from "lucide-react";
import { toast } from "sonner";

interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Dish {
  quantity: number;
}

const Order = () => {
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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    phone: "",
    address: "",
    note: ""
  });

  const handleAddToCart = (dish: Dish) => {
    setCart(prev => {
      // Check if item exists in cart
      const itemExists = prev.find(item => item.id === dish.id);
      
      if (itemExists) {
        // Increment quantity
        return prev.map(item => 
          item.id === dish.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new item
        return [...prev, { ...dish, quantity: 1 }];
      }
    });
    
    toast.success(`已添加 ${dish.name} 到购物车`);
  };

  const handleIncrement = (id: number) => {
    setCart(prev => prev.map(item => 
      item.id === id 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
    ));
  };

  const handleDecrement = (id: number) => {
    setCart(prev => prev.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity - 1) } 
        : item
    ));
  };

  const handleRemove = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsCheckingOut(false);
      setCart([]);
      setContactInfo({
        name: "",
        phone: "",
        address: "",
        note: ""
      });
      setIsCartOpen(false);
      toast.success("订单已提交！我们会尽快准备并配送。");
    }, 1500);
  };

  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
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
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">在线点单</h1>
            <p className="max-w-2xl mx-auto">
              轻松在线点餐，美食即刻送达。足不出户，享受本地美味。
            </p>
          </div>
        </section>

        {/* Order Section */}
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
              
              <div className="flex items-center gap-4">
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
                
                <Button 
                  variant="outline"
                  className="relative flex items-center border-restaurant-600 text-restaurant-600 hover:bg-restaurant-600 hover:text-white"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart className="mr-2" size={18} />
                  <span>购物车</span>
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-restaurant-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                      {cart.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                </Button>
              </div>
            </div>

            {/* Menu Items Grid */}
            {filteredDishes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsCartOpen(false)}
          ></div>
          
          {/* Cart Panel */}
          <div className="relative bg-white w-full max-w-md h-full overflow-y-auto flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">购物车</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6">
                <ShoppingCart size={64} className="text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg mb-4">购物车是空的</p>
                <Button 
                  onClick={() => setIsCartOpen(false)}
                  className="bg-restaurant-600 hover:bg-restaurant-700 text-white"
                >
                  继续点餐
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 p-4 space-y-2">
                  {cart.map(item => (
                    <CartItem 
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      image={item.image}
                      onIncrement={handleIncrement}
                      onDecrement={handleDecrement}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
                
                <div className="p-4 border-t">
                  <div className="flex justify-between py-2">
                    <span>小计</span>
                    <span>¥{calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>配送费</span>
                    <span>¥5.00</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between py-2 text-lg font-bold">
                    <span>总计</span>
                    <span>¥{(calculateTotal() + 5).toFixed(2)}</span>
                  </div>
                  
                  <form onSubmit={handleCheckout} className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        姓名
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={contactInfo.name}
                        onChange={handleContactInfoChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-restaurant-500 focus:border-restaurant-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        电话
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={contactInfo.phone}
                        onChange={handleContactInfoChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-restaurant-500 focus:border-restaurant-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        配送地址
                      </label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        required
                        value={contactInfo.address}
                        onChange={handleContactInfoChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-restaurant-500 focus:border-restaurant-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                        备注
                      </label>
                      <textarea
                        id="note"
                        name="note"
                        rows={2}
                        value={contactInfo.note}
                        onChange={handleContactInfoChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-restaurant-500 focus:border-restaurant-500"
                        placeholder="如有特别要求，请告诉我们..."
                      ></textarea>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-restaurant-600 hover:bg-restaurant-700 text-white py-2.5"
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut ? "提交中..." : "确认订单"}
                    </Button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Order;
