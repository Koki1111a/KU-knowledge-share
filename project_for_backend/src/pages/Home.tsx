import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Download, Zap } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../data/products';

const Home: React.FC = () => {
  const featuredProducts = mockProducts.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Premium Digital
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Products
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Discover high-quality digital assets, courses, and tools to boost your creativity and productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors transform hover:scale-105 active:scale-95"
              >
                <span>Browse Products</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/register"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-900 transition-colors transform hover:scale-105 active:scale-95"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose DigitalGoods?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide the best digital products with unmatched quality and support.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Carefully curated products that meet the highest standards.</p>
            </div>

            <div className="text-center group">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Purchases</h3>
              <p className="text-gray-600">Your transactions are protected with industry-standard security.</p>
            </div>

            <div className="text-center group">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Download className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Download</h3>
              <p className="text-gray-600">Get your products immediately after successful purchase.</p>
            </div>

            <div className="text-center group">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Optimized platform for the best browsing experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Check out our most popular digital products loved by thousands of customers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/products"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center space-x-2 transition-colors transform hover:scale-105 active:scale-95"
            >
              <span>View All Products</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Join thousands of satisfied customers and discover amazing digital products today.
          </p>
          <Link
            to="/register"
            className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold inline-flex items-center space-x-2 hover:bg-gray-100 transition-colors transform hover:scale-105 active:scale-95"
          >
            <span>Create Your Account</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;