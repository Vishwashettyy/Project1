# News18 Videos Listing Page Test Plan

## Application Overview

Comprehensive functional, navigation, media playback, content, responsive, accessibility, and resilience coverage for the News18 English Videos listing page at https://www.news18.com/videos/. The inspected page identifies itself with the title “Latest Videos: Watch Top Videos on Breaking News, Trending News, Sports, Entertainment” and a visible “Latest Videos” heading and introductory copy. The listing contains video entries with embedded YouTube players, linked headlines, category labels, descriptions, and last-updated timestamps. The page also uses the News18 global header/navigation and footer.

Video headlines, order, descriptions, categories, timestamps, player IDs, and availability are dynamic. Do not assert exact editorial content or a permanently fixed number of entries. Select current entries at runtime and verify that their links and metadata remain associated. The page currently includes multiple embedded players; exercise only a small representative sample unless the test specifically covers a different entry. Tests assume a fresh browser context unless noted. Do not sign in, submit personal information, publish comments, or change account settings.

## Test Scenarios

### 1. News18 Videos Listing

**Seed:** `tests\seed.spec.ts`

#### 1.1. Direct load, identity, and initial viewport

**File:** `tests\videos\videos-01-page-load.spec.ts`

**Steps:**
  1. In a fresh browser session, navigate directly to https://www.news18.com/videos/ and wait for the page heading and initial listing content to settle.
    - expect: The URL uses HTTPS and resolves to the Videos listing rather than an unrelated page.
    - expect: The document title identifies the latest videos and the News18 brand.
    - expect: A visible “Latest Videos” heading and descriptive introduction identify the page purpose.
    - expect: At least one video entry becomes available without the page remaining indefinitely in a loading state.
  2. Inspect the initial viewport for the News18 header, breadcrumb or section identity, page heading, introduction, and first video card.
    - expect: The listing is distinguishable from the global header and any advertisements or prompts.
    - expect: Content and controls are not clipped, overlapped, or obscured.
    - expect: Any displayed consent, sign-in, or promotional prompt can be dismissed or does not prevent access to the listing.

#### 1.2. Header, breadcrumb, and global navigation

**File:** `tests\videos\videos-02-global-navigation.spec.ts`

**Steps:**
  1. Inspect the News18 logo, Home/breadcrumb link, visible top-level navigation, and header shortcuts.
    - expect: Each interactive control has a discernible accessible name and a non-empty destination or defined action.
    - expect: The News18 logo and Home link lead to the News18 homepage; the Videos navigation item leads to `/videos/`.
  2. Open at least two visible top-level News18 sections, returning to the Videos listing after each.
    - expect: Each link opens a destination appropriate to its label.
    - expect: Browser Back and Forward restore the expected URL and page identity without a stale or blank state.
  3. Activate the breadcrumb or Home link, then return to the Videos listing.
    - expect: The breadcrumb destination is correct and the Videos listing can be reached again through site navigation or browser history.

#### 1.3. Video listing content and card structure

**File:** `tests\videos\videos-03-listing-cards.spec.ts`

**Steps:**
  1. Inspect several currently rendered video entries from the top of the listing and record each displayed headline, category, description, update time, and player area where present.
    - expect: Each entry has a readable headline and a clearly grouped player/card presentation.
    - expect: Category labels, descriptions, and timestamps are associated with the correct headline.
    - expect: Optional metadata may be absent without leaving broken or misleading placeholders.
  2. Inspect one long headline and one long description, if available.
    - expect: Text wraps without obscuring links or overlapping adjacent cards.
    - expect: The full headline remains available as link text or an equivalent accessible name.
  3. Compare repeated headlines or cards with similar content, if present.
    - expect: Each card's player and destination remain associated with its own story, even where content is similar.

#### 1.4. Headline navigation and video detail route

**File:** `tests\videos\videos-04-headline-navigation.spec.ts`

**Steps:**
  1. Open the headline of a currently listed video entry.
    - expect: The headline is an operable link with a non-empty News18 video destination.
    - expect: The destination loads an appropriate video detail page, with a title or content corresponding to the selected listing entry.
  2. Use browser Back to return to the listing, then open a different video headline.
    - expect: Back returns to the listing with its page identity and usable cards intact.
    - expect: The second headline leads to its own corresponding detail destination.
  3. Reload the detail page and navigate back to the listing.
    - expect: Direct loading and browser history work without a redirect loop, blank page, or loss of core page content.

#### 1.5. Embedded video player startup and playback

**File:** `tests\videos\videos-05-player-playback.spec.ts`

**Steps:**
  1. Choose one representative embedded player and activate its Play control.
    - expect: The player responds with playback, a loading state, or a clear, actionable unavailable-video message.
    - expect: The play control does not trigger an unintended News18 navigation.
    - expect: Audio/video state is reflected by the player controls.
  2. Pause the video, resume it, and use the player mute/volume control.
    - expect: Playback can be paused and resumed without freezing the listing.
    - expect: Mute and volume changes take effect and are represented by updated control states.
  3. Where available, use seek, playback speed, captions, and quality controls.
    - expect: Each available control is operable and its selected state is communicated.
    - expect: An unavailable track or setting does not produce a misleading success state or disable unrelated controls.
  4. Stop playback or pause before leaving the page.
    - expect: Navigating to another listing item or away from the page does not leave unintended audio playing.

#### 1.6. Player isolation and multiple embeds

**File:** `tests\videos\videos-06-multiple-players.spec.ts`

**Steps:**
  1. Start playback in one visible player, then start playback in a second player if available.
    - expect: Each player controls only its own video.
    - expect: The site's intended behavior for simultaneous playback is consistent (for example, pausing the previous player if that is the product behavior); no player is mistaken for another card.
  2. Scroll between players while one is playing.
    - expect: Scrolling does not unexpectedly activate another video or change the selected story.
    - expect: Any sticky/miniplayer behavior, if present, is clearly indicated and can be dismissed or controlled.
  3. Reload the listing after playback.
    - expect: The page restores to a usable listing state and does not autoplay multiple videos unexpectedly.

#### 1.7. Fullscreen, captions, and keyboard player controls

**File:** `tests\videos\videos-07-player-controls-accessibility.spec.ts`

**Steps:**
  1. Enter and exit fullscreen using the player control and the Escape key.
    - expect: Fullscreen opens for the selected player and can be exited without getting trapped.
    - expect: Returning from fullscreen restores the page at a usable scroll position.
  2. Operate the player using keyboard controls without using a mouse.
    - expect: Play/pause, mute, seek, captions, and fullscreen controls (when provided) can be reached and operated by keyboard.
    - expect: Focus is visible, remains predictable, and does not escape into an unintended frame or page action.
  3. Enable captions if the video provides them.
    - expect: Captions are readable and synchronized; unavailable captions are communicated without implying that they are enabled.

#### 1.8. Player error and blocked third-party media

**File:** `tests\videos\videos-08-player-failure-states.spec.ts`

**Steps:**
  1. In a controlled test, block or interrupt one embedded YouTube player request.
    - expect: The player displays a recognizable error, placeholder, or retry path instead of a permanently blank region.
    - expect: The associated headline, metadata, and other listing entries remain usable.
  2. Restore connectivity and retry or reload the affected player/page.
    - expect: The player either recovers or reports an explicit continued failure; it does not falsely indicate playback.
  3. Test an entry whose video is unavailable, removed, or restricted, if one is currently listed.
    - expect: The unavailable state is limited to that video and does not break the entire listing.
    - expect: The headline link, if still available, does not lead to a broken or unrelated destination.

#### 1.9. Category labels and category navigation

**File:** `tests\videos\videos-09-categories.spec.ts`

**Steps:**
  1. Inspect the categories shown for currently listed entries and any category selector or dropdown rendered on the page.
    - expect: Category labels are visible, readable, and associated with their corresponding video cards.
    - expect: Any dropdown or selector has a clear label and exposes its available choices.
  2. Activate a category link or choose a category from the selector, if provided.
    - expect: The destination or filtered results correspond to the selected category.
    - expect: The category page/filter state is identifiable and can be cleared or returned to the full Videos listing.
  3. Use browser Back and Forward after changing category or filter state.
    - expect: URL, selected category, and visible results remain synchronized where navigation state is represented in browser history.

#### 1.10. Share links and external destinations

**File:** `tests\videos\videos-10-sharing-links.spec.ts`

