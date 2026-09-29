export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface RazorpayOptions {
  key?: string;
  amount: number; // in lowest currency unit (paise or cents)
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  handler: (response: RazorpaySuccessResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
    method?: 'upi' | 'card' | 'netbanking' | 'wallet';
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
    backdrop_color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: string, callback: (response: any) => void) => void;
    };
  }
}

/**
 * Ensures Razorpay SDK checkout script is loaded into the document.
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Initiates Razorpay checkout flow
 */
export const triggerRazorpayCheckout = async (
  options: Omit<RazorpayOptions, 'key'>,
  customKey?: string
): Promise<{ success: boolean; error?: string }> => {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    return {
      success: false,
      error: 'Razorpay SDK failed to load. Please check your network connection.'
    };
  }

  // Use environment key, custom key, or test demo key
  const razorpayKey = customKey || (import.meta as any).env?.VITE_RAZORPAY_KEY_ID || 'rzp_live_ThsyLhw1bO4hBl';

  try {
    const rzp = new window.Razorpay({
      ...options,
      key: razorpayKey,
      theme: {
        color: '#000000', // Editorial Black
        backdrop_color: 'rgba(255, 255, 255, 0.85)',
        ...options.theme
      }
    });

    rzp.open();
    return { success: true };
  } catch (err: any) {
    console.error('Error opening Razorpay checkout:', err);
    return {
      success: false,
      error: err.message || 'Failed to initiate Razorpay checkout'
    };
  }
};
