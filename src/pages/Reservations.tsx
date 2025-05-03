
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReservationForm from "@/components/ReservationForm";

const Reservations = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-restaurant-700 text-white py-16">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">预订餐位</h1>
            <p className="max-w-2xl mx-auto">
              提前预订餐位，享受无需等待的优质用餐体验。
            </p>
          </div>
        </section>

        {/* Reservation Section */}
        <section className="py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form Side */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold font-serif mb-6">在线预订</h2>
                <ReservationForm />
              </div>
              
              {/* Info Side */}
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-bold font-serif mb-4">预订须知</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-restaurant-100 rounded-full p-2 mr-4 mt-1">
                      <svg className="w-4 h-4 text-restaurant-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </div>
                    <p className="text-gray-700">
                      提前预订：建议您提前至少1天进行预订，周末和节假日至少提前3天。
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-restaurant-100 rounded-full p-2 mr-4 mt-1">
                      <svg className="w-4 h-4 text-restaurant-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </div>
                    <p className="text-gray-700">
                      确认预订：我们会在收到您的预订后通过电话确认详情。
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-restaurant-100 rounded-full p-2 mr-4 mt-1">
                      <svg className="w-4 h-4 text-restaurant-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </div>
                    <p className="text-gray-700">
                      准时到达：请按预订时间准时到达，超过预订时间15分钟未到，我们可能会将您的座位让给其他顾客。
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-restaurant-100 rounded-full p-2 mr-4 mt-1">
                      <svg className="w-4 h-4 text-restaurant-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </div>
                    <p className="text-gray-700">
                      取消预订：如需取消预订，请至少提前2小时通知我们。
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-restaurant-100 rounded-full p-2 mr-4 mt-1">
                      <svg className="w-4 h-4 text-restaurant-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </div>
                    <p className="text-gray-700">
                      特殊要求：如有任何特殊要求（如庆祝活动、过敏等），请在预订时告知我们。
                    </p>
                  </li>
                </ul>
                
                <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="text-lg font-bold mb-2">营业时间</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>周一至周五:</div>
                    <div>10:00 - 22:00</div>
                    <div>周六:</div>
                    <div>11:00 - 23:00</div>
                    <div>周日:</div>
                    <div>11:00 - 22:00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Reservations;
