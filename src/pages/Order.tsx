
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, Truck } from "lucide-react";

const Order = () => {
  const uberEatsUrl = "https://www.ubereats.com/ca/store/tea-bay-sweet/MXc7UEZ0V8amdWRQkfdeCw?diningMode=DELIVERY&surfaceName=";

  const handleOrderNow = () => {
    window.open(uberEatsUrl, '_blank');
  };

  // Auto-redirect after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleOrderNow();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-restaurant-700 text-white py-16">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">在线订餐</h1>
            <p className="max-w-2xl mx-auto">
              通过 Uber Eats 轻松订购美食，快速配送到您门前
            </p>
          </div>
        </section>

        {/* Order Section */}
        <section className="py-16">
          <div className="container mx-auto text-center">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Truck className="w-16 h-16 text-restaurant-600 mx-auto mb-6" />
                <h2 className="text-2xl font-bold font-serif mb-4">即将跳转到 Uber Eats</h2>
                <p className="text-gray-600 mb-6">
                  页面将在 3 秒后自动跳转到我们的 Uber Eats 订餐页面。您也可以点击下方按钮立即跳转。
                </p>
                
                <Button
                  onClick={handleOrderNow}
                  className="bg-restaurant-600 hover:bg-restaurant-700 text-white px-8 py-3 text-lg"
                >
                  <ExternalLink className="mr-2" size={20} />
                  立即在 Uber Eats 订餐
                </Button>

                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">为什么选择 Uber Eats？</h3>
                  <ul className="text-left space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-restaurant-600 rounded-full mr-3"></div>
                      快速配送，通常 30-45 分钟内送达
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-restaurant-600 rounded-full mr-3"></div>
                      实时订单跟踪，随时了解配送状态
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-restaurant-600 rounded-full mr-3"></div>
                      多种支付方式，安全便捷
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-restaurant-600 rounded-full mr-3"></div>
                      专业配送团队，确保食品新鲜
                    </li>
                  </ul>
                </div>

                <p className="text-sm text-gray-500 mt-6">
                  如果页面没有自动跳转，请点击上方按钮或直接访问我们的 Uber Eats 页面
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Order;
