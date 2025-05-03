
import { useState, useEffect } from "react";
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
      name: "Yogurt Fruit Salad",
      description: "Fresh fruits with yogurt, healthy and delicious",
      price: 28,
      image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Desserts"
    }
  ];

  const categories = ["All", ...Array.from(new Set(allDishes.map(dish => dish.category)))];
  
  const [activeCategory, setActiveCategory] = useState("All");
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
    
    toast.success(`Added ${dish.name} to cart`);
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
      toast.success("Order submitted! We'll prepare and deliver it soon.");
    }, 1500);
  };

  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
  };

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
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">Menu & Order</h1>
            <p className="max-w-2xl mx-auto">
              Explore our carefully prepared dishes, from traditional favorites to innovative creations, there's something for every taste.
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
              
              <div className="flex items-center gap-4">
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
                
                <Button 
                  variant="outline"
                  className="relative flex items-center border-restaurant-600 text-restaurant-600 hover:bg-restaurant-600 hover:text-white"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart className="mr-2" size={18} />
                  <span>Cart</span>
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
                <p className="text-gray-500 text-lg">No dishes found matching your criteria</p>
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
              <h2 className="text-xl font-bold">Your Cart</h2>
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
                <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                <Button 
                  onClick={() => setIsCartOpen(false)}
                  className="bg-restaurant-600 hover:bg-restaurant-700 text-white"
                >
                  Continue Ordering
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
                    <span>Subtotal</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>Delivery Fee</span>
                    <span>$5.00</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between py-2 text-lg font-bold">
                    <span>Total</span>
                    <span>${(calculateTotal() + 5).toFixed(2)}</span>
                  </div>
                  
                  <form onSubmit={handleCheckout} className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
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
                        Phone
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
                        Delivery Address
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
                        Notes
                      </label>
                      <textarea
                        id="note"
                        name="note"
                        rows={2}
                        value={contactInfo.note}
                        onChange={handleContactInfoChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-restaurant-500 focus:border-restaurant-500"
                        placeholder="If you have any special requests, please let us know..."
                      ></textarea>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-restaurant-600 hover:bg-restaurant-700 text-white py-2.5"
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut ? "Processing..." : "Confirm Order"}
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

export default Menu;
