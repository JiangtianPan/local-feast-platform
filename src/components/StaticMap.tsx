import { useState } from "react";
import { MapPin, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import mapImage from "@/assets/map.png";
// 要使用你自己的地图图片，请将上面这行改为：
// import mapImage from "@/assets/你的地图文件名.jpg";

interface StaticMapProps {
  title?: string;
  address?: string;
  className?: string;
}

const StaticMap = ({ 
  title = "Tea Bay Sweet",
  address = "820 Red River Road unit 1b",
  className = "w-full h-96"
}: StaticMapProps) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.5, 1));
  };

  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className={`${className} relative rounded-lg overflow-hidden shadow-lg bg-muted`}>
      {/* Map Image Container */}
      <div 
        className="w-full h-full overflow-hidden cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={mapImage}
          alt="Map"
          className="w-full h-full object-cover transition-transform duration-200"
          style={{
            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
            transformOrigin: 'center center'
          }}
          draggable={false}
        />
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          onClick={handleZoomIn}
          size="sm"
          variant="secondary"
          className="w-10 h-10 p-0"
          disabled={zoom >= 3}
        >
          <ZoomIn size={16} />
        </Button>
        <Button
          onClick={handleZoomOut}
          size="sm"
          variant="secondary"
          className="w-10 h-10 p-0"
          disabled={zoom <= 1}
        >
          <ZoomOut size={16} />
        </Button>
        <Button
          onClick={handleReset}
          size="sm"
          variant="secondary"
          className="w-10 h-10 p-0"
        >
          <RotateCcw size={16} />
        </Button>
      </div>

      {/* Location Info Overlay */}
      <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-4 shadow-md max-w-xs border">
        <div className="flex items-start">
          <div className="bg-primary/10 rounded-full p-2 mr-3 flex-shrink-0">
            <MapPin className="text-primary" size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm mb-1 text-card-foreground">{title}</h3>
            <p className="text-muted-foreground text-xs">{address}</p>
          </div>
        </div>
      </div>

      {/* Zoom Level Indicator */}
      {zoom > 1 && (
        <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
          {Math.round(zoom * 100)}%
        </div>
      )}
    </div>
  );
};

export default StaticMap;