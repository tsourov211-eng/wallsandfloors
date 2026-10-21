'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { CartItem, Product, PRODUCTS, PROMO_CODES } from './data';

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  appliedPromo: string | null;
  promoDiscountPercent: number;
  totalItemsCount: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  freeShippingProgress: number;
  grandTotal: number;
  addToCart: (product: Product, boxes?: number, isSample?: boolean) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  wishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 5000;
const STANDARD_SHIPPING_FEE = 350;
const SAMPLE_SHIPPING_FEE = 60;
const SAMPLE_PRICE = 150;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('wf_cart');
      const savedWishlist = localStorage.getItem('wf_wishlist');
      const savedPromo = localStorage.getItem('wf_promo');

      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      if (savedPromo) setAppliedPromo(savedPromo);
    } catch {
      // LocalStorage not available or parse failed
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('wf_cart', JSON.stringify(cart));
      localStorage.setItem('wf_wishlist', JSON.stringify(wishlist));
      if (appliedPromo) {
        localStorage.setItem('wf_promo', appliedPromo);
      } else {
        localStorage.removeItem('wf_promo');
      }
    } catch {
      // Ignore storage errors
    }
  }, [cart, wishlist, appliedPromo, isLoaded]);

  const addToCart = (product: Product, boxes = 1, isSample = false) => {
    const itemId = isSample ? `${product.id}-sample` : `${product.id}-box`;
    const boxQty = Math.max(1, boxes);
    const unitPrice = isSample ? SAMPLE_PRICE : Number((product.price * product.boxCoverage).toFixed(2));
    const coverage = isSample ? 0 : Number((product.boxCoverage * boxQty).toFixed(2));

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + boxQty;
        const newCoverage = isSample ? 0 : Number((product.boxCoverage * newQty).toFixed(2));
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          coverage: newCoverage,
          coverageM2: newCoverage,
        };
        return updated;
      }

      return [
        ...prevCart,
        {
          id: itemId,
          productId: product.id,
          product,
          quantity: boxQty,
          isSample,
          coverage,
          coverageM2: coverage,
          unitPrice,
        },
      ];
    });

    if (isSample) {
      toast.success(`Sample added to your basket!`, {
        description: `${product.name} (Cut Sample) — ৳${SAMPLE_PRICE}`,
      });
    } else {
      const unitLabel = product.unit === 'pc' ? (boxQty === 1 ? 'pack' : 'packs') : (boxQty === 1 ? 'box' : 'boxes');
      const coverageLabel = product.unit === 'pc' ? `${product.boxCoverage * boxQty} pcs` : `${(product.boxCoverage * boxQty).toFixed(0)} sq.ft`;
      toast.success(`Added ${boxQty} ${unitLabel} to your basket!`, {
        description: `${product.name} (~${coverageLabel})`,
        action: {
          label: 'View Basket',
          onClick: () => setCartOpen(true),
        },
      });
    }
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const qty = newQuantity;
          const cov = item.isSample ? 0 : Number((item.product.boxCoverage * qty).toFixed(2));
          return {
            ...item,
            quantity: qty,
            coverage: cov,
            coverageM2: cov,
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === itemId);
      if (item) {
        toast.info(`Removed ${item.product.name} from basket`);
      }
      return prev.filter((i) => i.id !== itemId);
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const product = PRODUCTS.find((p) => p.id === productId);
      if (exists) {
        toast.info(`Removed from your wishlist`, {
          description: product?.name,
        });
        return prev.filter((id) => id !== productId);
      } else {
        toast.success(`Saved to your wishlist!`, {
          description: product?.name,
          action: {
            label: 'View Wishlist',
            onClick: () => setWishlistOpen(true),
          },
        });
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const applyPromo = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      return { success: false, message: 'Please enter a voucher code' };
    }
    const promo = PROMO_CODES[cleanCode];
    if (promo) {
      setAppliedPromo(cleanCode);
      toast.success(`Code applied: ${cleanCode}!`, {
        description: promo.description,
      });
      return { success: true, message: promo.description };
    }
    toast.error(`Invalid promo code`, {
      description: `Try AUTUMN20 for 20% off or WELCOME10 for 10% off.`,
    });
    return { success: false, message: 'Invalid or expired promo code' };
  };

  const removePromo = () => {
    setAppliedPromo(null);
    toast.info('Promo code removed');
  };

  // Computations
  const totalItemsCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const subtotal = useMemo(
    () => Number(cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0).toFixed(2)),
    [cart]
  );

  const promoDiscountPercent = useMemo(() => {
    if (!appliedPromo || !PROMO_CODES[appliedPromo]) return 0;
    return PROMO_CODES[appliedPromo].discountPercent;
  }, [appliedPromo]);

  const discountAmount = useMemo(() => {
    if (promoDiscountPercent === 0) return 0;
    return Number(((subtotal * promoDiscountPercent) / 100).toFixed(2));
  }, [subtotal, promoDiscountPercent]);

  const onlySamples = useMemo(() => cart.length > 0 && cart.every((item) => item.isSample), [cart]);

  const shippingFee = useMemo(() => {
    if (cart.length === 0) return 0;
    if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
    if (onlySamples) return SAMPLE_SHIPPING_FEE;
    return STANDARD_SHIPPING_FEE;
  }, [cart.length, subtotal, onlySamples]);

  const freeShippingRemaining = useMemo(
    () => Math.max(0, Number((FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2))),
    [subtotal]
  );

  const freeShippingProgress = useMemo(
    () => Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)),
    [subtotal]
  );

  const grandTotal = useMemo(
    () => Number(Math.max(0, subtotal - discountAmount + shippingFee).toFixed(2)),
    [subtotal, discountAmount, shippingFee]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        appliedPromo,
        promoDiscountPercent,
        totalItemsCount,
        subtotal,
        discountAmount,
        shippingFee,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingRemaining,
        freeShippingProgress,
        grandTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isWishlisted,
        applyPromo,
        removePromo,
        cartOpen,
        setCartOpen,
        wishlistOpen,
        setWishlistOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
