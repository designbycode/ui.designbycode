<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function index()
    {
        return Inertia::render('pricing');
    }

    public function edit(Request $request)
    {
        return Inertia::render('settings/subscription');
    }

    public function checkout(Request $request)
    {
        $priceId = $request->input('price_id');

        if (! $priceId) {
            return back()->with('error', 'Please select a plan.');
        }

        return $request->user()->checkout($priceId)
            ->returnTo(route('dashboard'));
    }

    public function cancel(Request $request)
    {
        $subscription = $request->user()->subscription();

        if (! $subscription) {
            return back()->with('error', 'You do not have an active subscription.');
        }

        $subscription->cancel();

        return back()->with('status', 'Your subscription has been cancelled.');
    }

    public function resume(Request $request)
    {
        $subscription = $request->user()->subscription();

        if (! $subscription) {
            return back()->with('error', 'You do not have a subscription to resume.');
        }

        $subscription->resume();

        return back()->with('status', 'Your subscription has been resumed.');
    }
}
