import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { toast } = useToast();

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
    toast({
      title: 'Item removed',
      description: `${item.title} has been removed from your cart.`,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border-b last:border-b-0">
      <Link to={`/product/${item.id}`} className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-24 h-32 object-cover rounded-lg"
        />
      </Link>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Link to={`/product/${item.id}`}>
            <h3 className="font-semibold text-gray-800 hover:text-purple-600">
              {item.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 mt-1">{item.category}</p>
          <p className="text-lg font-bold text-purple-600 mt-2">
            ₹{item.price}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecrement}
              className="w-8 h-8 p-0"
            >
              <Minus className="w-4 h-4" />
            </Button>

            <span className="w-12 text-center font-semibold text-gray-800">
              {item.quantity}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={handleIncrement}
              className="w-8 h-8 p-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <p className="font-bold text-gray-800">
              ₹{(item.price * item.quantity).toFixed(2)}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;