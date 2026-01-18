import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Train,
  Landmark,
  ShieldAlert,
  GraduationCap,
  Building2,
  Flag,
  TrendingUp,
  Sparkles,
  BookCopy,
  PenTool,
} from 'lucide-react';

const categories = [
  {
    id: 1,
    title: 'SSC Exams',
    icon: <BookOpen className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-700',
  },
  {
    id: 2,
    title: 'Railway Exams',
    icon: <Train className="w-8 h-8" />,
    color: 'from-orange-500 to-orange-700',
  },
  {
    id: 3,
    title: 'Banking Exams',
    icon: <Landmark className="w-8 h-8" />,
    color: 'from-green-500 to-green-700',
  },
  {
    id: 4,
    title: 'Defence Exams',
    icon: <ShieldAlert className="w-8 h-8" />,
    color: 'from-red-500 to-red-700',
  },
  {
    id: 5,
    title: 'Teaching Exams',
    icon: <GraduationCap className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-700',
  },
  {
    id: 6,
    title: 'State Government Exams',
    icon: <Building2 className="w-8 h-8" />,
    color: 'from-indigo-500 to-indigo-700',
  },
  {
    id: 7,
    title: 'Central Government Exams',
    icon: <Flag className="w-8 h-8" />,
    color: 'from-cyan-500 to-cyan-700',
  },
  {
    id: 8,
    title: 'Best Seller Books',
    icon: <TrendingUp className="w-8 h-8" />,
    color: 'from-yellow-500 to-yellow-700',
  },
  {
    id: 9,
    title: 'New Arrival Books',
    icon: <Sparkles className="w-8 h-8" />,
    color: 'from-pink-500 to-pink-700',
  },
  {
    id: 10,
    title: 'Latest Edition Books',
    icon: <BookCopy className="w-8 h-8" />,
    color: 'from-teal-500 to-teal-700',
  },
  {
    id: 11,
    title: 'Practice Sets',
    icon: <PenTool className="w-8 h-8" />,
    color: 'from-violet-500 to-violet-700',
  },
];

const BookCategories = () => {
  return (
    <section id="categories" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Explore Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect study material for your specific exam needs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <Link
              to={`/products?category=${encodeURIComponent(category.title)}`}
              key={category.id}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative h-full overflow-hidden bg-white rounded-2xl shadow group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                />

                <div className="p-6 rounded-full bg-gradient-to-br ${category.color}">
                  {category.icon}
                </div>

                <h3 className="mt-4 font-bold text-gray-800 group-hover:text-purple-700 transition-colors">
                  {category.title}
                </h3>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookCategories;