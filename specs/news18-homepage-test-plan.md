# News18 Homepage Test Plan

## Application Overview

Comprehensive functional, responsive, accessibility, and resilience test coverage for the News18 English homepage at https://www.news18.com/. Scenarios focus on homepage journeys and visible homepage modules, including primary navigation, Ask News18 search, sign-in entry point, notifications, Live TV, Top News, Trending Videos, shopping/deal modules, regional edition selector, and footer. Content is dynamic, so tests validate labels, destination relevance, and behavior rather than fixed headlines. Each test assumes a fresh browser session unless the scenario explicitly verifies persistence.

## Test Scenarios

### 1. News18 Homepage

**Seed:** `tests\seed.spec.ts`

#### 1.1. Homepage load, identity, and initial viewport

**File:** `tests\Home\01-news18-homepage-load.spec.ts`

**Steps:**
  1. In a fresh browser session, navigate directly to https://www.news18.com/ and wait for the initial page load and primary content to settle.
    - expect: The page loads using HTTPS without a browser error.
    - expect: The document title identifies News18 and the page presents the English homepage.
    - expect: The header and primary homepage content become usable without an indefinitely persistent loading state.
  2. Inspect the initial desktop viewport, including the News18 logo, date/edition area, primary navigation, and any visible prompts or overlays.
    - expect: Primary navigation and lead content are identifiable and not obscured by overlays.
    - expect: Images and text do not overlap or clip at the selected viewport.
    - expect: Any prompt displayed has clear controls and does not prevent all homepage use.

#### 1.2. Primary navigation and homepage recovery

**File:** `tests\Home\02-news18-primary-navigation.spec.ts`

**Steps:**
  1. On the homepage, open each visible top-level navigation destination (for example Home, India, World, Explainers, DataPop, Cricket, Cities, Movies, Lifestyle, Business, Tech2, and Latest where currently displayed), then return to the homepage between destinations.
    - expect: Each visible navigation link responds and opens a destination relevant to its label.
    - expect: Returning to the homepage restores the homepage and browser history remains usable.
    - expect: No navigation item unexpectedly opens an error page.
  2. Open a destination, select the News18 logo or Home link, then use browser Back and Forward.
    - expect: The logo/Home link returns to the homepage.
    - expect: Browser Back and Forward navigate between the expected pages without a blank page or broken state.

#### 1.3. Header shortcuts and edition selector

**File:** `tests\Home\03-news18-header-shortcuts.spec.ts`

**Steps:**
  1. Check visible header shortcuts such as Download News18 App, Watch LIVE TV, For You, and notifications; open each link and return to the homepage.
    - expect: Each shortcut navigates to the destination indicated by its label or icon.
    - expect: Internal destinations load without error; external destinations are clearly identifiable as external.
    - expect: The homepage remains recoverable through browser navigation.
  2. Open the English Edition selector if available, inspect the language or regional editions, and choose a non-English edition only if this can be done without changing account or device settings.
    - expect: The selector opens and its choices are distinguishable.
    - expect: Selecting an edition navigates to an appropriate News18 regional/language destination, and browser Back returns to English homepage.

#### 1.4. Top News story cards and links

**File:** `tests\Home\04-news18-top-news-stories.spec.ts`

**Steps:**
  1. Inspect the Top News area and open several story cards, including the lead story and at least two other visible items. Record the displayed headline before each click.
    - expect: Each story link opens a corresponding article or relevant destination.
    - expect: Article headline or content corresponds to the selected homepage card.
    - expect: Browser Back returns to the homepage without losing basic navigation.
  2. Open any visible Top News section or More/Latest link and return to the homepage.
    - expect: The section link opens a relevant story listing or destination.
    - expect: The homepage can be reached again using the site navigation or browser history.

#### 1.5. Ask News18 search overlay and query flow

**File:** `tests\Home\05-news18-ask-search.spec.ts`

