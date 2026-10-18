import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Homepage', () => {
  test('Sign-in entry point without submitting credentials', async ({ homepage }) => {
    // 1. Load the homepage and open the sign-in entry point.
    await homepage.goto();
    await homepage.page.getByRole('button', { name: 'Sign in' }).click();

    // 2. Do not enter credentials; return to the homepage and verify it remains usable.
    await homepage.goto();
    await expect(homepage.topNewsHeading).toBeVisible();
  });
});
