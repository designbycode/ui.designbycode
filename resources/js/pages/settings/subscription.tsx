import { Head, Link, router, usePage } from '@inertiajs/react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { pricing } from '@/routes';
import { cancel, edit, resume } from '@/routes/subscription';
import type { Auth } from '@/types';

export default function Subscription() {
    const { auth } = usePage<{ auth: Auth }>().props;
    const { user } = auth;

    const handleCancel = () => {
        if (confirm('Are you sure you want to cancel your subscription?')) {
            router.post(cancel.url());
        }
    };

    const handleResume = () => {
        router.post(resume.url());
    };

    return (
        <>
            <Head title="Subscription" />

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Subscription"
                    description="Manage your subscription and billing"
                />

                <Card>
                    <CardHeader>
                        <CardTitle>Current Plan</CardTitle>
                        <CardDescription>
                            {user.is_subscribed
                                ? `You are currently subscribed to the ${user.plan_name} plan.`
                                : 'You are currently on the Free plan.'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {user.is_subscribed && (
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    {user.on_grace_period
                                        ? `Your subscription will end on ${new Date(user.ends_at!).toLocaleDateString()}.`
                                        : 'Your subscription is active.'}
                                </p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex gap-4">
                        {!user.is_subscribed && (
                            <Button asChild>
                                <Link href={pricing()}>Upgrade Plan</Link>
                            </Button>
                        )}

                        {user.is_subscribed && !user.on_grace_period && (
                            <Button
                                variant="destructive"
                                onClick={handleCancel}
                            >
                                Cancel Subscription
                            </Button>
                        )}

                        {user.is_subscribed && user.on_grace_period && (
                            <Button onClick={handleResume}>
                                Resume Subscription
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}

Subscription.layout = {
    breadcrumbs: [
        {
            title: 'Subscription',
            href: edit.url(),
        },
    ],
};