**Steps:**
  1. Activate the Ask News18 header control and inspect the overlay, its search textbox, action buttons, and any Trending Topics or Hot on Social prompts.
    - expect: The overlay opens without navigating away from the homepage.
    - expect: The search field is available with a clear search purpose, and the overlay presents usable close/clear controls.
    - expect: Any suggested topic links are distinguishable from ordinary story links.
  2. Enter a topical, non-personal query into the search field and submit it using the visible search action or Enter.
    - expect: The query is accepted and the search flow provides results, a relevant response, or a clear no-results/error state.
    - expect: Submission does not leave the interface indefinitely loading or unresponsive.
    - expect: The homepage remains available after closing the search overlay or using browser navigation.
  3. Clear the query and try an empty submission and a query with spaces or punctuation, where the interface permits.
    - expect: Empty and unusual queries are handled gracefully with validation, no-results feedback, or another clear outcome.
    - expect: The overlay remains operable and can be dismissed.

#### 1.6. Sign-in entry point without submitting credentials

**File:** `tests\Home\06-news18-sign-in-entry.spec.ts`

**Steps:**
  1. Activate the homepage Sign in control and inspect the displayed sign-in interface.
    - expect: A sign-in panel, modal, or page opens and explains the next step.
    - expect: The interface provides a clear close, cancel, or return path.
    - expect: No account is created and no personal information is submitted.
  2. Close or cancel the sign-in interface and continue using homepage navigation.
    - expect: The homepage is restored and remains interactive.
    - expect: The sign-in interface does not leave a blocking overlay behind.

#### 1.7. Live TV homepage entry and recovery

**File:** `tests\Home\07-news18-live-tv.spec.ts`

**Steps:**
  1. Use the visible Watch LIVE TV shortcut or homepage LIVE TV module to open Live TV.
    - expect: The Live TV destination opens or shows a clear playback/loading state.
    - expect: If playback is unavailable due to browser, network, or third-party restrictions, the failure is communicated and the homepage remains recoverable.
  2. Return to the homepage and verify the LIVE TV module or shortcut remains usable.
    - expect: The homepage loads normally after returning, and the Live TV link remains functional.

#### 1.8. Trending Videos carousel controls

**File:** `tests\Home\08-news18-trending-videos.spec.ts`

**Steps:**
  1. Scroll to Trending Videos and inspect the visible video cards and carousel controls.
    - expect: Video cards display usable labels or headlines and any present carousel controls are identifiable.
    - expect: Video cards link to their corresponding video or story destinations.
  2. Use Next and Previous carousel controls and any slide indicator buttons; activate one card and then return to the homepage.
    - expect: Next, Previous, and slide indicators change the displayed carousel content as appropriate.
    - expect: Controls do not create duplicate or stuck slides, and selected video links open a relevant destination.
    - expect: Returning to the homepage remains possible.

#### 1.9. Deals and product category browsing

**File:** `tests\Home\09-news18-deals-module.spec.ts`

**Steps:**
  1. Scroll to Deals of the Day or other visible product recommendation modules and inspect product titles, categories, and navigation controls.
    - expect: Product cards have readable titles and relevant category labels.
    - expect: Any category selectors, such as product type buttons, visibly update the selected category or product list.
  2. Choose multiple visible product categories and verify the displayed list changes or the category selection is clearly reflected.
    - expect: Category controls respond consistently and do not break the page layout.
    - expect: No purchase is made and no personal/payment information is entered.
  3. If testing a Buy Now or retailer link, inspect its destination only; do not proceed with a purchase.
    - expect: The link leads to a relevant retailer/product destination and is clearly an external commerce link.
    - expect: The homepage remains available and no purchase or checkout is initiated.

#### 1.10. Homepage scrolling and content sections

**File:** `tests\Home\10-news18-homepage-scroll.spec.ts`

**Steps:**
  1. Scroll from the top through all major homepage sections, including Top News, LIVE TV, Trending Videos, Deals, and additional sections present at execution time.
    - expect: The page can be scrolled to all content without being trapped by sticky elements or overlays.
    - expect: Sections are visually distinguishable and story/product content is not substantially overlapping or clipped.
  2. Use any visible Load More, pagination, section heading, or more-content controls.
    - expect: Each control either loads additional relevant content or opens the relevant listing page.
    - expect: A failed or empty state, if present, is communicated without leaving a broken page.

