import { useState, useRef } from "react";
import { MapPin, ZoomIn, ZoomOut, RotateCcw, Upload, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import mapImage from "@/assets/map.png";

interface StaticMapWithUploadProps {
  title?: string;
  address?: string;
  className?: string;
}

const StaticMapWithUpload = ({ 
  title = "地方风味餐厅",
  address = "城市中心大街123号",
  className = "w-full h-96"
}: StaticMapWithUploadProps) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [currentMapImage, setCurrentMapImage] = useState(mapImage);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      toast.error("请上传图片文件");
      return;
    }

    // 验证文件大小 (最大 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("图片文件大小不能超过 5MB");
      return;
    }

    setIsUploading(true);

    try {
      // 生成唯一文件名
      const fileExt = file.name.split('.').pop();
      const fileName = `restaurant-map-${Date.now()}.${fileExt}`;

      // 上传到 Supabase Storage
      const { data, error } = await supabase.storage
        .from('restaurant-maps')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      // 获取公共URL
      const { data: urlData } = supabase.storage
        .from('restaurant-maps')
        .getPublicUrl(data.path);

      // 更新地图图片
      setCurrentMapImage(urlData.publicUrl);
      
      // 重置缩放和位置
      setZoom(1);
      setPosition({ x: 0, y: 0 });

      toast.success("地图图片上传成功！");
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("图片上传失败，请重试");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`${className} relative rounded-lg overflow-hidden shadow-lg bg-gray-100`}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Map Image Container */}
      <div 
        className="w-full h-full overflow-hidden cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={currentMapImage}
          alt="餐厅位置地图"
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
          onClick={triggerFileUpload}
          size="sm"
          variant="secondary"
          className="w-10 h-10 p-0 bg-white/90 hover:bg-white border shadow-md"
          disabled={isUploading}
          title="上传地图图片"
        >
          {isUploading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Upload size={16} />
          )}
        </Button>
        <Button
          onClick={handleZoomIn}
          size="sm"
          variant="secondary"
          className="w-10 h-10 p-0 bg-white/90 hover:bg-white border shadow-md"
          disabled={zoom >= 3}
          title="放大"
        >
          <ZoomIn size={16} />
        </Button>
        <Button
          onClick={handleZoomOut}
          size="sm"
          variant="secondary"
          className="w-10 h-10 p-0 bg-white/90 hover:bg-white border shadow-md"
          disabled={zoom <= 1}
          title="缩小"
        >
          <ZoomOut size={16} />
        </Button>
        <Button
          onClick={handleReset}
          size="sm"
          variant="secondary"
          className="w-10 h-10 p-0 bg-white/90 hover:bg-white border shadow-md"
          title="重置视图"
        >
          <RotateCcw size={16} />
        </Button>
      </div>

      {/* Location Info Overlay */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-md max-w-xs">
        <div className="flex items-start">
          <div className="bg-red-100 rounded-full p-2 mr-3 flex-shrink-0">
            <MapPin className="text-red-600" size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm mb-1">{title}</h3>
            <p className="text-gray-600 text-xs">{address}</p>
          </div>
        </div>
      </div>

      {/* Zoom Level Indicator */}
      {zoom > 1 && (
        <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
          {Math.round(zoom * 100)}%
        </div>
      )}

      {/* Upload Instructions Overlay */}
      <div className="absolute bottom-4 right-4 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-xs shadow-md">
        点击 📤 上传您的地图图片
      </div>
    </div>
  );
};

export default StaticMapWithUpload;