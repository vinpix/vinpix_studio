# 3D shadows

- Canvas receives `settings.shadowEnabled` directly, keeping renderer configuration in sync with the checkbox across rerenders.
- Sunlight and its shadow camera are configured in a layout effect before the first rendered frame.
- `setShadowResolution` checks the allocated render target's width and height, disposes mismatched targets and lets Three.js allocate a replacement. Comparing only the previous requested setting misses a texture allocated at the engine's default size before setup.
- The lighting panel reports the allocated texture width, rather than only the requested resolution.
- Models loaded by `gltfCache.ts` cast and receive shadows; the ground also receives shadows.
- Balanced defaults use environment intensity 0.7, ambient 0.4, exposure 1.02 and shadow intensity 0.6. Saturation defaults to 1.2 and is adjustable in the lighting panel; a CSS filter applies only to the 3D Canvas, after tone mapping. Sun intensity stays at 2 to preserve surface detail while indirect light brightens shaded faces.
- Saved v2/v3 settings migrate to v4: values matching the former defaults receive the new brightness values; customized values are preserved. Subsequent v4 loads retain all saved choices.

## Validation

- `node --import tsx --test tests/game-design-shadows.test.ts` covers initial setup, stale default-sized textures, matching texture reuse and resolution changes.
- Browser checks: open 3D after reload with default lighting; confirm object shadows on the floor; toggle shadows off/on; switch resolution and return to 2048.
