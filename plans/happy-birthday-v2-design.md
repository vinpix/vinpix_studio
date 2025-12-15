# Happy Birthday V2 (Ultimate Edition) - Design & Technical Spec

This document outlines the upgrade plan for the Happy Birthday experience. The goal is to move from a "digital card" to an "immersive interactive story".

## 1. User Experience Flow

The experience is transformed into a linear, cinematic journey:

1.  **The Dark Room (Intro):** User enters a dark screen. A single spotlight follows the cursor.
2.  **The Candle Ritual:** A 3D/2.5D cake appears in the darkness. The user must "blow out" the candles (via microphone or long-press) to start the party.
3.  **The Explosion (Transition):** When candles die, smoke rises, lights turn on, confetti explodes, and the song begins.
4.  **The Journey (Timeline):** User scrolls through a parallax timeline of memories, not just a grid.
5.  **The Challenge (Quiz):** User encounters a lock. They must answer 3 questions about the relationship to proceed.
6.  **The Words (Letter):** A heartfelt letter types itself out with soft mechanical sounds.
7.  **The Atmosphere (Floating Wishes):** Throughout the "light" phase, wishes float in the background like bubbles.
8.  **The Prize (Gift Box):** The final reward after passing the quiz.

---

## 2. Detailed Feature Specs

### Feature A: Interactive Cake & Candle Blowing

- **Visual:** A CSS-3D or Canvas-based cake with flickering flames.
- **Interaction:**
  - **Microphone Mode:** Use `AudioContext` and `getUserMedia` to detect input volume. If volume > threshold (blowing sound), reduce flame opacity/scale.
  - **Fallback:** Long-press mouse button to "breath in and blow".
- **Success State:** Flames extinguish -> Smoke particle effect (Canvas) -> Scene transition to "Celebration".

### Feature B: Relationship Timeline (Parallax)

- **Structure:** A vertical line connects memory nodes.
- **Parallax:** Images and text move at different speeds.
  - Background elements (shapes, dates) move slower than foreground images.
- **Content:**
  - _Date:_ "The First Date"
  - _Image:_ Polaroids that rotate slightly on scroll.
  - _Description:_ Short text.

### Feature C: Love Quiz Mini-Game

- **UI:** A modal or embedded card blocking the final gift.
- **Logic:**
  - 3 Questions.
  - Incorrect answer: Shake effect, funny error message ("Wrong! Do you even know me? 😜").
  - Correct answer: Confetti pop, proceed to next.
  - All correct: Unlock the Gift Box.

### Feature D: Floating Wishes

- **Visual:** Background layer behind the main content.
- **Elements:** Text bubbles ("Love you!", "Happy 25th", "Best wishes") + Icons (Hearts, Stars).
- **Animation:** Float upward slowly with slight horizontal drift (sine wave motion).

### Feature E: Advanced Typewriter

- **Visual:** Monospace or Typewriter font.
- **Animation:** Text appears character by character.
- **Audio:** Play a short mechanical "click" sample on each character render (throttled to avoid noise).

---

## 3. Technical Architecture

### Directory Structure Updates

```
src/components/birthday/
├── v2/
│   ├── CakeStage.tsx       // The dark room + cake + mic logic
│   ├── Timeline.tsx        // Parallax scroll container
│   ├── TimelineNode.tsx    // Individual memory item
│   ├── LoveQuiz.tsx        // The quiz game logic
│   ├── FloatingWishes.tsx  // Background particle system
│   ├── Typewriter.tsx      // Reusable text component
│   └── AudioManager.tsx    // Enhanced audio controller (music + sfx)
```

### Component Logic

#### 1. `CakeStage.tsx`

- **State:** `flameStrength` (0-100), `candlesLit` (boolean).
- **Audio API:**
  ```typescript
  // Pseudocode for blowing detection
  const audioContext = new AudioContext();
  const analyser = audioContext.createAnalyser();
  const microphone = audioContext.createMediaStreamSource(stream);
  microphone.connect(analyser);
  // Loop check average volume...
  ```

#### 2. `Timeline.tsx`

- **Dependencies:** `framer-motion` for `useScroll` and `useTransform`.
- **Implementation:**
  - Map through data.
  - `y = useTransform(scrollYProgress, [0, 1], [0, -50])` for parallax.

#### 3. `LoveQuiz.tsx`

- **State:** `currentQuestionIndex`, `isLocked` (true/false).
- **Data Structure:**
  ```typescript
  type Question = {
    text: string;
    options: string[];
    correctIndex: number;
  };
  ```

#### 4. `FloatingWishes.tsx`

- **Implementation:**
  - Can use `canvas-confetti` (custom shapes) OR pure CSS animations for better performance with text.
  - Recommendation: CSS Animations with `framer-motion` for accessible DOM elements (text).

### Dependencies

- **Audio:** Native Web Audio API (no extra lib needed).
- **Animation:** `framer-motion` (existing).
- **Particles:** `canvas-confetti` (existing).

---

## 4. Implementation Plan (Todo List)

1.  **Refactor:** Move existing V1 components aside or integrate into V2 structure if reusable.
2.  **Phase 1: The Cake (Core Interaction):**
    - Build `CakeStage` UI.
    - Implement Microphone detection hook.
    - Create "Flame extinguishes" animation.
3.  **Phase 2: The Timeline:**
    - Create `Timeline` component with dummy data.
    - Add Parallax effects using Framer Motion.
4.  **Phase 3: The Quiz:**
    - Build `LoveQuiz` component.
    - Gate the `GiftBox` behind the quiz.
5.  **Phase 4: Atmosphere:**
    - Implement `FloatingWishes`.
    - Add `Typewriter` effect to the Letter.
6.  **Phase 5: Audio Polish:**
    - Add SFX (blowing wind, typewriter clicks, quiz success/fail).

## 5. Assets Needed

- **SFX:** `blow_wind.mp3`, `typewriter_click.mp3`, `correct.mp3`, `wrong.mp3`.
- **Images:** Specific photos for the timeline.
