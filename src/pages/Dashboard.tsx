
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
      items: ["水煮鱼", "锅包肉", "小米粥"],
      total: 128,
      status: "已完成"
    },
    {
      id: "ORD-2023-002",
      date: "2023-05-10",
      time: "19:45",
      items: ["红烧狮子头", "皮蛋豆腐", "小米粥"],
      total: 78,
      status: "已完成"
    },
    {
      id: "ORD-2023-003",
      date: "2023-05-20",
      time: "12:15",
      items: ["宫保鸡丁", "凉拌黄瓜", "手工馒头"],
      total: 63,
      status: "配送中"
    }
  ];
  
  // Mock data for reservations
  const reservations = [
    {
      id: "RES-2023-001",
      date: "2023-06-05",
      time: "19:00",
      guests: 4,
      status: "已确认"
    },
    {
      id: "RES-2023-002",
      date: "2023-06-15",
      time: "18:30",
      guests: 2,
      status: "待确认"
    },
    {
      id: "RES-2023-003",
      date: "2023-06-30",
      time: "20:00",
      guests: 6,
      status: "已确认"
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
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">我的账户</h1>
            <p className="max-w-2xl mx-auto">
              查看您的订单历史和预订信息
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
                      <TabsTrigger value="orders" onClick={() => setActiveTab("orders")}>订单历史</TabsTrigger>
                      <TabsTrigger value="reservations" onClick={() => setActiveTab("reservations")}>我的预订</TabsTrigger>
                    </TabsList>
                  </div>
                </div>
                
                <TabsContent value="orders" className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold font-serif">您的订单</h2>
                    <Link to="/order">
                      <Button className="bg-restaurant-600 hover:bg-restaurant-700 text-white">
                        再次下单
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
                                <span className="block text-gray-500 text-sm">总计</span>
                                <span className="font-bold">¥{order.total}</span>
                              </div>
                              <div>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs ${
                                    order.status === "已完成"
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
                      <p className="text-gray-500 mb-4">您还没有订单</p>
                      <Link to="/order">
                        <Button className="bg-restaurant-600 hover:bg-restaurant-700 text-white">
                          立即点餐
                        </Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="reservations" className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold font-serif">您的预订</h2>
                    <Link to="/reservations">
                      <Button className="bg-restaurant-600 hover:bg-restaurant-700 text-white">
                        新预订
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
                                {reservation.guests}位客人
                              </p>
                            </div>
                            
                            <div className="flex items-center mt-3 md:mt-0">
                              <span
                                className={`px-3 py-1 rounded-full text-xs ${
                                  reservation.status === "已确认"
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
                      <p className="text-gray-500 mb-4">您还没有预订</p>
                      <Link to="/reservations">
                        <Button className="bg-restaurant-600 hover:bg-restaurant-700 text-white">
                          立即预订
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
