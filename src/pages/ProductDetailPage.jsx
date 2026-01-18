import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  ArrowLeft,
} from "lucide-react";

import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find(
    (p) => p.id === parseInt(id)
  );

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Product not found
          </h2>
          <Link to="/products">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <ArrowLeft className="mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(
      (p) =>
        p.category === product.category &&
        p.id !== product.id
    )
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${product.title} (${quantity}x) added to your cart.`,
    });
  };

  const incrementQuantity = () =>
    setQuantity((prev) => prev + 1);

  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <>
      <Helmet>
        <title>{product.title} – ASO Publication</title>
        <meta
          name="description"
          content={product.description}
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/products">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2" />
              Back to Products
            </Button>
          </Link>

          {/* Product Details */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Product Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[500px] object-cover rounded-lg"
                />
                <span className="absolute top-4 right-4 bg-purple-600 text-white px-4 py-1 rounded-full text-sm">
                  {product.category}
                </span>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col justify-between"
              >
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    {product.title}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="text-3xl font-bold text-purple-600 mb-6">
                    ₹{product.price}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features */}
                  {product.features && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-800 mb-3">
                        Key Features
                      </h3>
                      <ul className="space-y-2">
                        {product.features.map(
                          (feature, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 text-gray-600"
                            >
                              <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                              {feature}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Quantity */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-semibold text-gray-800">
                      Quantity:
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={decrementQuantity}
                        className="w-10 h-10"
                      >
                        <Minus />
                      </Button>
                      <span className="w-12 text-center font-semibold">
                        {quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={incrementQuantity}
                        className="w-10 h-10"
                      >
                        <Plus />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Add to Cart */}
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-lg"
                >
                  <ShoppingCart className="mr-2" />
                  Add to Cart
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Related Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((related) => (
                  <ProductCard
                    key={related.id}
                    product={related}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;