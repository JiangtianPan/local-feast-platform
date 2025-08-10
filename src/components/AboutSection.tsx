
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import menu from "@/assets/menu/menu.jpeg"

const AboutSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src={menu} 
                alt="Restaurant Interior" 
                className="w-full h-auto"
              />
            </div>
            {/* <div className="absolute -bottom-6 -right-6 bg-white p-4 shadow-lg rounded-lg w-40 h-40 flex flex-col justify-center items-center text-center hidden md:flex">
              <span className="text-restaurant-600 text-4xl font-bold">20+</span>
              <span className="text-gray-600">Years of Tradition</span>
            </div> */}
          </div>
          
          {/* Text Side */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">Our Story</h2>
            <div className="w-20 h-1 bg-restaurant-500 mb-6"></div>
            <p className="text-gray-600 mb-4">
              Tea Bay Sweet was established in 2023. As one of the earliest bubble tea store in the area, we have always insisted on using the freshest local ingredients combined with classic bubble tea menu to bring authentic local delicacies to our customers.
            </p>
            <p className="text-gray-600 mb-6">
              For twenty years, we have continuously innovated our menu and enhanced the dining experience, winning the love and recognition of many diners. Today, we still hold true to our original aspiration, providing the most authentic flavors and the warmest service to every customer.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/contact">
                <Button className="bg-restaurant-600 hover:bg-restaurant-700 text-white">
                  Contact Us
                </Button>
              </Link>
              <Link to="/reservations">
                <Button variant="outline" className="border-restaurant-600 text-restaurant-600 hover:bg-restaurant-600 hover:text-white">
                  Reserve a Table
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
