import { Purchase } from '../types';

export const mockPurchases: Purchase[] = [
  {
    id: '1',
    userId: '2',
    productId: '1',
    product: {
      id: '1',
      name: 'Premium UI Kit',
      description: 'A comprehensive UI kit with over 200 components',
      shortDescription: 'Complete UI kit with 200+ components',
      price: 49.99,
      imageUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      downloadUrl: '/downloads/premium-ui-kit.zip',
      category: 'Design',
      createdAt: '2024-01-01T00:00:00Z'
    },
    purchaseDate: '2024-01-15T10:30:00Z',
    amount: 49.99
  }
];