#### 1.11. Consent and promotional prompt handling

**File:** `tests\Home\11-news18-prompts.spec.ts`

**Steps:**
  1. In a fresh session, note whether cookie/privacy consent, newsletter, app-install, or promotional prompts are displayed.
    - expect: If no such prompt is displayed, record the scenario as not applicable for that session.
    - expect: Any displayed prompt has understandable options and does not conceal all essential homepage functions.
  2. Exercise each available dismiss/accept/reject/manage option without submitting personal data, then reload the homepage.
    - expect: The selected action closes or updates the prompt as stated.
    - expect: The selection persists only as indicated by the site, and the page remains navigable after reload.

#### 1.12. Responsive homepage layout at mobile, tablet, and desktop sizes

**File:** `tests\Home\12-news18-responsive-layout.spec.ts`

**Steps:**
  1. Open the homepage at narrow mobile, tablet, and desktop viewport widths; at each size inspect header, navigation, lead stories, and major content cards.
    - expect: Content reflows appropriately to the viewport and remains readable.
    - expect: Essential controls remain visible or are available through an appropriate responsive menu.
    - expect: Ordinary homepage use does not require unintended horizontal scrolling.
  2. At mobile width, open and close the menu and operate visible story/carousel controls using touch-sized interactions.
    - expect: The mobile menu opens and closes reliably.
    - expect: Links and controls are not obscured, overlapping, or too small to activate reliably.
  3. Resize between viewport widths while on the homepage and observe any sticky header or floating controls.
    - expect: Resizing does not leave elements overlapping or permanently hidden.
    - expect: Sticky controls do not cover the current content or block page interaction.

#### 1.13. Keyboard accessibility and zoom

**File:** `tests\Home\13-news18-keyboard-accessibility.spec.ts`

**Steps:**
  1. Reload the homepage and navigate through the visible header controls, links, menus, and story cards using only Tab and Shift+Tab.
    - expect: Keyboard focus is visible and follows a reasonable order.
    - expect: Important controls and links can be activated with the appropriate keyboard key.
    - expect: Focus is not trapped unexpectedly in a menu or prompt.
  2. Use keyboard controls to open and close Ask News18 and any visible menu, then return focus to the initiating control where applicable.
    - expect: Overlays and menus are operable without a pointer and have a usable exit path.
    - expect: Focus does not disappear behind a closed overlay.
  3. Increase browser zoom to 200% and inspect navigation, Top News cards, and a major content module.
    - expect: Text remains readable and key controls/content remain available without destructive overlap or clipping.

#### 1.14. Refresh, direct load, and invalid-path recovery

**File:** `tests\Home\14-news18-refresh-recovery.spec.ts`

**Steps:**
  1. Load https://www.news18.com/ directly, refresh the page, and then navigate to one homepage-linked story and return using browser Back.
    - expect: Direct navigation and refresh render a usable homepage.
    - expect: Back returns to the homepage and does not leave the page blank or stuck loading.
  2. Open an invalid path under the News18 domain, inspect the error/not-found state, then recover using browser Back or a site home link.
    - expect: The invalid destination returns an understandable error or not-found state without exposing internal diagnostics.
    - expect: The user can return to the homepage.

#### 1.15. Slow and interrupted resource resilience

**File:** `tests\Home\15-news18-resource-resilience.spec.ts`

**Steps:**
  1. Using approved browser/network test tooling, throttle the connection and load the homepage; observe when the header and primary content become usable.
    - expect: The page provides usable primary content when available or communicates a clear loading/failure state.
    - expect: The page does not remain indefinitely blocked without feedback.
  2. If practical, block a nonessential ad, image, or embedded resource and continue interacting with navigation and story links.
    - expect: Failure of a nonessential resource does not disable unrelated homepage controls or prevent reading available content.
    - expect: Third-party failures are recorded separately from first-party homepage defects.
