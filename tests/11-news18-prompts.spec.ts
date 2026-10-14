import { expect, test } from '../fixtures/news18.fixture';

test.describe('News18 Homepage', () => {
  test('Consent and promotional prompt handling', async ({ homepage }) => {
    // 1. Load the homepage and detect whether a user-facing prompt is present.
    await homepage.goto();
    const prompt = homepage.page.getByRole('dialog');

    // 2. Dismiss a displayed prompt if it has a clear close control, then verify homepage access.
    if (await prompt.count()) {
      const closeButton = prompt.getByRole('button', { name: /close|dismiss|not now/i });
      if (await closeButton.count()) {
        await closeButton.click();
      }
    }
    await expect(homepage.topNewsHeading).toBeVisible();
  });
});
