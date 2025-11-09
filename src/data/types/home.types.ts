import { IResponseFields } from "./core.types";

export interface IMetricResponse extends IResponseFields {
  Metrics: IMetrics;
}

export interface IMetrics {
  orders: IOrder;
  customers: ICustomers;
  products: IProducts;
}

export interface IOrder {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCanceledOrders: number;
  recentOrders: IRecentOrder[];
  ordersCountPerDay: IOrderDateCount[];
}

export interface IRecentOrder {
  _id: string;
  status: string;
  customer: IOrderCustomer;
  products: IOrderProduct[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delivery: null | any;
  total_price: number;
  createdOn: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comments: any[];
  history: [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assignedManager: null | any;
}

export interface IOrderCustomer {
  _id: string;
  email: string;
  name: string;
  country: string;
  city: string;
  street: string;
  house: number;
  flat: number;
  phone: string;
  createdOn: string;
  notes: string;
}

export interface IOrderInHistory {
  status: string;
  customer: string;
  products: IOrderProduct[];
  total_price: number;
  delivery: boolean;
  changedOn: string;
  action: string;
  notes: string;
  performer: IOrderPerformer;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assignedManager: any | null;
}

export interface IOrderPerformer {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  roles: string[];
  createdOn: string;
}

export interface IOrderProduct {
  _id: string;
  name: string;
  amount: number;
  price: number;
  manufacturer: string;
  notes: string;
  received: boolean;
}

export interface ICustomers {
  totalNewCustomers: number;
  topCustomers: ItopCustomer[];
  customerGrowth: IOrderDateCount[];
}

export interface ItopCustomer {
  _id: string;
  totalSpent: number;
  ordersCount: number;
  customerName: string;
  customerEmail: string;
}

export interface IOrderDateCount {
  date: {
    year: number;
    month: number;
    day: number;
  };
  count: number;
}

export interface IProducts {
  topProducts: ITopProduct[];
}

export interface ITopProduct {
  name: string;
  sales: number;
}
