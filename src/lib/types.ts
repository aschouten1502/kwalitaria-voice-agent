export interface CustomizationOption {
  name: string;
  price?: number;
}

export interface Customization {
  type: "sauce" | "size" | "topping" | "extra" | "dietary";
  label: string;
  options: CustomizationOption[];
  required?: boolean;
  multiple?: boolean;
  defaultSelected?: string[];
}

export interface MenuItem {
  name: string;
  price: number;
  description?: string;
  customizations?: Customization[];
  defaultIngredients?: string[];
  defaultSauce?: string;
}

export interface MenuCategory {
  name: string;
  description?: string;
  items: MenuItem[];
}

export interface MenuData {
  restaurant: string;
  location: string;
  currency: string;
  categories: MenuCategory[];
}

export interface OrderItem {
  name: string;
  quantity: number;
  price_cents: number;
  removed?: string[];
  extras?: string[];
  sauceNote?: string;
}

export interface Order {
  id: string;
  order_number: number;
  customer_name: string;
  customer_phone: string;
  customer_address?: string;
  postal_code?: string;
  type: "afhalen" | "bezorgen";
  items: OrderItem[];
  notes?: string;
  total_cents: number;
  status: "nieuw" | "in_bereiding" | "klaar" | "bezorgd";
  created_at: string;
  estimated_ready: string;
}

export interface SmsMessage {
  id: string;
  from: "klant" | "kwalitaria";
  text: string;
  timestamp: string;
}

export interface CallLog {
  id: string;
  call_id: string;
  duration_seconds?: number;
  ended_reason?: string;
  transcript?: string;
  created_at: string;
}

export interface DemoStats {
  totalOrders: number;
  totalRevenue: number;
  avgOrderValue: number;
  callCount: number;
}

export interface DemoState {
  orders: Order[];
  smsMessages: SmsMessage[];
  stats: DemoStats;
}
