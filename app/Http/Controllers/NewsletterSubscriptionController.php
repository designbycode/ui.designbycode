<?php

namespace App\Http\Controllers;

use App\Models\NewsletterSubscription;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class NewsletterSubscriptionController extends Controller
{
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('newsletter_subscriptions', 'email')],
        ]);

        NewsletterSubscription::create($validated);

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Thanks for subscribing!']);

        return redirect()->back();
    }
}
