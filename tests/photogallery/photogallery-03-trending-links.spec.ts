import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Photo Gallery Landing Page', () => {
  test('Trending strip contains usable topic links', async ({ photoGallery }) => {
    await photoGallery.goto();

    await expect(photoGallery.trending).toBeVisible();
    const topicLinks = photoGallery.trending.getByRole('link');
    const linkCount = await topicLinks.count();
    expect(linkCount).toBeGreaterThan(0);

    for (let index = 0; index < Math.min(linkCount, 2); index += 1) {
      const topic = topicLinks.nth(index);
      await expect(topic).toHaveAttribute('href', /.+/);
      await expect(topic).not.toHaveAccessibleName('');
      const href = await topic.getAttribute('href');
      expect(href).toBeTruthy();
      if (href?.startsWith('https://www.news18.com')) {
        expect(href).toMatch(/^https:\/\/www\.news18\.com\//);
        const response = await photoGallery.page.goto(href, { waitUntil: 'domcontentloaded' });
        if (!response) throw new Error(`No response received from trending destination: ${href}`);
        expect(response.status()).toBeLessThan(400);
        await expect(photoGallery.page).toHaveURL(/^https:\/\/www\.news18\.com\//);
        await photoGallery.goto();
      }
    }
  });
});
