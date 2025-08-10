
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StaticMap from "@/components/StaticMap";
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
      toast.success("Message sent! We will reply to you as soon as possible.");
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
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">Contact Us</h1>
            <p className="max-w-2xl mx-auto">
              Any Question？We are expected to hear from you.
            </p>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold font-serif mb-6 text-center">Location in Map</h2>
            <StaticMap 
              title="Tea Bay Sweet"
              address="820 Red River Road unit 1b"
              className="w-full h-96"
            />
          </div>
        </section>

        {/* Contact Info and Form */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold font-serif mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-restaurant-100 rounded-full p-3 mr-4">
                      <MapPin className="text-restaurant-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Address</h3>
                      <p className="text-gray-600">820 Red River Road unit 1b</p>
                      <p className="text-gray-600">P7B 1K2</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-restaurant-100 rounded-full p-3 mr-4">
                      <Phone className="text-restaurant-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Call</h3>
                      <p className="text-gray-600">+1(807) 707 5655</p>
                      {/* <p className="text-gray-600">+123 456 780</p> */}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-restaurant-100 rounded-full p-3 mr-4">
                      <Mail className="text-restaurant-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <p className="text-gray-600">teabaysweeto@gmail.com</p>
                      {/* <p className="text-gray-600">service@difangfengwei.com</p> */}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-restaurant-100 rounded-full p-3 mr-4">
                      <Clock className="text-restaurant-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Opening Hours</h3>
                      <p className="text-gray-600">Summer Time</p>
                      <p className="text-gray-600">Monday - Saturday: 11:00 - 21:00</p>
                      <p className="text-gray-600">Sunday: 11:00 - 17:00</p>
                      <p className="text-gray-600">Winter Time</p>
                      <p className="text-gray-600">Monday - Saturday: 12:00 - 20:00</p>
                      <p className="text-gray-600">Sunday: 12:00 - 17:00</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold font-serif mb-6">Send Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-input rounded-md focus:ring-ring focus:border-ring bg-background text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-input rounded-md focus:ring-ring focus:border-ring bg-background text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Topic
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-input rounded-md focus:ring-ring focus:border-ring bg-background text-foreground"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-input rounded-md focus:ring-ring focus:border-ring bg-background text-foreground"
                    ></textarea>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-restaurant-600 hover:bg-restaurant-700 text-white py-2.5"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
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
