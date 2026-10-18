import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Homepage', () => {
  test('Header shortcuts and edition selector', async ({ homepage }) => {
    // 1. Load the homepage and verify its main header shortcuts.
    await homepage.goto();
    const liveTvLink = homepage.page.getByRole('link', { name: 'Watch LIVE TV' });
    const appLink = homepage.page.getByRole('link', { name: 'Download News18 APP' });
    await expect(liveTvLink).toBeVisible();
    await expect(appLink).toBeVisible();
    await expect(liveTvLink).toHaveAttribute('href', /livetv/);
    await expect(appLink).toHaveAttribute('href', /onelink/);

    // 2. Verify the English edition selector is present; this test does not change edition or account settings.
    await expect(homepage.englishEdition).toBeVisible();
    await expect(homepage.page.locator('header a[href*="notifications"]')).toBeVisible();
  });
});
