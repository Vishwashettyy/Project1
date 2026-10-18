import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Homepage', () => {
  test('Deals and product category browsing', async ({ homepage }) => {
    // 1. Load homepage and verify the deals module is present.
    await homepage.goto();
    const dealsHeading = homepage.page.getByRole('heading', { name: 'Deals from Amazon' });
    await expect(dealsHeading).toBeVisible();

    // 2. Select a product category without activating any purchase controls.
    const washingMachineCategory = homepage.page.getByRole('button', { name: 'Washing Machine' });
    await washingMachineCategory.click();
    await expect(washingMachineCategory).toBeVisible();
    await expect(dealsHeading).toBeVisible();
  });
});
