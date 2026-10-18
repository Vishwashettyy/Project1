import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Photo Gallery Landing Page', () => {
  test('Footer navigation and newsletter entry point are usable', async ({ photoGallery }) => {
    await photoGallery.goto();
    await photoGallery.scrollToFooter();

    await expect(photoGallery.footer).toBeVisible();
    const footerLinks = photoGallery.footer.getByRole('link');
    expect(await footerLinks.count()).toBeGreaterThan(0);
    for (let index = 0; index < Math.min(await footerLinks.count(), 10); index += 1) {
      await expect(footerLinks.nth(index)).toHaveAttribute('href', /.+/);
      await expect(footerLinks.nth(index)).not.toHaveAccessibleName('');
    }

    const photosLink = photoGallery.footer.getByRole('link', { name: /photos?/i });
    if (await photosLink.count()) {
      await expect(photosLink.first()).toHaveAttribute('href', /photogallery/);
    }

    const newsletterEntry = photoGallery.footer.getByText(/newsletter|subscribe/i).first();
    if (await newsletterEntry.count()) {
      await expect(newsletterEntry).toBeVisible();
      const emailField = photoGallery.footer.getByRole('textbox', { name: /email/i });
      if (await emailField.count()) {
        await expect(emailField.first()).toBeVisible();
        await expect(emailField.first()).toHaveAttribute('type', 'email');
      }
    }
  });
});
