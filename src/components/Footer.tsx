
import { Link } from "react-router-dom";
import { Phone, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Restaurant Info */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">地方风味</h3>
            <p className="mb-4 text-gray-300">
              我们提供地道的本地风味菜肴，始终坚持使用新鲜的食材和传统的烹饪方法。
            </p>
            <div className="flex flex-col space-y-2 text-gray-300">
              <div className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span>+123 456 789</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>城市中心大街123号</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>周一至周日: 10:00 - 22:00</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-restaurant-400 transition-colors">主页</Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-300 hover:text-restaurant-400 transition-colors">菜单</Link>
              </li>
              <li>
                <Link to="/order" className="text-gray-300 hover:text-restaurant-400 transition-colors">在线点单</Link>
              </li>
              <li>
                <Link to="/reservations" className="text-gray-300 hover:text-restaurant-400 transition-colors">预订</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-restaurant-400 transition-colors">联系我们</Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">营业时间</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex justify-between">
                <span>周一至周五:</span>
                <span>10:00 - 22:00</span>
              </li>
              <li className="flex justify-between">
                <span>周六:</span>
                <span>11:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span>周日:</span>
                <span>11:00 - 22:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} 地方风味餐厅. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
