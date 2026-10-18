# News18 Photo Gallery Homepage Test Plan

## Application Overview

Comprehensive functional, navigation, content, responsive, accessibility, and resilience coverage for the News18 English Photo Gallery landing page at https://www.news18.com/photogallery/. The page currently presents a Photo Gallery title and introduction, a category navigation row (All, Movies, Lifestyle, India, Cities, Cricket, Business, Viral, Education, World, and Sports), a lead gallery-card grid, category-specific content sections with View More links, advertisement placements, and the News18 global footer. The header includes the News18 logo, Join Us, Ask News18, and Sign in controls; a Trending strip appears below it. The footer includes global navigation and a newsletter call to action.

Headlines, article order, timestamps, category modules, advertisements, and imagery are editorial or dynamically loaded. Tests should validate structure, relevance, and destination behavior rather than fixed headlines or exact item counts. The category list and modules may change; validate all options currently rendered and treat observed labels as examples, not immutable data. Each scenario assumes a fresh browser session unless it explicitly tests navigation, responsive resizing, or persistence. Do not submit real account credentials or personal data.

## Test Scenarios

### 1. News18 Photo Gallery Landing Page

**Seed:** `tests\seed.spec.ts`

#### 1.1. Direct load, page identity, and initial viewport

**File:** `tests\photogallery\photogallery-01-page-load.spec.ts`

**Steps:**
  1. In a fresh browser session, navigate directly to https://www.news18.com/photogallery/ and wait for the document, page heading, and initial gallery content to settle.
    - expect: The page loads over HTTPS without a browser error or redirect to an unrelated destination.
    - expect: The document title and visible H1 identify the News18 Photo Gallery page.
    - expect: The page presents its introductory description and usable primary content rather than a blank or indefinitely loading state.
  2. Inspect the initial desktop viewport, including the global header, Trending strip, breadcrumb, page title, category navigation, and first gallery cards.
    - expect: The main content is visually distinguishable from the header and promotional elements.
    - expect: Text and controls are not clipped, overlapped, or obscured by an overlay.
    - expect: Any consent, sign-in, or promotional prompt that appears can be dismissed or does not block all page use.

#### 1.2. Header controls and return to Photo Gallery

**File:** `tests\photogallery\photogallery-02-header-controls.spec.ts`

**Steps:**
  1. Inspect the header News18 logo, Join Us link, Ask News18 control, and Sign in control using their visible labels or accessible names.
    - expect: Each displayed control has a discernible name and an operable hit target.
    - expect: The logo links to the News18 home page; Join Us opens the destination indicated by its label.
  2. Activate Ask News18, inspect the resulting search/assistant interface, close it if it opens in an overlay, and return to the Photo Gallery page if it navigates.
    - expect: The control opens a usable search or assistant experience, or provides a clear relevant destination.
    - expect: Any overlay has a visible, keyboard-accessible close or return path and does not leave the page unusable.
  3. Activate Sign in and inspect the sign-in entry experience without entering or submitting credentials.
    - expect: A sign-in panel, modal, or destination is presented with a clear next step and a safe cancel/close/return path.
    - expect: Dismissing or leaving the sign-in experience returns to a usable Photo Gallery page.

#### 1.3. Trending strip links

**File:** `tests\photogallery\photogallery-03-trending-links.spec.ts`

**Steps:**
  1. Inspect the Trending strip and open at least two currently displayed topics, returning to the Photo Gallery page between visits.
    - expect: Each topic has a non-empty, operable link and its destination is relevant to the displayed topic.
    - expect: Internal News18 destinations load over HTTPS; external destinations, if any, are identifiable and do not silently replace the gallery page.
    - expect: Browser Back or site navigation returns to the Photo Gallery page.

#### 1.4. Breadcrumb and category navigation

**File:** `tests\photogallery\photogallery-04-category-navigation.spec.ts`

