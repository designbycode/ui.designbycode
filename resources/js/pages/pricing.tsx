import { useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import MainWrapper from '@/layouts/main/main-wrapper';
import MainLayout from '@/layouts/main-layout';
import { dashboard, register } from '@/routes';
import { checkout } from '@/routes/subscription';
import type { Auth } from '@/types';

declare global {
    interface Window {
        Paddle: any;
    }
}

export default function Pricing() {
    const { auth, checkout: checkoutData } = usePage<{ auth: Auth; checkout?: Record<string, unknown> }>().props;

    useEffect(() => {
        if (checkoutData) {
            window.Paddle.Checkout.open(checkoutData);
        }
    }, [checkoutData]);

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
            features: [
                'Premium access',
                'Priority support',
                'Early access to features',
                'Advanced analytics',
            ],
            buttonText: 'Upgrade to Pro',
            priceId:
                import.meta.env.VITE_PADDLE_PRICE_PRO_MONTHLY || 'pro_monthly',
            featured: true,
        },
        {
            name: 'Pro Yearly',
            price: '$50',
            interval: '/year',
            description: 'Save with annual billing.',
            features: [
                'Premium access',
                'Priority support',
                'Early access to features',
                'Advanced analytics',
                '2 months free',
            ],
            buttonText: 'Upgrade to Pro Yearly',
            priceId:
                import.meta.env.VITE_PADDLE_PRICE_PRO_YEARLY || 'pro_yearly',
        },
    ];

    const handleCheckout = (priceId: string | null) => {
        if (!priceId) {
            router.get(auth.user ? dashboard.url() : register.url());

            return;
        }

        if (!auth.user) {
            router.get(register.url());

            return;
        }

        router.post(checkout.url(), {
            price_id: priceId,
        });
    };

    return (
        <div className="py-24 sm:py-32">
            <Head title="Pricing" />
            <MainWrapper>
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base leading-7 font-semibold text-primary">
                        Pricing
                    </h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        Choose the right plan for you
                    </p>
                </div>
                <p className="mx-auto my-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
                    Simple, transparent pricing. No hidden fees.
                </p>
                <div className="isolate mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
                    {plans.map((plan) => (
                        <Card
                            key={plan.name}
                            className={`flex flex-col justify-between ${plan.featured ? 'ring-2 ring-primary' : ''}`}
                        >
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">
                                    {plan.name}
                                </CardTitle>
                                <CardDescription>
                                    {plan.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="mt-4 flex items-baseline gap-x-2">
                                    <span className="text-5xl font-bold tracking-tight text-foreground">
                                        {plan.price}
                                    </span>
                                    {plan.interval && (
                                        <span className="text-sm leading-6 font-semibold text-muted-foreground">
                                            {plan.interval}
                                        </span>
                                    )}
                                </div>
                                <ul
                                    role="list"
                                    className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground"
                                >
                                    {plan.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex gap-x-3"
                                        >
                                            <Check
                                                className="h-6 w-5 flex-none text-primary"
                                                aria-hidden="true"
                                            />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    variant={
                                        plan.featured ? 'default' : 'outline'
                                    }
                                    onClick={() => handleCheckout(plan.priceId)}
                                >
                                    {plan.buttonText}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </MainWrapper>
        </div>
    );
}

Pricing.layout = MainLayout;
Pricing.displayName = 'Pricing';
