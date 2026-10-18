import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Photo Gallery Landing Page', () => {
  test('Lead gallery cards expose headlines and working destinations', async ({ photoGallery }) => {
    await photoGallery.goto();

    const cards = photoGallery.galleryCards;
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThan(1);

    for (let index = 0; index < Math.min(cardCount, 3); index += 1) {
      const card = cards.nth(index);
      await expect(card).toHaveAttribute('href', /.+/);
      await expect(card.getByRole('heading')).toBeVisible();
      await expect(card.getByRole('heading')).not.toHaveText('');
    }

    for (let index = 0; index < Math.min(cardCount, 2); index += 1) {
      const card = cards.nth(index);
      const destination = await card.getAttribute('href');
      expect(destination).toBeTruthy();
      await card.click();
      await expect(photoGallery.page).not.toHaveURL(/\/photogallery\/?$/);
      await photoGallery.page.goBack();
      await expect(photoGallery.pageHeading).toBeVisible();
    }
  });
});
