import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Search, Shield, Truck } from "lucide-react";

import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import OfferBanner from "@/components/OfferBanner";
import PromoBannerCarousel from "@/components/PromoBannerCarousel";
import BookCategories from "@/components/BookCategories";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const featuredProducts = products.slice(0, 6);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#categories") {
      const element = document.getElementById("categories");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const whyChooseUs = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Latest Syllabus",
      description:
        "All books updated according to the latest exam patterns",
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Easy Search",
      description:
        "Find your exam books quickly with our intuitive search",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Payments",
      description: "100% secure payment gateway for safe transactions",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fast Shipping",
      description:
        "Quick delivery across India within 3–5 business days",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      rating: 5,
      text:
        "Excellent books for SSC preparation. The content is comprehensive and very useful.",
      image:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    {
      name: "Rahul Kumar",
      rating: 5,
      text:
        "Best quality books at affordable prices. Their Railway exam guides helped me a lot.",
      image:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    },
    {
      name: "Anjali Singh",
      rating: 4,
      text:
        "Great collection of CTET books. The practice questions are very helpful.",
      image:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
    },
    {
      name: "Vikram Patel",
      rating: 5,
      text:
        "Fast delivery and excellent customer service. Banking exam books are top-notch.",
      image:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          ASO Publication – Best Competitive Exam Books in India
        </title>
        <meta
          name="description"
          content="Shop competitive exam books for SSC, Railway, Banking, Defence, CTET and more."
        />
      </Helmet>

      {/* 1. Promotional Banner */}
      <PromoBannerCarousel />

      {/* 2. Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700"
              >
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Book Categories */}
      <BookCategories />

      {/* 4. Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            What Our Students Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Offer Banner */}
      <OfferBanner />

      {/* 6. Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-purple-50 hover:bg-purple-100 transition"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600 text-white mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                ASO Publication
              </h3>
              <p className="text-gray-400">
                Your trusted partner for competitive exam
                preparation books.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">
                Contact Us
              </h3>
              <p className="text-gray-400">
                <span className="font-semibold">Email:</span>{" "}
                info@asopublication.com
              </p>
              <p className="text-gray-400">
                <span className="font-semibold">Phone:</span>{" "}
                +91 9876543210
              </p>
              <p className="text-gray-400">
                <span className="font-semibold">Address:</span>{" "}
                123 Book Street, Delhi
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">
                Quick Links
              </h3>
              <div className="flex flex-col gap-2">
                <Link
                  to="/products"
                  className="text-gray-400 hover:text-white"
                >
                  Products
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-500">
            © 2026 ASO Publication. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;