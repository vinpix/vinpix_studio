# Happy Birthday Page Design & Technical Spec

This document outlines the UI/UX design and technical implementation plan for the `/happy_birthday` page. The goal is to create an immersive, storytelling experience for the user.

## 1. UI/UX Concept: "The Magic Unveiling"

The experience is divided into three distinct stages, guiding the user from mystery to celebration to emotional connection.

### Stage 1: The Mystery (Intro)

- **Visual:** Pitch black screen.
- **Interaction:**
  - A subtle "spotlight" or fluid trail follows the mouse cursor (reusing `SplashCursor.tsx`).
  - A glowing, pulsating message in the center: _"Are you ready?"_ or a simple Gift Box icon.
  - **Action:** User must click the center element to proceed.
- **Vibe:** Mysterious, quiet, anticipating.

### Stage 2: The Celebration (Climax)

- **Transition:** Immediate transition upon click.
- **Visual:**
  - Background flashes to a warm, celebratory gradient (Soft Pink/Peach/Lavender).
  - **Confetti Explosion:** A massive burst of confetti from the center (using `canvas-confetti`).
  - **Typography:** Giant, animated text appears: _"Happy Birthday, [Name]!"_ (using Framer Motion).
- **Audio:** A cheerful or romantic background track starts playing immediately (browser allows audio after user interaction).
- **Vibe:** Exciting, joyful, surprising.

### Stage 3: The Journey (Content)

- **Interaction:** User scrolls down from the hero section.
- **Sections:**
  1.  **Memory Lane:** A staggered grid of photos. Each photo reveals itself as the user scrolls (using `Reveal.tsx`). Captions appear on hover.
  2.  **The Letter:** A section resembling a handwritten letter on textured paper background. The text animates in sentence by sentence.
  3.  **The Gift:** A final interactive 3D-style CSS Gift Box. Clicking it opens the lid to reveal a "Digital Voucher" (e.g., "Good for one romantic dinner") or a final sweet message.

## 2. Technical Architecture

### Directory Structure

We will create a dedicated directory for components to keep `src/components` clean.

```
src/
├── app/
│   └── happy_birthday/
│       └── page.tsx        // Main orchestrator
├── components/
│   └── happy-birthday/     // Local components
│       ├── BirthdayHero.tsx    // Handles Intro & Climax states
│       ├── MemoryLane.tsx      // Photo gallery with Reveal
│       ├── Letter.tsx          // Text content
│       ├── GiftBox.tsx         // Final interactive element
│       └── BackgroundAudio.tsx // Audio manager
```

### State Management

The `page.tsx` will hold the high-level state of the experience:

```typescript
type Stage = "intro" | "celebration" | "content";
const [stage, setStage] = useState<Stage>("intro");
```

### Component Details

#### 1. `BirthdayHero.tsx`

- **Props:** `onOpen: () => void`
- **Logic:**
  - Render `SplashCursor` with dark background parameters initially.
  - On click:
    - Trigger `canvas-confetti`.
    - Change `SplashCursor` colors to bright/pastel.
    - Animate in the "Happy Birthday" text.
  - Use `framer-motion` for the text entrance (Scale + Fade).

#### 2. `MemoryLane.tsx`

- **Logic:**
  - Map through a list of photo objects `{ src, caption, rotation }`.
  - Use the existing `Reveal` component to fade them in as user scrolls.
  - Add slight random rotation to images for a scrapbook feel.

#### 3. `Letter.tsx`

- **Logic:**
  - Simple container with a nice serif font (e.g., 'Playfair Display' if available, or standard serif).
  - `Reveal` wrapper for smooth entrance.

#### 4. `GiftBox.tsx`

- **Logic:**
  - CSS-only or Framer Motion animated box.
  - State: `isOpen` (boolean).
  - On Click: Animate lid opening, float content up.

### Dependencies

- **Framer Motion:** Already installed.
- **Canvas Confetti:** Need to install.
  - `npm install canvas-confetti`
  - `npm install -D @types/canvas-confetti`

## 3. Implementation Plan (Todo List)

1.  **Setup:**

    - Install `canvas-confetti`.
    - Create component directory structure.
    - Gather dummy assets (placeholder images) or ask user for assets.

2.  **Core Implementation:**

    - **Step 1:** Create `BackgroundAudio` to handle music playback.
    - **Step 2:** Build `BirthdayHero` with the `SplashCursor` integration and State transition.
    - **Step 3:** Implement the Confetti logic.
    - **Step 4:** Build `MemoryLane` reusing `src/components/ui/Reveal.tsx`.
    - **Step 5:** Build `GiftBox` component.

3.  **Assembly:**

    - Assemble all components in `src/app/happy_birthday/page.tsx`.
    - Fine-tune animations and timing.

4.  **Refinement:**
    - Add responsive styles (ensure it looks good on mobile).
    - Test audio autoplay policies.

## 4. Visual Assets Needed

- **Audio File:** A `.mp3` file for background music (place in `public/music/`).
- **Images:** A set of photos for the memory lane (place in `public/images/birthday/`).
- **Font:** Ideally a Google Font like "Dancing Script" or "Playfair Display" for the letter (can be loaded via `next/font`).
