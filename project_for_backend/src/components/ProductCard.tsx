import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Download } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { mockPurchases } from '../data/purchases';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const isPurchased = user && mockPurchases.some(
    purchase => purchase.userId === user.id && purchase.productId === product.id
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
        <div className="relative overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-purple-600 text-white px-2 py-1 rounded-md text-xs font-medium">
              {product.category}
            </span>
          </div>
          {isPurchased && (
            <div className="absolute top-4 right-4">
              <span className="bg-green-600 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
                <Download className="h-3 w-3 mr-1" />
                Owned
              </span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {product.shortDescription}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-purple-600">
              ${product.price.toFixed(2)}
            </span>
            
            {!isPurchased && (
              <button
                onClick={handleAddToCart}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors transform hover:scale-105 active:scale-95"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;