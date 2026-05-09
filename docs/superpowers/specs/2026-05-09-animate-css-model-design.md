# Animation Model & Seeder for AnimateCSS

## Summary

Extract all 103 individual `animate-*` entries plus the `animate-all` aggregator from the `registries` table into a dedicated `animations` table, following the same extraction pattern used for themes.

## Files Created

1. `database/migrations/YYYY_MM_DD_HHMMSS_create_animations_table.php`
2. `app/Concerns/HasAnimation.php`
3. `app/Models/Animation.php`
4. `database/seeders/AnimationSeeder.php`

## Files Modified

1. `database/seeders/DatabaseSeeder.php` — add `AnimationSeeder::class` call

## Column Mapping (registry.json → Registries DB → Animations DB)

| registry.json | Registries column | Animations column |
|---|---|---|
| `name` | `name` | `name` (unique) |
| `title` | `title` | `title` |
| `description` | `description` | `description` |
| `author` | `author` | `author` |
| `meta` | `meta` (JSON) | `meta` (JSON) |
| `cssVars.theme` | `vars_theme` (JSON) | `css_vars` (JSON) |
| `css` | `css` (JSON) | `css` (JSON) |
| `registryDependencies` | `registryDependencies` (JSON) | `registryDependencies` (JSON) |
| — | `user_id` | `user_id` (required FK → users) |

## Migration

- **up():** Create `animations` table → `INSERT INTO animations SELECT ... FROM registries WHERE type = 'registry:style' AND meta->>'$.category' = 'animations'` → `DELETE` extracted rows from registries
- **down():** Re-insert all animation rows back to registries (`type = 'registry:style'`) → `DROP TABLE animations`

## Model

- `app/Models/Animation.php`
- `#[Fillable]`, `SoftDeletes`, `HasAnimation` trait, `belongsTo(User)`, `getRouteKeyName() → 'name'`, `casts()` for all JSON columns

## Concern

- `app/Concerns/HasAnimation.php`
- `ASSET_TYPES` constant: fade-in, fade-out, slide-in, slide-out, bounce, zoom, rotate, flip, back, light-speed, roll, etc.
- `toRegistry()` serializer for shadcn JSON round-trip
- `cssVars()` helper to read/write the `css_vars` attribute as a flat array
- Type guard methods: `isFadeIn()`, `isFadeOut()`, `isSlide()`, `isBounce()`, etc.

## Seeder

- `database/seeders/AnimationSeeder.php`
- Idempotency guard: `if (Animation::count() > 0)` → skip
- Hardcoded `animations(): array` with all 104 entries
- `user_id => 1`
- Console output for feedback
