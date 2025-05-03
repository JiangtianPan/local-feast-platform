
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[calc(80vh-4rem)] bg-gray-900 text-white flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Taste Tradition <br/>
            <span className="text-restaurant-400">Experience Local Flavors</span>
          </h1>
          <p className="text-xl mb-8">
            We carefully prepare every dish, perfectly blending local traditions with modern innovation to bring you a unique dining experience.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/menu">
              <Button className="bg-restaurant-600 hover:bg-restaurant-700 text-white px-8 py-6 text-lg rounded-md">
                View Menu
              </Button>
            </Link>
            <Link to="/reservations">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg rounded-md">
                Reserve a Table
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
