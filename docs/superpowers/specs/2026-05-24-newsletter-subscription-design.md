# Newsletter Subscription Modal

## Overview
Add a newsletter subscription feature with a dialog modal on the home page. Users click a "Subscribe" button in a dedicated section on the home page, fill in their name and email in a dialog, and receive a success toast.

## Backend

### Migration
- Table: `newsletter_subscriptions`
- Columns: `id`, `name` (varchar), `email` (varchar, unique), `created_at`, `updated_at`

### Model
- `App\Models\NewsletterSubscription`
- `$fillable`: `name`, `email`
- Casts: none needed
- Validation: name required string max 255, email required valid email unique

### Controller
- `App\Http\Controllers\NewsletterSubscriptionController`
- Single `store(Request)` method
- Validates name (required, string, max:255) and email (required, valid email, unique)
- Creates record and redirects back with flash success

### Route
- `POST /newsletter/subscribe` — named `newsletter.subscribe`

## Frontend

### Components

#### NewsletterSection
- A centered CTA section placed between Hero and the MusicPlayer on home.tsx
- Contains heading, description text, and a "Subscribe" Button
- Handles the open/close state of the dialog

#### NewsletterDialog
- shadcn `Dialog` component wrapping the form
- Uses Inertia's `<Form>` component with fields: name (text), email (email)
- Submit button with processing state
- On success: sonner toast "Thanks for subscribing!" + dialog auto-closes
- On error: inline field errors displayed

### Integration
- Import `NewsletterSection` into `home.tsx` and place below `<Hero />`

### Edge Cases
- **Duplicate email**: Server returns validation error, shown inline on email field
- **Network error**: Inertia `<Form>` handles this, user can retry
- **Empty fields**: HTML required + server validation
- **Already subscribed while form is open**: Handled by server-side unique validation

## Files to Create/Modify
- `database/migrations/xxxx_create_newsletter_subscriptions_table.php` (create)
- `app/Models/NewsletterSubscription.php` (create)
- `app/Http/Controllers/NewsletterSubscriptionController.php` (create)
- `routes/web.php` (add route)
- `resources/js/components/app/newsletter-section.tsx` (create)
- `resources/js/components/app/newsletter-dialog.tsx` (create)
- `resources/js/pages/home.tsx` (modify)
