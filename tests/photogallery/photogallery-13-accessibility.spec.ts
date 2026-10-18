import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Photo Gallery Landing Page', () => {
  test('Keyboard access, landmarks, and heading hierarchy', async ({ photoGallery }) => {
    await photoGallery.goto();

    await photoGallery.page.keyboard.press('Tab');
    await expect(photoGallery.page.locator(':focus')).toBeVisible();
    await expect(photoGallery.pageHeading).toBeVisible();
    await expect(photoGallery.page.getByRole('main')).toBeVisible();
    await expect(photoGallery.footer).toBeAttached();
    await expect(photoGallery.page.getByRole('heading', { level: 1 })).toHaveCount(1);

    const interactiveLinks = photoGallery.categoryLinks;
    const linksCount = await interactiveLinks.count();
    expect(linksCount).toBeGreaterThan(0);
    for (let index = 0; index < Math.min(linksCount, 4); index += 1) {
      await expect(interactiveLinks.nth(index)).not.toHaveAccessibleName('');
    }

    await photoGallery.page.evaluate(() => {
      document.documentElement.style.zoom = '200%';
    });
    await expect(photoGallery.pageHeading).toBeVisible();
    await expect(photoGallery.categoryLinks.first()).toBeVisible();
  });
});