**Steps:**
  1. Inspect share controls available for a video card or its detail page.
    - expect: Each share action has an accessible name and clearly indicates the destination or sharing action.
    - expect: Share links use the selected video's canonical URL and headline rather than another card's details.
  2. Open a share action in a controlled browser context without publishing or sending the content.
    - expect: The expected external share destination opens with the correct video URL and title prefilled where supported.
    - expect: Returning or closing the external destination leaves the News18 page intact.
  3. Inspect links to News18 apps, social channels, and third-party platforms without signing in or granting unnecessary permissions.
    - expect: External destinations are identifiable and use HTTPS where available.

#### 1.11. Long-list scrolling and content loading

**File:** `tests\videos\videos-11-scrolling-and-feed.ts`

**Steps:**
  1. Scroll from the first video entry through the full currently rendered listing to the footer.
    - expect: All currently rendered entries can be reached and remain responsive during scrolling.
    - expect: Lazy-loaded player frames and thumbnails load as needed, or show intentional placeholders.
    - expect: Player frames reserve adequate space and do not cause severe layout shifts or overlap text.
  2. Continue scrolling past the last entry and check for a Load More button, pagination, or infinite-scroll behavior if present.
    - expect: Any continuation control loads the next set once per activation and clearly indicates loading, completion, or failure.
    - expect: Repeated activation does not duplicate entries, skip entries, or produce an endless loading state.
    - expect: If the listing has no continuation control, the end of the available list is clear and the footer is reachable.
  3. Return to the top using normal browser scrolling.
    - expect: The page heading and listing remain usable without a reload and no persistent player overlay blocks content.

#### 1.12. Timestamps, descriptions, and editorial data

**File:** `tests\videos\videos-12-editorial-metadata.spec.ts`

**Steps:**
  1. Review timestamps, descriptions, and category text on several current entries.
    - expect: Dates and times are readable and consistently formatted.
    - expect: Descriptions render as text without raw markup, broken encoding, or malformed placeholders.
    - expect: Description and update time correspond to the displayed video entry.
  2. Reload the page later or in a separate fresh session and compare content.
    - expect: Editorial updates may change entry order or metadata without breaking page structure.
    - expect: Stale or unavailable data is presented with a clear empty/error state rather than an incorrect success state.

#### 1.13. Responsive layout and orientation

**File:** `tests\videos\videos-13-responsive-layout.spec.ts`

**Steps:**
  1. View the listing at representative desktop, tablet, and narrow mobile sizes (for example 1440×900, 768×1024, and 375×812).
    - expect: The page reflows without unintended horizontal scrolling.
    - expect: Video players scale to the viewport without cropping important controls or content.
    - expect: Headlines, categories, descriptions, and timestamps remain readable and do not overlap adjacent cards.
  2. Rotate a mobile viewport between portrait and landscape and resize between mobile and desktop widths without reloading.
    - expect: Players and cards resize cleanly, and no content is duplicated or permanently hidden.
  3. Operate a video player and listing links at mobile size.
    - expect: Touch targets are practical to activate and no hover-only action is required.
    - expect: Player controls do not overlap nearby page links in a way that causes accidental navigation.

#### 1.14. Accessibility and assistive technology semantics

**File:** `tests\videos\videos-14-accessibility.spec.ts`

**Steps:**
  1. Navigate the header, listing links, player controls, and footer using only the keyboard.
    - expect: All interactive elements are keyboard reachable with a visible focus indicator.
    - expect: Focus order follows a logical reading order and no keyboard trap occurs in a player iframe.
  2. Inspect the accessibility tree for page landmarks, heading hierarchy, video card headlines, category names, and player titles.
    - expect: The page exposes meaningful main/navigation/footer landmarks and a clear page-level heading.
    - expect: Each embedded player has an accessible title or equivalent label that distinguishes the video.
    - expect: Links and controls have useful accessible names; icon-only social/share controls are labeled.
  3. Test browser zoom at 200% and review text contrast and focus states.
    - expect: Content and essential functionality remain available without loss or overlap.
    - expect: Focus and selected states remain perceivable and are not communicated by color alone.

#### 1.15. Direct routes, reload, and history recovery

**File:** `tests\videos\videos-15-route-history.spec.ts`

**Steps:**
  1. Load `/videos/` directly in a fresh browser session, then reload after the listing appears.
    - expect: Direct navigation and reload render the Videos listing with consistent title, heading, and content.
    - expect: The canonical route remains `/videos/` and does not redirect to AMP or an unrelated route unless explicitly intended.
  2. Open a video detail page, return to the listing, and use Back and Forward.
    - expect: Each history step restores the expected URL and page identity.
    - expect: The page does not show detail content under the listing URL or vice versa.
  3. Open a video detail URL directly in a new tab if the listing link exposes one.
    - expect: The detail page loads with the corresponding video and provides a working way back to the listing.

