import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OfferBanner = () => {
  return (
    <section className="py-4 bg-gradient-to-r from-purple-600 to-purple-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col md:flex-row items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Tag className="w-8 h-8" />
            <div>
              <p className="font-bold text-lg">
                Special Offer - Get 25% OFF
              </p>
              <p className="text-sm text-purple-100">
                On all SSC and Railway Books
              </p>
            </div>
          </div>

          <Link to="/products">
            <Button className="bg-white text-purple-600 hover:bg-purple-100">
              Shop Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default OfferBanner;