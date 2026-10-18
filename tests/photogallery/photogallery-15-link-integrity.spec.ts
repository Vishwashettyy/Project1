import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Photo Gallery Landing Page', () => {
  test('Representative gallery links have valid News18 destinations', async ({ photoGallery }) => {
    await photoGallery.goto();

    const candidates = [
      photoGallery.categoryLinks.first(),
      photoGallery.galleryCards.first(),
      photoGallery.viewMoreLinks.first(),
      photoGallery.footer.getByRole('link').first(),
    ];
    for (const link of candidates) {
      if (await link.count()) {
        const href = await link.getAttribute('href');
        expect(href).toBeTruthy();
        const destination = new URL(href!, photoGallery.page.url());
        expect(['https:', 'http:']).toContain(destination.protocol);
        if (destination.hostname.endsWith('news18.com')) {
          expect(destination.protocol).toBe('https:');
        }
      }
    }

    await expect(photoGallery.pageHeading).toBeVisible();
  });
});
