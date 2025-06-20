import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium UI Kit',
    description: 'A comprehensive UI kit with over 200 components, designed for modern web applications. Includes buttons, forms, cards, modals, and navigation elements. Perfect for rapid prototyping and development.',
    shortDescription: 'Complete UI kit with 200+ components',
    price: 49.99,
    imageUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    downloadUrl: '/downloads/premium-ui-kit.zip',
    category: 'Design',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'JavaScript Mastery Course',
    description: 'Learn JavaScript from beginner to advanced level. This comprehensive course covers ES6+, async programming, DOM manipulation, and modern frameworks. Includes hands-on projects and real-world examples.',
    shortDescription: 'Complete JavaScript course with projects',
    price: 79.99,
    imageUrl: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
    downloadUrl: '/downloads/javascript-course.zip',
    category: 'Education',
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Stock Photo Bundle',
    description: 'High-quality stock photos for your projects. This bundle contains 500+ professional photos in various categories including business, technology, nature, and lifestyle. All photos are royalty-free.',
    shortDescription: '500+ professional stock photos',
    price: 29.99,
    imageUrl: 'https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg?auto=compress&cs=tinysrgb&w=800',
    downloadUrl: '/downloads/stock-photos.zip',
    category: 'Photography',
    createdAt: '2024-01-03T00:00:00Z'
  },
  {
    id: '4',
    name: 'React Component Library',
    description: 'A collection of reusable React components built with TypeScript and styled with Tailwind CSS. Includes form components, layout elements, and interactive widgets. Fully tested and documented.',
    shortDescription: 'Reusable React components with TypeScript',
    price: 59.99,
    imageUrl: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    downloadUrl: '/downloads/react-components.zip',
    category: 'Development',
    createdAt: '2024-01-04T00:00:00Z'
  },
  {
    id: '5',
    name: 'Digital Marketing Guide',
    description: 'Complete guide to digital marketing strategies. Learn about SEO, social media marketing, email campaigns, and content marketing. Includes templates, checklists, and case studies from successful campaigns.',
    shortDescription: 'Comprehensive digital marketing guide',
    price: 39.99,
    imageUrl: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    downloadUrl: '/downloads/marketing-guide.pdf',
    category: 'Marketing',
    createdAt: '2024-01-05T00:00:00Z'
  },
  {
    id: '6',
    name: 'Icon Pack Pro',
    description: 'Professional icon pack with 1000+ vector icons. Available in multiple formats (SVG, PNG, ICO) and various styles. Perfect for web design, mobile apps, and print materials.',
    shortDescription: '1000+ professional vector icons',
    price: 24.99,
    imageUrl: 'https://images.pexels.com/photos/355948/pexels-photo-355948.jpeg?auto=compress&cs=tinysrgb&w=800',
    downloadUrl: '/downloads/icon-pack.zip',
    category: 'Design',
    createdAt: '2024-01-06T00:00:00Z'
  }
];