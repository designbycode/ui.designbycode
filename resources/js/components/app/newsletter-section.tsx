import { Mail } from 'lucide-react';
import { useState } from 'react';
import NewsletterDialog from '@/components/app/newsletter-dialog';
import { Button } from '@/components/ui/button';

function NewsletterSection() {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <section className="relative isolate my-16 flex flex-col items-center gap-4 overflow-clip rounded-md border border-border p-8 text-center md:p-12">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="size-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Stay in the loop
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
                Get notified about new components, themes, and features before
                anyone else.
            </p>
            <Button size="lg" onClick={() => setDialogOpen(true)}>
                <Mail data-icon="inline-start" />
                Subscribe to Newsletter
            </Button>

            <NewsletterDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        </section>
    );
}

export default NewsletterSection;
