import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Photo Gallery Landing Page', () => {
  test('Category sections group story cards and View More links', async ({ photoGallery }) => {
    await photoGallery.goto();

    const headings = photoGallery.sectionHeadings;
    const headingCount = await headings.count();
    expect(headingCount).toBeGreaterThan(0);
    for (let index = 0; index < Math.min(headingCount, 5); index += 1) {
      await expect(headings.nth(index)).toBeVisible();
      await expect(headings.nth(index)).not.toHaveText('');
    }

    const moreLinks = photoGallery.viewMoreLinks;
    const moreCount = await moreLinks.count();
    expect(moreCount).toBeGreaterThan(0);
    for (let index = 0; index < Math.min(moreCount, 3); index += 1) {
      const link = moreLinks.nth(index);
      await expect(link).toHaveAttribute('href', /.+/);
      await expect(link).toBeVisible();
      const destination = await link.getAttribute('href');
      await link.click();
      await expect(photoGallery.page).toHaveURL(new URL(destination!, 'https://www.news18.com').href);
      await photoGallery.goto();
    }
  });
});
