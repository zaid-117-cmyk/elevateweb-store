import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, LicenseType, OrderDetails } from '../types';

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, license?: LicenseType) => void;
  removeFromCart: (productId: string, license: LicenseType) => void;
  updateQuantity: (productId: string, license: LicenseType, quantity: number) => void;
  updateLicense: (productId: string, oldLicense: LicenseType, newLicense: LicenseType) => void;
  clearCart: () => void;
  couponCode: string;
  couponError: string;
  couponSuccess: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  discountAmount: number;
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
  lastOrder: OrderDetails | null;
  setLastOrder: (order: OrderDetails | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'elevateweb_cart_items_v1';
const ORDER_STORAGE_KEY = 'elevateweb_last_order_v1';

const VALID_COUPONS: Record<string, { type: 'percent' | 'flat'; value: number; label: string }> = {
  ELEVATE20: { type: 'percent', value: 20, label: '20% Special Discount' },
  LAUNCH50: { type: 'flat', value: 50, label: '$50 Launch Credit' },
  DEV10: { type: 'percent', value: 10, label: '10% Developer Perk' },
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const [lastOrder, setLastOrderState] = useState<OrderDetails | null>(() => {
    try {
      const saved = localStorage.getItem(ORDER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to save cart to localStorage', err);
    }
  }, [cart]);

  const setLastOrder = (order: OrderDetails | null) => {
    setLastOrderState(order);
    try {
      if (order) {
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
      } else {
        localStorage.removeItem(ORDER_STORAGE_KEY);
      }
    } catch (err) {
      console.error('Failed to save order to localStorage', err);
    }
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addToCart = async (product: Product, license: LicenseType = 'standard') => {
    try {
      // 1. Create real order on backend
      const response = await fetch('https://api.elevateweb.me/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          // email is optional in backend, Razorpay will collect it
        })
      });

      const orderData = await response.json();
      
      if (!response.ok) {
        throw new Error(orderData.error || 'Failed to create backend order');
      }

      // 2. Open Real Razorpay Popup
      const { triggerRazorpayCheckout } = await import('../lib/razorpay');
      
      triggerRazorpayCheckout({
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ElevateWeb',
        description: product.title,
        order_id: orderData.orderId,
        handler: (res) => {
          // Success
          const newOrder: OrderDetails = {
            orderId: orderData.dbOrderId || 'ORD-' + Math.floor(100000 + Math.random() * 900000),
            date: new Date().toLocaleDateString('en-US'),
            customerName: 'Customer', // Razorpay collects this securely
            customerEmail: 'Delivered securely to your email',
            items: [{ product, license, quantity: 1 }],
            subtotal: product.price[license],
            discount: 0,
            tax: 0,
            total: product.price[license],
            paymentMethod: 'Razorpay Secure Checkout',
            razorpayPaymentId: res.razorpay_payment_id
          };
          setLastOrder(newOrder);
          window.location.href = '/order-success';
        }
      });
    } catch (err: any) {
      alert('Checkout failed: ' + err.message);
    }
  };

  const removeFromCart = (productId: string, license: LicenseType) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.license === license))
    );
  };

  const updateQuantity = (productId: string, license: LicenseType, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, license);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.license === license
          ? { ...item, quantity }
          : item
      )
    );
  };

  const updateLicense = (productId: string, oldLicense: LicenseType, newLicense: LicenseType) => {
    if (oldLicense === newLicense) return;

    setCart((prev) => {
      const targetItem = prev.find(
        (item) => item.product.id === productId && item.license === oldLicense
      );
      if (!targetItem) return prev;

      const withoutOld = prev.filter(
        (item) => !(item.product.id === productId && item.license === oldLicense)
      );

      const existingNewIndex = withoutOld.findIndex(
        (item) => item.product.id === productId && item.license === newLicense
      );

      if (existingNewIndex > -1) {
        withoutOld[existingNewIndex].quantity += targetItem.quantity;
        return withoutOld;
      }

      return [...withoutOld, { ...targetItem, license: newLicense }];
    });
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setCouponError('');
    setCouponSuccess('');
  };

  const applyCoupon = (code: string): boolean => {
    const formattedCode = code.trim().toUpperCase();
    setCouponError('');
    setCouponSuccess('');

    if (!formattedCode) {
      setCouponError('Please enter a coupon code');
      return false;
    }

    if (VALID_COUPONS[formattedCode]) {
      setCouponCode(formattedCode);
      setCouponSuccess(`Applied: ${VALID_COUPONS[formattedCode].label}`);
      return true;
    } else {
      setCouponError('Invalid coupon code. Try ELEVATE20');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponError('');
    setCouponSuccess('');
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => {
    const price = item.product.price[item.license];
    return sum + price * item.quantity;
  }, 0);

  let discountAmount = 0;
  if (couponCode && VALID_COUPONS[couponCode]) {
    const coupon = VALID_COUPONS[couponCode];
    if (coupon.type === 'percent') {
      discountAmount = Math.round((subtotal * coupon.value) / 100);
    } else {
      discountAmount = Math.min(coupon.value, subtotal);
    }
  }

  // Digital goods exported globally typically have 0 tax calculated unless configured
  const tax = 0;
  const total = Math.max(0, subtotal - discountAmount + tax);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateLicense,
        clearCart,
        couponCode,
        couponError,
        couponSuccess,
        applyCoupon,
        removeCoupon,
        discountAmount,
        subtotal,
        tax,
        total,
        itemCount,
        lastOrder,
        setLastOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