**Steps:**
  1. Activate the Home breadcrumb and return to Photo Gallery using the browser Back button or the site Photos link.
    - expect: The breadcrumb leads to the News18 home page.
    - expect: The Photo Gallery page can be revisited and its heading and category navigation are present.
  2. Activate All and each category currently rendered in the category row (for example Movies, Lifestyle, India, Cities, Cricket, Business, Viral, Education, World, and Sports). Return to the landing page between categories.
    - expect: Each link navigates to a gallery listing/category destination that corresponds to its label.
    - expect: The selected destination loads without a blank/error page and exposes an identifiable category heading or listing.
    - expect: All returns to the root `/photogallery/` landing route.
  3. Use browser Back and Forward after navigating between the landing page and a category.
    - expect: Browser history traverses the expected routes and does not display stale category content under the wrong URL.

#### 1.5. Lead gallery grid structure and content

**File:** `tests\photogallery\photogallery-05-lead-gallery-grid.spec.ts`

**Steps:**
  1. Inspect the lead gallery grid below the page introduction and record the headline, category/section labels, and timestamp for several currently displayed cards.
    - expect: The grid contains multiple story cards with readable, non-empty headlines.
    - expect: Each card has a meaningful destination and any displayed category and timestamp are associated with the correct card.
    - expect: Card layout and text remain readable when headlines wrap onto multiple lines.
  2. Open the image and headline area of at least two different cards, then return to the landing page after each visit.
    - expect: The image and headline within each card lead to the same corresponding story destination, unless the UI clearly provides distinct actions.
    - expect: The destination headline or content corresponds to the selected card.
    - expect: Returning to the landing page does not produce a broken scroll position or unusable grid.

#### 1.6. Category content sections and View More links

**File:** `tests\photogallery\photogallery-06-category-sections.spec.ts`

**Steps:**
  1. Scroll through the landing page and identify each category section currently rendered (for example Movies, Lifestyle, Cricket, India, and Cities).
    - expect: Each section has a visible category heading and a set of associated story cards.
    - expect: The module heading, card list, and View More link are grouped clearly and do not overlap adjacent content or advertisement slots.
  2. For at least three distinct sections, activate the section heading and its View More link separately.
    - expect: Both controls lead to the corresponding category listing.
    - expect: Repeated View More labels are distinguishable by their section context and have the correct destinations.
  3. Open a story card from a lower-page section and return to the landing page.
    - expect: The card destination is relevant to its displayed headline.
    - expect: Scrolling and returning remain reliable after a deep-page navigation.

#### 1.7. Gallery-card metadata, links, and duplicate content

**File:** `tests\photogallery\photogallery-07-card-metadata.spec.ts`

**Steps:**
  1. Sample cards from the lead grid and at least two lower-page modules, inspecting each card's headline, image, category labels, and timestamp where present.
    - expect: Metadata is readable and associated with the correct card.
    - expect: Optional metadata may be absent without breaking the card layout.
    - expect: Any repeated story appearing in multiple modules remains clickable and consistently links to that story.
  2. Inspect a card with a long headline and one with an unusual punctuation mark or non-ASCII character, if available.
    - expect: Headline text is not truncated in a way that removes the link's accessible name or meaning.
    - expect: Punctuation and characters render correctly without replacement glyphs or layout overflow.

#### 1.8. Images, lazy loading, and advertisement placements

**File:** `tests\photogallery\photogallery-08-media-and-ads.spec.ts`

**Steps:**
  1. Scroll progressively from the top to the bottom of the page, pausing at image-rich sections and any visible advertisement placements.
    - expect: Lazy-loaded images load as their cards approach the viewport, or show an intentional placeholder when media is unavailable.
    - expect: Image dimensions and placeholders reserve sufficient space to avoid severe layout shifts or text overlap.
    - expect: A missing, blocked, or delayed advertisement does not prevent the gallery content from loading or interacting.
  2. Check representative images for correct association with their cards and meaningful alternative text when the image conveys story content.
    - expect: Informative images have useful alt text; decorative images are ignored by assistive technology.
    - expect: Broken image requests do not leave misleading empty links or inaccessible card names.

#### 1.9. Long-page scrolling and return to top

**File:** `tests\photogallery\photogallery-09-long-page-scrolling.spec.ts`

