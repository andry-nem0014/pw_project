import { test, expect } from "fixtures/business.fixture";
import { SALES_PORTAL_URL } from "config/env";
import { generateMetricsData } from "data/salesPortal/generateMetricsData";
import numeral from "numeral";

test.describe("[Integration] [Home] [Business Metrics Overview]", () => {
  test("totalOrdersCount - newCustomersCount - totalCancelOrdersCount", async ({
    loginAsAdmin,
    homePage,
    page,
    mock,
  }) => {
    const expectedMetricData = generateMetricsData();
    await mock.metricHomePage({
      IsSuccess: true,
      Metrics: expectedMetricData,
      ErrorMessage: null,
    });

    await loginAsAdmin();
    await page.goto(SALES_PORTAL_URL + "home");
    await homePage.waitForOpened();

    expect(await homePage.totalOrdersCount.innerText()).toEqual(expectedMetricData.orders.totalOrders.toString());
    expect(await homePage.newCustomersCount.innerText()).toEqual(
      expectedMetricData.customers.totalNewCustomers.toString(),
    );
    expect(await homePage.totalCancelOrdersCount.innerText()).toEqual(
      expectedMetricData.orders.totalCanceledOrders.toString(),
    );
    expect(await homePage.totalRevenue.innerText()).toEqual(
      `$${numeral(expectedMetricData.orders.totalRevenue).format("0.0a")}`,
    );
    expect(await homePage.avgOrderValue.innerText()).toEqual(
      `$${numeral(expectedMetricData.orders.averageOrderValue).format("0.0a")}`,
    );
  });
});
