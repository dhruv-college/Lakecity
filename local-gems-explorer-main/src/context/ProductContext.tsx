import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, mockProducts } from '@/data/mockData';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  getProduct: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const addProduct = (product: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const getProduct = (id: string) => {
    return products.find(p => p.id === id);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, getProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