**Steps:**
  1. Scroll from the initial viewport to the last content module and footer, then back to the top using the browser's normal scrolling controls.
    - expect: All rendered modules can be reached and the page remains responsive throughout the scroll.
    - expect: Header behavior (fixed, sticky, or normal flow) is consistent and does not cover focused or important content.
    - expect: Returning to the top reveals the page identity and category navigation without requiring a reload.
  2. Reload the page after reaching the bottom.
    - expect: The landing page reloads from its canonical route and returns to a coherent initial state.

#### 1.10. Footer navigation and newsletter call to action

**File:** `tests\photogallery\photogallery-10-footer.spec.ts`

**Steps:**
  1. Scroll to the footer and inspect its Popular Categories, language editions, Network18 group links, legal/help links, social/app links, and Photo/Photos link if present.
    - expect: Footer groups have readable headings and links with meaningful accessible names.
    - expect: Internal links lead to relevant News18 destinations; external links open the intended site.
    - expect: The Photos link returns to `/photogallery/`.
  2. Inspect the newsletter call to action and activate it without entering real personal information.
    - expect: The call to action opens or reveals a clearly identified signup flow.
    - expect: If an email field is provided, it is labeled and submission clearly explains the required input and consent.
  3. If the newsletter flow has an email field, try empty input, malformed email, and a syntactically valid test address using an approved non-delivering test setup.
    - expect: Empty and malformed values receive clear validation and are not reported as a successful subscription.
    - expect: A valid test submission gives an explicit success or service-error response without leaving the user in an indefinite loading state.

#### 1.11. Direct route, reload, and browser history

**File:** `tests\photogallery\photogallery-11-route-history.spec.ts`

**Steps:**
  1. Open `/photogallery/` directly in a fresh session and reload it once after the initial content appears.
    - expect: Direct navigation and reload both render the Photo Gallery landing page successfully.
    - expect: The canonical route, document title, H1, and category navigation remain consistent after reload.
  2. Navigate to a category and an article from the page, then use Back and Forward to traverse the sequence.
    - expect: Each history step restores the expected URL and matching page content.
    - expect: No history step results in a blank page, stale content, or a loop.

#### 1.12. Responsive layout

**File:** `tests\photogallery\photogallery-12-responsive-layout.spec.ts`

**Steps:**
  1. View the landing page at representative desktop, tablet, and narrow mobile viewport sizes (for example 1440×900, 768×1024, and 375×812).
    - expect: The page reflows without horizontal scrolling at the mobile viewport.
    - expect: The title, category navigation, cards, images, and section headings remain readable and operable.
    - expect: Any collapsed navigation or horizontally scrollable category row has an obvious affordance and can be operated by touch and keyboard.
  2. Resize between mobile and desktop widths without reloading, then open a category and return.
    - expect: Components adapt to the new viewport without duplicated, missing, or permanently hidden content.
    - expect: Responsive layout changes do not break links, scroll position, or browser history.

#### 1.13. Keyboard navigation and accessibility semantics

**File:** `tests\photogallery\photogallery-13-accessibility.spec.ts`

**Steps:**
  1. Navigate the initial page using only the keyboard (Tab, Shift+Tab, Enter, and Space where appropriate), including the header, category row, cards, and footer controls.
    - expect: Every interactive element is keyboard reachable and has a visible focus indicator.
    - expect: Focus order follows the visual and reading order and does not become trapped.
    - expect: Enter/Space activate the expected link or button without requiring a mouse.
  2. Inspect the accessibility tree and heading hierarchy for the page title, section titles, card titles, navigation, main content, and footer.
    - expect: The page exposes meaningful landmarks and a single clear page-level H1.
    - expect: Heading levels communicate page/module/card hierarchy without unexplained jumps.
    - expect: Controls and links expose meaningful accessible names; repeated View More links can be distinguished by context.
  3. Check text contrast and zoom/reflow at 200% browser zoom.
    - expect: Text and controls remain perceivable and usable without content or functionality being lost.
    - expect: Focused and active states are not conveyed by color alone.

#### 1.14. Content, metadata, and editorial freshness

