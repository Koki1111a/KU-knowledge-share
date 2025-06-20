export interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  imageUrl: string;
  downloadUrl: string;
  category: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Purchase {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  purchaseDate: string;
  amount: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}