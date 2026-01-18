import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const location = useLocation();
  const cartCount = getCartCount();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'All Books' },
    { path: '#categories', label: 'Categories' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => {
    if (path === '#categories') return false;
    return location.pathname === path;
  };

  const handleNavClick = (path) => {
    setIsMenuOpen(false);
    if (path === '#categories') {
      if (location.pathname === '/') {
        const element = document.getElementById('categories');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-3 py-1 rounded-lg font-bold">
              ASO
            </div>
            <span className="font-semibold text-gray-800 hidden sm:block">
              Publication
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.path === '#categories' ? (
                <a
                  key={link.path}
                  href="#categories"
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      document
                        .getElementById('categories')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="font-medium text-gray-600 hover:text-purple-600 transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-purple-600'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart
                className={
                  isActive('/cart') ? 'text-purple-600' : 'text-gray-600'
                }
              />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-4">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart
                className={
                  isActive('/cart') ? 'text-purple-600' : 'text-gray-600'
                }
              />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              {navLinks.map((link) =>
                link.path === '#categories' ? (
                  <a
                    key={link.path}
                    href="#categories"
                    onClick={(e) => {
                      setIsMenuOpen(false);
                      if (location.pathname === '/') {
                        e.preventDefault();
                        document
                          .getElementById('categories')
                          ?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="block py-2 px-4 rounded-lg mb-2 font-medium text-gray-700 hover:bg-purple-50"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`block py-2 px-4 rounded-lg mb-2 font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-purple-50 text-purple-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;