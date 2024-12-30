// app/context/CountContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CountContextType {
  clickCount: number;
  incrementCount: () => void;
}

interface ProviderProps {
  children: ReactNode;
}

const CountContext = createContext<CountContextType | undefined>(undefined);

export const CountProvider: React.FC<ProviderProps> = ({ children }) => {
  const [clickCount, setClickCount] = useState(0);

  const incrementCount = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <CountContext.Provider value={{ clickCount, incrementCount }}>
      {children}
    </CountContext.Provider>
  );
};

export const useCount = (): CountContextType => {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};