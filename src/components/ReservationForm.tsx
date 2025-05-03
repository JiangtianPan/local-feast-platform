
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: "2",
    note: ""
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
      toast.success("预订请求已提交！我们会尽快与您联系确认。");
      setFormData({
        name: "",
        phone: "",
        email: "",
        date: "",
        time: "",
        guests: "2",
        note: ""
      });
    }, 1500);
  };
  
  // Generate available time slots
  const timeSlots = [];
  for (let hour = 10; hour < 21; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMin = min.toString().padStart(2, "0");
      timeSlots.push(`${formattedHour}:${formattedMin}`);
    }
  }
  
  // Get tomorrow's date as default
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            电话
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
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
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-restaurant-500 focus:border-restaurant-500"
          />
        </div>
        
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
            人数
          </label>
          <select
            id="guests"
            name="guests"
            required
            value={formData.guests}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-restaurant-500 focus:border-restaurant-500"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? "位客人" : "位客人"}
              </option>
            ))}
            <option value="9">9人以上</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            日期
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            min={defaultDate}
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-restaurant-500 focus:border-restaurant-500"
          />
        </div>
        
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
            时间
          </label>
          <select
            id="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-restaurant-500 focus:border-restaurant-500"
          >
            <option value="" disabled>选择时间</option>
            {timeSlots.map(time => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
          特别要求
        </label>
        <textarea
          id="note"
          name="note"
          rows={3}
          value={formData.note}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-restaurant-500 focus:border-restaurant-500"
          placeholder="如有特别要求，请告诉我们..."
        ></textarea>
      </div>
      
      <Button
        type="submit"
        className="w-full bg-restaurant-600 hover:bg-restaurant-700 text-white py-2.5"
        disabled={loading}
      >
        {loading ? "提交中..." : "提交预约"}
      </Button>
      
      <p className="text-sm text-gray-500 text-center">
        提交后，我们会尽快与您联系确认预订。
      </p>
    </form>
  );
};

export default ReservationForm;
