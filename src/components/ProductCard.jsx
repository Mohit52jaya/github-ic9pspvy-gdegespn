import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast({
      title: 'Added to cart',
      description: `${product.title} has been added to your cart.`,
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${product.id}`}>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
          <div className="relative">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-cover"
            />
            <span className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs">
              {product.category}
            </span>
          </div>

          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
              {product.title}
            </h3>

            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviews})
              </span>
            </div>

            <div className="text-2xl font-bold text-purple-600 mb-4">
              ₹{product.price}
            </div>

            <div className="mt-auto">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;