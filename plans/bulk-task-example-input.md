# Example Bulk Task Input

This file contains example markdown input for testing the bulk task system.

## Example 1: Card Game Icons

```markdown
# Card Image Prompts

## Prefix Prompt

**Prefix:** Icon white background

## Card Prompts

### Movement & Speed

**Quick Feet**

- **Level 1:** Red sneakers with tiny white wings
- **Level 2:** Blue running shoes with golden wings and wind swirls
- **Level 3:** Lightning bolt sneakers with aurora trails

**Sprint**

- **Level 1:** Green athletic shoes with speed lines
- **Level 2:** Silver track shoes with flame details
- **Level 3:** Platinum racing boots with sonic boom effects

### Strength & Power

**Mighty Fist**

- **Level 1:** Bronze boxing glove with power sparks
- **Level 2:** Steel gauntlet with energy aura
- **Level 3:** Diamond-encrusted power fist with shockwaves

**Iron Shield**

- **Level 1:** Wooden shield with metal rim
- **Level 2:** Steel shield with glowing runes
- **Level 3:** Titanium shield with force field effect

### Magic & Elements

**Fire Spell**

- **Level 1:** Small flame orb with ember particles
- **Level 2:** Blazing fireball with heat distortion
- **Level 3:** Inferno sphere with phoenix feathers

**Ice Blast**

- **Level 1:** Snowflake crystal with frost
- **Level 2:** Ice shard with frozen mist
- **Level 3:** Glacial storm with aurora lights
```

## Example 2: UI Button Styles

```markdown
# UI Button Designs

Prefix: Modern 3D button design with soft shadows and gradients

### Primary Buttons

- **Play Button:** Green gradient with play icon, rounded corners, glossy finish
- **Shop Button:** Purple gradient with shopping cart icon, premium feel
- **Settings Button:** Gray gradient with gear icon, subtle metallic look

### Secondary Buttons

- **Help Button:** Blue gradient with question mark, friendly appearance
- **Exit Button:** Red gradient with X icon, clear warning color
- **Menu Button:** Orange gradient with hamburger icon, warm inviting style
```

## Example 3: Character Avatars

```markdown
# Fantasy Character Avatars

Prefix: Cartoon-style character portrait, circular frame, vibrant colors

### Warriors

- **Knight:** Shining armor, noble expression, blue background
- **Barbarian:** Battle scars, fierce look, red background
- **Samurai:** Traditional armor, calm demeanor, purple background

### Mages

- **Fire Mage:** Red robes, glowing eyes, flame aura
- **Ice Mage:** Blue robes, frost crown, snowflake effects
- **Lightning Mage:** Yellow robes, electric hair, spark effects
```

## Example 4: Achievement Badges

```markdown
# Achievement Badge Icons

Prefix: Gold medal badge with ribbon, shiny metallic finish

- **First Victory:** Trophy with "1st" engraving, emerald gem
- **Speed Demon:** Lightning bolt symbol, sapphire gem
- **Perfect Score:** Star with "100%" text, ruby gem
- **Combo Master:** Chain links symbol, amethyst gem
- **Treasure Hunter:** Chest with coins, topaz gem
```

## Example 5: Minimal Icons

```markdown
# Minimal Line Icons

Prefix: Simple line art icon, monochrome, 2px stroke weight

- **Home:** House outline with pitched roof
- **Search:** Magnifying glass with circular lens
- **User:** Person silhouette with circular head
- **Heart:** Heart shape outline, symmetrical
- **Star:** Five-pointed star outline
- **Bell:** Notification bell with clapper
- **Lock:** Padlock with keyhole
- **Mail:** Envelope with flap
```

## Testing Tips

1. **Copy entire examples** including the prefix section
2. **Paste into bulk task creation page**
3. **Click "Parse with AI"** to extract tasks
4. **Review parsed tasks** before creating batch
5. **Adjust configuration** as needed (delay, retries, etc.)
6. **Create batch** and monitor execution

## Expected Results

- Each level/item should be parsed as a separate task
- Prefix should be automatically combined with specific prompts
- Category and level metadata should be extracted
- Tasks should be ordered sequentially
- Image generation should use the configured model and settings
