
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
}

const CartItem = ({
  id,
  name,
  price,
  quantity,
  image,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemProps) => {
  return (
    <div className="flex items-center py-4 border-b">
      <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      
      <div className="ml-4 flex-1">
        <h4 className="text-sm font-medium">{name}</h4>
        <div className="flex justify-between mt-1">
          <p className="text-sm text-gray-500">${price}</p>
          <p className="text-sm font-medium">${(price * quantity).toFixed(2)}</p>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => onDecrement(id)}
              className="px-2 py-1 text-gray-600 hover:text-gray-800"
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="px-3">{quantity}</span>
            <button
              onClick={() => onIncrement(id)}
              className="px-2 py-1 text-gray-600 hover:text-gray-800"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button
            onClick={() => onRemove(id)}
            className="text-gray-400 hover:text-restaurant-600 transition-colors"
            aria-label="Remove item"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