**File:** `tests\photogallery\photogallery-14-content-metadata.spec.ts`

**Steps:**
  1. Inspect the page title, description, breadcrumb, page heading, card headlines, category labels, and timestamps.
    - expect: Page identity consistently describes Photo Gallery and News18.
    - expect: Visible dates and times use a consistent, readable format and do not display malformed or impossible values.
    - expect: Text is not clipped, encoded incorrectly, or replaced by raw markup.
  2. Reload the landing page at a later point or in a separate fresh session and compare editorial content without requiring identical headlines or order.
    - expect: The page can present updated content without stale data breaking the layout.
    - expect: Any unavailable feed has a clear empty/error state rather than misleading success content.

#### 1.15. Link and destination integrity

**File:** `tests\photogallery\photogallery-15-link-integrity.spec.ts`

**Steps:**
  1. Collect a representative set of internal links from the category row, lead cards, section headers, View More controls, and footer.
    - expect: Internal destinations resolve to the expected News18 route and do not produce 404, 5xx, redirect loops, or unrelated content.
    - expect: Link destinations are non-empty and consistent with their visible labels.
  2. Inspect external destinations such as Join Us or social/app links without submitting data or granting permissions.
    - expect: External navigation is clear to the user and uses HTTPS where supported.
    - expect: Opening or returning from an external destination does not corrupt the Photo Gallery page state.

#### 1.16. Loading, network, and third-party resilience

**File:** `tests\photogallery\photogallery-16-resilience.spec.ts`

**Steps:**
  1. Load the page with a throttled network profile and observe initial content, card images, advertisements, and any third-party widgets.
    - expect: Core page identity and primary navigation appear before nonessential third-party resources finish.
    - expect: Slow or unavailable third-party resources do not block interaction with loaded gallery links.
    - expect: Loading indicators, placeholders, or error states communicate delayed and failed resources without a false-success state.
  2. Block one nonessential image/ad request in a controlled test and continue using the page.
    - expect: The page remains navigable and the affected area degrades gracefully.
    - expect: No uncaught application error or full-page failure is caused by the unavailable resource.

#### 1.17. Performance and layout stability

**File:** `tests\photogallery\photogallery-17-performance.spec.ts`

**Steps:**
  1. Measure the page under an agreed desktop and mobile test profile using a clean browser cache and record LCP, INP, CLS, and total page load behavior.
    - expect: Core Web Vitals meet the team's agreed release budgets; where no budgets exist, report measurements against Google's "good" thresholds (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1) under a documented environment.
    - expect: The page remains responsive while scrolling and activating links.
  2. Repeat a load with warm cache and compare resource and interaction behavior.
    - expect: Cached resources do not cause stale or mismatched content and the page does not accumulate duplicate modules.

#### 1.18. Error monitoring and recovery

**File:** `tests\photogallery\photogallery-18-error-recovery.spec.ts`

**Steps:**
  1. Capture browser console errors and failed network requests during a normal page load, scroll, category navigation, and return to the landing page.
    - expect: No uncaught JavaScript exception prevents core page use.
    - expect: Failed optional resources are distinguishable from failures of the main document or primary content.
    - expect: Any application-level error is visible, actionable, and recoverable through retry, reload, or navigation.
  2. Simulate a failed landing-page request and retry once the network is restored.
    - expect: The browser or page exposes a clear failure state for the failed request.
    - expect: Retry or reload restores the Photo Gallery page without stale or duplicated content.

## Execution Notes

- Use fresh browser contexts for independent scenarios; retain cookies only when a scenario explicitly verifies remembered consent or preference behavior.
- Treat article titles, item order, module order, timestamps, and advertisement content as dynamic. Select cards by their current visible labels and verify destination relevance instead of pinning tests to today's headlines.
- Run navigation and link-integrity checks against the currently rendered controls. If editorial updates remove a category or module, record the change and test the remaining rendered elements.
- Keep authentication, newsletter delivery, analytics, and third-party effects in a test-safe environment. Do not use personal credentials, real email addresses, or production submissions.
- Record viewport size, browser version, network profile, and date/time for responsive and performance results.
