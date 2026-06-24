import {
    Calendar as CalendarIcon,
    Users,
    ArrowRight,
    Loader2,
    Sparkles,
    CheckCircle2,
} from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export function BookingForm({
    pricePerNight = 120,
    cleaningFee = 45,
    serviceFee = 25,
}: {
    pricePerNight?: number;
    cleaningFee?: number;
    serviceFee?: number;
}) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(2);
    const [isLoading, setIsLoading] = useState(false);
    const [isBooked, setIsBooked] = useState(false);

    const nights = useMemo(() => {
        if (!checkIn || !checkOut) {
            return 0;
        }

        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return isNaN(diffDays) ? 0 : diffDays;
    }, [checkIn, checkOut]);

    const totalCost = useMemo(() => {
        if (nights === 0) {
            return 0;
        }

        return pricePerNight * nights + cleaningFee + serviceFee;
    }, [nights, pricePerNight, cleaningFee, serviceFee]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (!checkIn || !checkOut || nights <= 0) {
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsBooked(true);
        }, 1500);
    };

    const resetBooking = () => {
        setIsBooked(false);
        setCheckIn('');
        setCheckOut('');
        setGuests(2);
    };

    return (
        <Card className="relative mx-auto w-full max-w-md overflow-hidden border border-border/40 bg-card/40 shadow-2xl backdrop-blur-md transition-all duration-300">
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute top-0 right-0 h-36 w-36 rounded-full bg-primary/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-chart-2/5 blur-2xl" />

            <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="font-sans text-xl font-bold">
                            Book Your Stay
                        </CardTitle>
                        <CardDescription className="mt-0.5 text-xs">
                            Check availability and secure your dates
                        </CardDescription>
                    </div>
                    <div className="text-right">
                        <span className="font-sans text-xl font-extrabold text-foreground">
                            ${pricePerNight}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {' '}
                            / night
                        </span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-4">
                {isBooked ? (
                    <div className="animate-fadeIn space-y-4 py-8 text-center">
                        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-chart-2/10 text-chart-2 shadow-inner">
                            <CheckCircle2 className="size-8" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-sans text-lg font-bold text-foreground">
                                Dates are Available!
                            </h3>
                            <p className="mx-auto max-w-xs text-xs text-muted-foreground">
                                We have temporarily reserved your stay from{' '}
                                <span className="font-semibold text-foreground">
                                    {checkIn}
                                </span>{' '}
                                to{' '}
                                <span className="font-semibold text-foreground">
                                    {checkOut}
                                </span>{' '}
                                ({nights} nights) for{' '}
                                <span className="font-semibold text-foreground">
                                    {guests} guests
                                </span>
                                .
                            </p>
                        </div>
                        <div className="flex justify-center gap-2 pt-2">
                            <Button
                                onClick={resetBooking}
                                variant="outline"
                                size="sm"
                            >
                                Change Dates
                            </Button>
                            <Button
                                className="bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
                                size="sm"
                            >
                                Proceed to Payment
                            </Button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="flex items-center gap-1 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                                    <CalendarIcon className="size-3 text-primary" />
                                    Check In
                                </label>
                                <input
                                    type="date"
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    className="w-full rounded-lg border border-border/40 bg-muted/40 px-3 py-2 text-xs text-foreground transition-all hover:bg-muted/60 focus:border-primary/50 focus:outline-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="flex items-center gap-1 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                                    <CalendarIcon className="size-3 text-primary" />
                                    Check Out
                                </label>
                                <input
                                    type="date"
                                    required
                                    min={
                                        checkIn ||
                                        new Date().toISOString().split('T')[0]
                                    }
                                    value={checkOut}
                                    onChange={(e) =>
                                        setCheckOut(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-border/40 bg-muted/40 px-3 py-2 text-xs text-foreground transition-all hover:bg-muted/60 focus:border-primary/50 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="flex items-center gap-1 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                                <Users className="size-3 text-primary" />
                                Guests
                            </label>
                            <div className="flex items-center justify-between rounded-lg border border-border/40 bg-muted/20 px-3 py-1.5">
                                <span className="text-xs font-semibold">
                                    {guests} {guests === 1 ? 'Guest' : 'Guests'}
                                </span>
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setGuests(Math.max(1, guests - 1))
                                        }
                                        className="size-7 cursor-pointer rounded border border-border/40 bg-muted/60 text-xs font-bold select-none hover:border-border hover:bg-muted"
                                    >
                                        -
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setGuests(Math.min(6, guests + 1))
                                        }
                                        className="size-7 cursor-pointer rounded border border-border/40 bg-muted/60 text-xs font-bold select-none hover:border-border hover:bg-muted"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={
                                isLoading ||
                                !checkIn ||
                                !checkOut ||
                                nights <= 0
                            }
                            className="group relative mt-2 w-full overflow-hidden bg-primary font-bold tracking-wide text-primary-foreground transition-all duration-300 hover:bg-primary/95"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="size-4 animate-spin" />
                                    Checking Rooms...
                                </span>
                            ) : (
                                <span className="flex items-center gap-1">
                                    Check Availability
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </span>
                            )}
                        </Button>
                    </form>
                )}

                {nights > 0 && !isBooked && (
                    <div className="animate-fadeIn space-y-2.5 border-t border-border/40 pt-4">
                        <h4 className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                            Price Details
                        </h4>
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>
                                    ${pricePerNight} x {nights} nights
                                </span>
                                <span className="font-semibold text-foreground">
                                    ${pricePerNight * nights}
                                </span>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Cleaning fee</span>
                                <span className="font-semibold text-foreground">
                                    ${cleaningFee}
                                </span>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Service fee</span>
                                <span className="font-semibold text-foreground">
                                    ${serviceFee}
                                </span>
                            </div>
                            <div className="flex justify-between border-t border-border/20 pt-2 text-sm font-bold text-foreground">
                                <span className="flex items-center gap-1">
                                    Total
                                    <Badge
                                        variant="outline"
                                        className="border-primary/20 bg-primary/5 px-1 py-0 font-mono text-[9px] text-primary"
                                    >
                                        Best Price
                                    </Badge>
                                </span>
                                <span>${totalCost}</span>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>

            <CardFooter className="relative z-10 flex items-center justify-center gap-1.5 border-t border-border/20 bg-muted/15 px-6 py-3 text-[10px] text-muted-foreground">
                <Sparkles className="size-3.5 text-amber-500" />
                <span>Free cancellation up to 48 hours before check-in</span>
            </CardFooter>
        </Card>
    );
}

export default BookingForm;
