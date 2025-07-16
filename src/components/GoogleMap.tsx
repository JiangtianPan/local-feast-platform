// import { useEffect, useRef, useState } from "react";
// import { Loader } from "@googlemaps/js-api-loader";
// import { MapPin, AlertCircle } from "lucide-react";
// import { Button } from "./ui/button";

// interface GoogleMapProps {
//   apiKey?: string;
//   center?: { lat: number; lng: number };
//   zoom?: number;
//   markerTitle?: string;
//   className?: string;
// }

// const GoogleMap = ({ 
//   apiKey, 
//   center = { lat: 39.9042, lng: 116.4074 }, // 北京坐标作为默认值
//   zoom = 15,
//   markerTitle = "地方风味餐厅",
//   className = "w-full h-96"
// }: GoogleMapProps) => {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const [map, setMap] = useState<google.maps.Map | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [inputApiKey, setInputApiKey] = useState("");
//   const [showApiInput, setShowApiInput] = useState(!apiKey);

//   const loadMap = async (key: string) => {
//     if (!mapRef.current) return;

//     try {
//       setLoading(true);
//       setError(null);

//       const loader = new Loader({
//         apiKey: key,
//         version: "weekly",
//         libraries: ["places"]
//       });

//       const google = await loader.load();
      
//       const mapInstance = new google.maps.Map(mapRef.current, {
//         center,
//         zoom,
//         styles: [
//           {
//             featureType: "poi",
//             stylers: [{ visibility: "simplified" }]
//           }
//         ]
//       });

//       // 添加标记
//       new google.maps.Marker({
//         position: center,
//         map: mapInstance,
//         title: markerTitle,
//         animation: google.maps.Animation.DROP
//       });

//       setMap(mapInstance);
//       setLoading(false);
//     } catch (err) {
//       console.error("Google Maps loading error:", err);
//       setError("地图加载失败，请检查API密钥是否正确");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (apiKey) {
//       loadMap(apiKey);
//     }
//   }, [apiKey]);

//   const handleApiKeySubmit = () => {
//     if (inputApiKey.trim()) {
//       setShowApiInput(false);
//       loadMap(inputApiKey.trim());
//     }
//   };

//   if (showApiInput) {
//     return (
//       <div className={`${className} bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center`}>
//         <div className="text-center p-8 max-w-md">
//           <MapPin size={48} className="mx-auto mb-4 text-primary" />
//           <h3 className="text-lg font-semibold mb-2">需要Google Maps API密钥</h3>
//           <p className="text-gray-600 mb-4 text-sm">
//             请输入您的Google Maps API密钥来显示地图
//           </p>
//           <div className="flex flex-col gap-3">
//             <input
//               type="text"
//               placeholder="输入Google Maps API密钥"
//               value={inputApiKey}
//               onChange={(e) => setInputApiKey(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-md text-sm"
//             />
//             <Button onClick={handleApiKeySubmit} size="sm">
//               加载地图
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className={`${className} bg-gray-100 rounded-lg flex items-center justify-center`}>
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
//           <p className="text-gray-600">地图加载中...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={`${className} bg-red-50 rounded-lg border border-red-200 flex items-center justify-center`}>
//         <div className="text-center p-4">
//           <AlertCircle size={48} className="mx-auto mb-2 text-red-500" />
//           <p className="text-red-600 mb-3">{error}</p>
//           <Button 
//             onClick={() => setShowApiInput(true)} 
//             variant="outline"
//             size="sm"
//           >
//             重新输入API密钥
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`${className} rounded-lg overflow-hidden shadow-lg`}>
//       <div ref={mapRef} className="w-full h-full" />
//     </div>
//   );
// };

// export default GoogleMap;