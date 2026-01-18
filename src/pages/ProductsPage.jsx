import React, { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { X } from "lucide-react";

import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromUrl || "All"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  /* Sync category with URL */
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory("All");
    }
  }, [categoryFromUrl]);

  /* Update URL when category changes */
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    if (category === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSortBy("default");
    setSearchParams({});
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    /* Filter by category */
    if (selectedCategory !== "All") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    /* Filter by search */
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    /* Sorting */
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result.reverse();
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <>
      <Helmet>
        <title>Products – ASO Publication</title>
        <meta
          name="description"
          content="Browse our complete collection of competitive exam books."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {selectedCategory === "All"
                ? "All Products"
                : `Category: ${selectedCategory}`}
            </h1>

            {selectedCategory !== "All" && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="text-red-500"
              >
                <X className="w-4 h-4 mr-2" />
                Clear Filter
              </Button>
            )}
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <div className="w-full md:w-64">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
              >
                <option value="default">Default Sorting</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <CategoryFilter
                selectedCategory={selectedCategory}
                setSelectedCategory={handleCategoryChange}
              />
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredAndSortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-xl text-gray-600 mb-4">
                    No products found matching your criteria.
                  </p>
                  <Button
                    variant="link"
                    onClick={clearFilters}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;