
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                alt="餐厅内部" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-4 shadow-lg rounded-lg w-40 h-40 flex flex-col justify-center items-center text-center hidden md:flex">
              <span className="text-restaurant-600 text-4xl font-bold">20+</span>
              <span className="text-gray-600">年传承</span>
            </div>
          </div>
          
          {/* Text Side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">关于我们的故事</h2>
            <div className="w-20 h-1 bg-restaurant-500 mb-6"></div>
            <p className="text-gray-600 mb-4">
              地方风味餐厅创立于2003年，由烹饪大师陈师傅创办。作为本地最早的传统菜肴推广者，我们始终坚持使用最新鲜的本地食材，结合传统烹饪工艺，为顾客带来正宗的地方美食。
            </p>
            <p className="text-gray-600 mb-6">
              二十年来，我们不断创新菜品，提升用餐体验，赢得了众多食客的喜爱和认可。如今，我们依然坚持初心，为每一位顾客提供最地道的味道和最温馨的服务。
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/contact">
                <Button className="bg-restaurant-600 hover:bg-restaurant-700 text-white">
                  联系我们
                </Button>
              </Link>
              <Link to="/reservations">
                <Button variant="outline" className="border-restaurant-600 text-restaurant-600 hover:bg-restaurant-600 hover:text-white">
                  预订餐位
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
