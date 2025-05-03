
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("消息已发送！我们会尽快回复您。");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-restaurant-700 text-white py-16">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">联系我们</h1>
            <p className="max-w-2xl mx-auto">
              有任何问题或建议？请随时联系我们，我们期待听到您的声音。
            </p>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12">
          <div className="container mx-auto">
            <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
              {/* This would be replaced with an actual map integration */}
              <div className="w-full h-full flex items-center justify-center bg-gray-300">
                <div className="text-center">
                  <MapPin size={48} className="mx-auto mb-2 text-restaurant-600" />
                  <p className="text-gray-600">地图加载中...</p>
                  <p className="text-gray-500 text-sm">(此处将集成地图)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info and Form */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold font-serif mb-6">联系信息</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-restaurant-100 rounded-full p-3 mr-4">
                      <MapPin className="text-restaurant-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">地址</h3>
                      <p className="text-gray-600">城市中心大街123号</p>
                      <p className="text-gray-600">邮编：100000</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-restaurant-100 rounded-full p-3 mr-4">
                      <Phone className="text-restaurant-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">电话</h3>
                      <p className="text-gray-600">+123 456 789</p>
                      <p className="text-gray-600">+123 456 780</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-restaurant-100 rounded-full p-3 mr-4">
                      <Mail className="text-restaurant-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">电子邮箱</h3>
                      <p className="text-gray-600">info@difangfengwei.com</p>
                      <p className="text-gray-600">service@difangfengwei.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-restaurant-100 rounded-full p-3 mr-4">
                      <Clock className="text-restaurant-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">营业时间</h3>
                      <p className="text-gray-600">周一至周五: 10:00 - 22:00</p>
                      <p className="text-gray-600">周六: 11:00 - 23:00</p>
                      <p className="text-gray-600">周日: 11:00 - 22:00</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold font-serif mb-6">发送消息</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      姓名
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-restaurant-500 focus:border-restaurant-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      电子邮箱
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-restaurant-500 focus:border-restaurant-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      主题
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-restaurant-500 focus:border-restaurant-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      消息
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-restaurant-500 focus:border-restaurant-500"
                    ></textarea>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-restaurant-600 hover:bg-restaurant-700 text-white py-2.5"
                    disabled={loading}
                  >
                    {loading ? "发送中..." : "发送消息"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
