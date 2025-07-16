
import { Link } from "react-router-dom";
import { Phone, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Restaurant Info */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">Tea Bay Sweet</h3>
            <p className="mb-4 text-gray-300">
              We offer delicious bubble teas, always using fresh ingredients and classical methods.
            </p>
            <div className="flex flex-col space-y-2 text-gray-300">
              <div className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span>+123 456 789</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>820 Red River Road, unit 1b, Thunder Bay, ON, P7B 1K2</span>
              </div>
              {/* <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>Summer Time: Mon-Sat 11:00 - 21:00, Sun 11:00 - 17:00</span>
                <span>Winter Time: Mon-Sat: 11:00 - 20:00, Sun 11:00 - 17:00</span>
              </div> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-restaurant-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-300 hover:text-restaurant-400 transition-colors">Menu & Order</Link>
              </li>
              <li>
                <Link to="/reservations" className="text-gray-300 hover:text-restaurant-400 transition-colors">Reservations</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-restaurant-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Opening Hours</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex justify-between">
              <span>[Summer Time]</span>
              </li>
              <li className="flex justify-between">
                <span>Monday - Saturday:</span>
                <span>11:00 - 21:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>11:00 - 17:00</span>
              </li>
              <li className="flex justify-between">
                <span>[Winter Time]</span>
              </li>
              <li className="flex justify-between">
                <span>Monday - Saturday:</span>
                <span></span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>11:00 - 17:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Tea Bay Sweet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
