
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
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">Online Ordering</h1>
            <p className="max-w-2xl mx-auto">
              Easily order delicious food through Uber Eats, delivered quickly to your door
            </p>
          </div>
        </section>

        {/* Order Section */}
        <section className="py-16">
          <div className="container mx-auto text-center">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Truck className="w-16 h-16 text-restaurant-600 mx-auto mb-6" />
                <h2 className="text-2xl font-bold font-serif mb-4">Redirecting to Uber Eats</h2>
                <p className="text-gray-600 mb-6">
                  The page will automatically redirect to our Uber Eats ordering page in 3 seconds. You can also click the button below to jump immediately.
                </p>
                
                <Button
                  onClick={handleOrderNow}
                  className="bg-restaurant-600 hover:bg-restaurant-700 text-white px-8 py-3 text-lg"
                >
                  <ExternalLink className="mr-2" size={20} />
                  Order Now on Uber Eats
                </Button>

                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Why Choose Uber Eats?</h3>
                  <ul className="text-left space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-restaurant-600 rounded-full mr-3"></div>
                      Fast delivery, usually arrives within 30-45 minutes
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-restaurant-600 rounded-full mr-3"></div>
                      Real-time order tracking to know delivery status
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-restaurant-600 rounded-full mr-3"></div>
                      Multiple payment methods, safe and convenient
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-restaurant-600 rounded-full mr-3"></div>
                      Professional delivery team ensuring fresh food
                    </li>
                  </ul>
                </div>

                <p className="text-sm text-gray-500 mt-6">
                  If the page doesn't redirect automatically, please click the button above or visit our Uber Eats page directly
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
