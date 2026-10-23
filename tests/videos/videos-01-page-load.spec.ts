import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Videos Listing', () => {
  test('Direct load, identity, and initial viewport', async ({ videosListing }) => {
    // 1. Navigate directly to the Videos listing and wait for its identity and first entry.
    await videosListing.goto();
    await expect(videosListing.page).toHaveURL(/^https:\/\/www\.news18\.com\/videos\/?$/);
    await expect(videosListing.page).toHaveTitle(/latest videos.*watch top videos/i);
    await expect(videosListing.pageHeading).toBeVisible();
    await expect(videosListing.description).toBeVisible();
    await expect(videosListing.firstVideoHeading).toBeVisible();

    // 2. Verify the initial viewport shows News18 branding and the listing identity.
    await expect(videosListing.header).toBeVisible();
    await expect(videosListing.news18Logo).toBeVisible();
    await expect(videosListing.pageHeading).toBeInViewport();
    await expect(videosListing.videoCards.first()).toBeInViewport();
  });
});
