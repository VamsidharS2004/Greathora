import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const local = localStorage.getItem('greathora_cart');
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const local = localStorage.getItem('greathora_wishlist');
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const local = localStorage.getItem('greathora_user');
      return local ? JSON.parse(local) : null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    localStorage.setItem('greathora_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('greathora_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));

    fetch('/api/collections')
      .then(res => res.json())
      .then(data => setCollections(data))
      .catch(err => console.error(err));
  }, []);

  const addToCart = (product, color, size, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && item.selectedColor === color && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: product.images?.[0] || '',
            selectedColor: color || product.colors?.[0] || 'Default',
            selectedSize: size || product.sizes?.[0] || 'M',
            quantity
          }
        ];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id, color, size) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedColor === color && item.selectedSize === size)));
  };

  const updateQuantity = (id, color, size, qty) => {
    if (qty <= 0) {
      removeFromCart(id, color, size);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.selectedColor === color && item.selectedSize === size
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const loginUser = (userData, token) => {
    setUser(userData);
    localStorage.setItem('greathora_user', JSON.stringify(userData));
    localStorage.setItem('greathora_token', token);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('greathora_user');
    localStorage.removeItem('greathora_token');
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      wishlist,
      toggleWishlist,
      user,
      loginUser,
      logoutUser,
      isCartOpen,
      setIsCartOpen,
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      isSearchOpen,
      setIsSearchOpen,
      categories,
      collections
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => useContext(ShopContext);
