import { Form } from '@inertiajs/react';
import { Mail } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { subscribe } from '@/routes/newsletter';

interface NewsletterDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

function NewsletterDialog({ open, onOpenChange }: NewsletterDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Subscribe to Newsletter</DialogTitle>
                    <DialogDescription>
                        Stay up to date with the latest components, themes, and
                        updates.
                    </DialogDescription>
                </DialogHeader>

                <Form
                    action={subscribe.url()}
                    method="post"
                    onSuccess={() => onOpenChange(false)}
                    className="flex flex-col gap-4"
                >
                    {({ errors, processing }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="newsletter-name">Name</Label>
                                <Input
                                    id="newsletter-name"
                                    name="name"
                                    type="text"
                                    required
                                    autoFocus
                                    placeholder="Your name"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="newsletter-email">Email</Label>
                                <Input
                                    id="newsletter-email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full"
                            >
                                {processing && <Spinner />}
                                <Mail data-icon="inline-start" />
                                Subscribe
                            </Button>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default NewsletterDialog;
