
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const FeaturedDishes = () => {
  // Mock data for featured dishes
  const featuredDishes: Dish[] = [
    {
      id: 1,
      name: "水煮鱼",
      description: "新鲜鱼肉，辣椒油浇制，香辣可口",
      price: 68,
      image: "https://images.unsplash.com/photo-1623689046286-01d812215f98?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "主菜"
    },
    {
      id: 2,
      name: "红烧狮子头",
      description: "精选猪肉，手工制作肉丸，红烧工艺",
      price: 48,
      image: "https://images.unsplash.com/photo-1541833000669-8dce2f9b5849?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "主菜"
    },
    {
      id: 3,
      name: "锅包肉",
      description: "酸甜可口，外酥里嫩",
      price: 52,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "主菜"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif">招牌菜品</h2>
          <div className="w-24 h-1 bg-restaurant-500 mx-auto mt-4 mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            这些是我们最受欢迎的特色菜品，每一道都凝聚了我们厨师的心血和创意。
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
                  <span className="text-restaurant-600 font-bold">¥{dish.price}</span>
                </div>
                <p className="text-gray-600 mb-4">{dish.description}</p>
                <div className="flex justify-between items-center">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {dish.category}
                  </span>
                  <Link to={`/order`}>
                    <Button className="bg-restaurant-600 hover:bg-restaurant-700 text-white">
                      添加到购物车
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
              查看完整菜单
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;
