import { expect, test } from '../../fixtures/news18.fixture';

test.describe('News18 Photo Gallery Landing Page', () => {
  test('Cold and warm loads record page stability metrics', async ({ photoGallery }) => {
    await photoGallery.page.addInitScript(() => {
      const metrics = { lcp: 0, cls: 0, inp: 0 };
      Object.defineProperty(window, '__galleryMetrics', {
        value: metrics,
        configurable: true,
      });
      const supportedTypes = PerformanceObserver.supportedEntryTypes;
      if (supportedTypes.includes('largest-contentful-paint')) {
        new PerformanceObserver((list) => {
          const latest = list.getEntries().at(-1);
          if (latest) metrics.lcp = latest.startTime;
        }).observe({ type: 'largest-contentful-paint', buffered: true });
      }
      if (supportedTypes.includes('layout-shift')) {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as Array<PerformanceEntry & {
            hadRecentInput?: boolean;
            value?: number;
          }>) {
            if (!entry.hadRecentInput && entry.value) metrics.cls += entry.value;
          }
        }).observe({ type: 'layout-shift', buffered: true });
      }
      if (supportedTypes.includes('event')) {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            metrics.inp = Math.max(metrics.inp, entry.duration);
          }
        }).observe({ type: 'event', buffered: true, durationThreshold: 16 });
      }
    });

    const coldStart = Date.now();
    await photoGallery.goto();
    await expect(photoGallery.pageHeading).toBeVisible();
    const coldLoadMs = Date.now() - coldStart;
    await photoGallery.page.evaluate(() => window.scrollTo(0, 500));
    const metrics = await photoGallery.page.evaluate(() => {
      const observed = (window as Window & {
        __galleryMetrics?: { lcp: number; cls: number; inp: number };
      }).__galleryMetrics;
      return {
        lcp: observed?.lcp ?? 0,
        cls: observed?.cls ?? 0,
        inp: observed?.inp ?? 0,
        navigationLoadMs: performance.getEntriesByType('navigation')[0]?.duration ?? 0,
      };
    });
    test.info().annotations.push({
      type: 'performance-measurements',
      description: JSON.stringify({ coldLoadMs, ...metrics }),
    });
    expect(coldLoadMs).toBeGreaterThan(0);
    expect(metrics.navigationLoadMs).toBeGreaterThan(0);
    if (metrics.lcp) expect(metrics.lcp).toBeLessThanOrEqual(2500);
    expect(metrics.cls).toBeLessThanOrEqual(0.1);
    if (metrics.inp) expect(metrics.inp).toBeLessThanOrEqual(200);

    await photoGallery.reload();
    await expect(photoGallery.pageHeading).toBeVisible();
    expect(await photoGallery.galleryCards.count()).toBeGreaterThan(0);
  });
});
