import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Photo Gallery Landing Page', () => {
  test('Gallery headlines and optional card metadata remain readable', async ({ photoGallery }) => {
    await photoGallery.goto();

    const cards = photoGallery.galleryCards;
    expect(await cards.count()).toBeGreaterThan(1);
    const sampledCards = cards.count() > 8 ? 8 : await cards.count();
    const observedHrefs = new Set<string>();

    for (let index = 0; index < sampledCards; index += 1) {
      const card = cards.nth(index);
      const headline = card.getByRole('heading').first();
      await expect(headline).toBeVisible();
      await expect(headline).not.toHaveText('');
      await expect(card).toHaveAttribute('href', /.+/);
      const href = await card.getAttribute('href');
      if (href) observedHrefs.add(href);
      const image = card.locator('img').first();
      if (await image.count()) {
        await expect(image).toHaveAttribute('alt');
      }
    }

    expect(observedHrefs.size).toBeGreaterThan(1);
  });
});
