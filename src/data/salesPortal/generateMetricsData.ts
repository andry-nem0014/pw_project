import { faker } from "@faker-js/faker";
import { IMetrics } from "data/types/home.types";

export function generateMetricsData(params?: Partial<IMetrics>): IMetrics {
  return {
    orders: {
      totalRevenue: faker.number.int({ min: 0, max: 999999 }),
      totalOrders: faker.number.int({ min: 0, max: 999 }),
      averageOrderValue: faker.number.int({ min: 0, max: 99999 }),
      totalCanceledOrders: faker.number.int({ min: 0, max: 100 }),
      recentOrders: [],
      ordersCountPerDay: [],
      ...params?.orders,
    },
    customers: {
      totalNewCustomers: faker.number.int({ min: 0, max: 50 }),
      topCustomers: [],
      customerGrowth: [],
      ...params?.customers,
    },
    products: {
      topProducts: [],
      ...params?.products,
    },
  };
}