#### 1.16. Footer and global site links

**File:** `tests\videos\videos-16-footer.spec.ts`

**Steps:**
  1. Scroll to the footer and inspect popular categories, News18 section links, language editions, group sites, legal/help links, social links, and app download links.
    - expect: Footer groups are readable and links have meaningful names.
    - expect: Internal links lead to relevant News18 pages; external links lead to the intended destination.
  2. Activate the Photos or Videos navigation link, where present.
    - expect: Photos opens the Photo Gallery destination and Videos returns to `/videos/`.
    - expect: The current route is recoverable using browser Back.

#### 1.17. SEO and page metadata

**File:** `tests\videos\videos-17-page-metadata.spec.ts`

**Steps:**
  1. Inspect the document title, meta description, canonical URL, and Open Graph/Twitter metadata using browser developer tools or an automated page assertion.
    - expect: The title and description describe the current News18 latest-videos listing.
    - expect: The canonical URL identifies `https://www.news18.com/videos/`.
    - expect: Social preview metadata is present and does not identify an unrelated page or article.
  2. Inspect structured data, if present.
    - expect: Structured data parses as valid JSON and describes the visible page/content without stale or mismatched URLs.

#### 1.18. Network, third-party, and advertisement resilience

**File:** `tests\videos\videos-18-network-resilience.spec.ts`

**Steps:**
  1. Load the page with a throttled network profile and observe the document, listing text, video frames, thumbnails, and advertisements.
    - expect: Page identity, headlines, and primary navigation appear even if third-party video or ad resources load slowly.
    - expect: Nonessential third-party failures do not prevent navigation through the News18 listing.
    - expect: Loading indicators or placeholders do not falsely imply that a video is playing.
  2. Block one nonessential advertisement or media request in a controlled test, then use the listing.
    - expect: The affected area degrades gracefully and other cards remain usable.
    - expect: An unavailable ad does not cover a headline, player control, or navigation element.
  3. Restore the network and reload the page.
    - expect: Core content recovers without duplicate cards or indefinite loading.

#### 1.19. Performance and layout stability

**File:** `tests\videos\videos-19-performance.spec.ts`

**Steps:**
  1. Measure a cold page load at documented desktop and mobile network profiles and record LCP, INP, CLS, and initial usable-content time.
    - expect: The page meets the team's agreed performance budgets. If no budgets exist, record results against Google's “good” Core Web Vitals thresholds (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1) with the environment documented.
    - expect: Loading several embedded players does not block basic navigation or make the page unresponsive.
  2. Scroll through the listing and exercise one player while collecting layout-shift and responsiveness observations.
    - expect: Player embeds reserve space to limit shifts and the page remains interactive.
  3. Repeat with a warm cache.
    - expect: Cached resources do not display stale video metadata or duplicate listing entries.

#### 1.20. Console errors and user-visible recovery

**File:** `tests\videos\videos-20-error-monitoring.spec.ts`

**Steps:**
  1. Capture browser console errors, failed requests, and page errors during normal load, scrolling, player startup, headline navigation, and return to the listing.
    - expect: No uncaught application error prevents core listing use.
    - expect: Third-party YouTube/ad failures are distinguishable from News18 document or application failures.
    - expect: Any user-visible failure provides an understandable recovery option or remains isolated to its affected player/card.
  2. Simulate a failed listing request in a controlled environment and retry after restoring connectivity.
    - expect: The failure state is clear and does not masquerade as a successfully loaded listing.
    - expect: Retry or reload restores the listing without stale or duplicated content.

## Execution Notes

- Use independent browser contexts for standalone scenarios and stop/pause active videos before closing a context.
- Treat video headlines, order, category labels, descriptions, timestamps, player availability, and total entry count as dynamic.
- Third-party player behavior depends on YouTube availability, browser policies, network conditions, and consent settings. Record the environment and distinguish those failures from News18 page failures.
- Do not assert that multiple videos can or cannot play simultaneously unless product behavior explicitly defines that rule; validate the observed behavior for consistency.
- Do not submit real credentials, newsletter signups, comments, or public shares during testing.
- Record browser/device, viewport, date/time, network profile, and any consent state for reproducible media and performance results.
