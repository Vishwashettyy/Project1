import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Homepage', () => {
  test('Primary navigation and homepage recovery', async ({ homepage }) => {
    // 1. Open the homepage and verify primary navigation is available.
    await homepage.goto();
    await expect(homepage.primaryNavigation).toBeVisible();

    // 2. Open the India section from primary navigation and verify its destination.
    const indiaLink = homepage.primaryNavigation.getByRole('link', { name: 'India' });
    await indiaLink.click();
    await expect(homepage.page).toHaveURL(/\/india\//);
    await expect(homepage.page).toHaveTitle(/India.*News18/i);

    // 3. Return home, then open World and Latest from primary navigation.
    await homepage.goto();
    await homepage.primaryNavigation.getByRole('link', { name: 'World' }).click();
    await expect(homepage.page).toHaveURL(/\/world\//);
    await homepage.goto();
    await homepage.primaryNavigation.getByRole('link', { name: 'Latest' }).click();
    await expect(homepage.page).toHaveURL(/\/news\//);

    // 4. Use the News18 logo to return home and verify the homepage content.
    await homepage.page.locator('header a[href="https://www.news18.com/"]').first().click();
    await expect(homepage.topNewsHeading).toBeVisible();
  });
});
