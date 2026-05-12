import { Head, router, usePage } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Auth } from '@/types';

declare global {
    interface Window {
        Paddle: any;
    }
}

export default function Pricing() {
    const { auth } = usePage<{ auth: Auth }>().props;

    const plans = [
        {
            name: 'Free',
            price: '$0',
            description: 'Essential features for everyone.',
            features: ['Basic access', 'Community support', 'Standard updates'],
            buttonText: 'Get Started',
            priceId: null,
        },
        {
            name: 'Pro',
            price: '$5',
            interval: '/month',
            description: 'Advanced features for power users.',
            features: ['Premium access', 'Priority support', 'Early access to features', 'Advanced analytics'],
            buttonText: 'Upgrade to Pro',
            priceId: import.meta.env.VITE_PADDLE_PRICE_PRO_MONTHLY || 'pro_monthly',
            featured: true,
        },
        {
            name: 'Pro Yearly',
            price: '$50',
            interval: '/year',
            description: 'Save with annual billing.',
            features: ['Premium access', 'Priority support', 'Early access to features', 'Advanced analytics', '2 months free'],
            buttonText: 'Upgrade to Pro Yearly',
            priceId: import.meta.env.VITE_PADDLE_PRICE_PRO_YEARLY || 'pro_yearly',
        },
    ];

    const handleCheckout = (priceId: string | null) => {
        if (!priceId) {
            router.get(auth.user ? '/dashboard' : '/register');
            return;
        }

        if (!auth.user) {
            router.get('/register');
            return;
        }

        router.post(route('subscription.checkout'), {
            price_id: priceId,
        });
    };

    return (
        <div className="py-24 sm:py-32">
            <Head title="Pricing" />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        Choose the right plan for you
                    </p>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
                    Simple, transparent pricing. No hidden fees.
                </p>
                <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
                    {plans.map((plan) => (
                        <Card key={plan.name} className={`flex flex-col justify-between ${plan.featured ? 'ring-2 ring-indigo-600' : ''}`}>
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="mt-4 flex items-baseline gap-x-2">
                                    <span className="text-5xl font-bold tracking-tight text-foreground">{plan.price}</span>
                                    {plan.interval && <span className="text-sm font-semibold leading-6 text-muted-foreground">{plan.interval}</span>}
                                </div>
                                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex gap-x-3">
                                            <Check className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    variant={plan.featured ? 'default' : 'outline'}
                                    onClick={() => handleCheckout(plan.priceId)}
                                >
                                    {plan.buttonText}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
