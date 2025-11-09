export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory: string;
  rating: number;
  reviewCount: number;
  isVeg: boolean;
  spiceLevel: 'mild' | 'medium' | 'hot' | 'extra-hot';
  dietaryTags: string[];
  prepTime: number;
  isPopular?: boolean;
  customizations?: Customization[];
}

export interface Customization {
  id: string;
  name: string;
  type: 'radio' | 'checkbox';
  required: boolean;
  options: CustomizationOption[];
}

export interface CustomizationOption {
  id: string;
  label: string;
  priceModifier: number;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customizations: { [key: string]: string | string[] };
  specialInstructions?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered' | 'failed';
  deliveryAddress?: Address;
  contactNumber: string;
  paymentMethod: string;
  createdAt: Date;
}

export interface Address {
  id: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}
