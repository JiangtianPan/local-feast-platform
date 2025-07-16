
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Clock, Calendar, ShoppingCart } from "lucide-react";

const Dashboard = () => {
  // Mock data for orders
  const orders = [
    {
      id: "ORD-2023-001",
      date: "2023-05-01",
      time: "18:30",
      items: ["Boiled Fish", "Sweet and Sour Pork", "Millet Porridge"],
      total: 128,
      status: "Completed"
    },
    {
      id: "ORD-2023-002",
      date: "2023-05-10",
      time: "19:45",
      items: ["Braised Lion's Head", "Century Egg Tofu", "Millet Porridge"],
      total: 78,
      status: "Completed"
    },
    {
      id: "ORD-2023-003",
      date: "2023-05-20",
      time: "12:15",
      items: ["Kung Pao Chicken", "Cucumber Salad", "Handmade Steamed Buns"],
      total: 63,
      status: "Out for delivery"
    }
  ];
  
  // Mock data for reservations
  const reservations = [
    {
      id: "RES-2023-001",
      date: "2023-06-05",
      time: "19:00",
      guests: 4,
      status: "Confirmed"
    },
    {
      id: "RES-2023-002",
      date: "2023-06-15",
      time: "18:30",
      guests: 2,
      status: "Pending"
    },
    {
      id: "RES-2023-003",
      date: "2023-06-30",
      time: "20:00",
      guests: 6,
      status: "Confirmed"
    }
  ];
  
  const [activeTab, setActiveTab] = useState("orders");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-restaurant-700 text-white py-16">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">My Account</h1>
            <p className="max-w-2xl mx-auto">
              View your order history and reservation information
            </p>
          </div>
        </section>

        {/* Dashboard Section */}
        <section className="py-12">
          <div className="container mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Tabs defaultValue="orders" className="w-full">
                <div className="border-b">
                  <div className="px-6">
                    <TabsList className="grid grid-cols-2">
                       <TabsTrigger value="orders" onClick={() => setActiveTab("orders")}>Order History</TabsTrigger>
                       <TabsTrigger value="reservations" onClick={() => setActiveTab("reservations")}>My Reservations</TabsTrigger>
                    </TabsList>
                  </div>
                </div>
                
                <TabsContent value="orders" className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold font-serif">Your Orders</h2>
                    <Link to="/order">
                      <Button className="bg-restaurant-600 hover:bg-restaurant-700 text-white">
                        Order Again
                      </Button>
                    </Link>
                  </div>
                  
                  {orders.length > 0 ? (
                    <div className="space-y-6">
                      {orders.map(order => (
                        <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                            <div>
                              <div className="flex items-center mb-2">
                                <ShoppingCart size={18} className="text-restaurant-600 mr-2" />
                                <h3 className="font-bold">{order.id}</h3>
                              </div>
                              <p className="text-gray-600 mb-2">
                                <span className="text-sm inline-flex items-center">
                                  <Calendar size={14} className="mr-1" />
                                  {order.date}
                                </span>
                                <span className="text-sm ml-4 inline-flex items-center">
                                  <Clock size={14} className="mr-1" />
                                  {order.time}
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                {order.items.join(", ")}
                              </p>
                            </div>
                            
                            <div className="flex justify-between items-center mt-3 md:mt-0">
                              <div className="mr-4">
                                <span className="block text-gray-500 text-sm">Total</span>
                                <span className="font-bold">¥{order.total}</span>
                              </div>
                              <div>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs ${
                                    order.status === "Completed"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500 mb-4">You don't have any orders yet</p>
                      <Link to="/order">
                        <Button className="bg-restaurant-600 hover:bg-restaurant-700 text-white">
                          Order Now
                        </Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="reservations" className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold font-serif">Your Reservations</h2>
                    <Link to="/reservations">
                      <Button className="bg-restaurant-600 hover:bg-restaurant-700 text-white">
                        New Reservation
                      </Button>
                    </Link>
                  </div>
                  
                  {reservations.length > 0 ? (
                    <div className="space-y-6">
                      {reservations.map(reservation => (
                        <div key={reservation.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                            <div>
                              <div className="flex items-center mb-2">
                                <Calendar size={18} className="text-restaurant-600 mr-2" />
                                <h3 className="font-bold">{reservation.id}</h3>
                              </div>
                              <p className="text-gray-600 mb-2">
                                <span className="text-sm inline-flex items-center">
                                  <Calendar size={14} className="mr-1" />
                                  {reservation.date}
                                </span>
                                <span className="text-sm ml-4 inline-flex items-center">
                                  <Clock size={14} className="mr-1" />
                                  {reservation.time}
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                {reservation.guests} guests
                              </p>
                            </div>
                            
                            <div className="flex items-center mt-3 md:mt-0">
                              <span
                                className={`px-3 py-1 rounded-full text-xs ${
                                  reservation.status === "Confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {reservation.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500 mb-4">You don't have any reservations yet</p>
                      <Link to="/reservations">
                        <Button className="bg-restaurant-600 hover:bg-restaurant-700 text-white">
                          Make Reservation
                        </Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
