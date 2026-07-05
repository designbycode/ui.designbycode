import {
    Star,
    MapPin,
    Users,
    Wifi,
    Coffee,
    Tv,
    Shield,
    Compass,
    Calendar,
    Sparkles,
    Check,
    ChevronRight,
} from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BookingForm } from '../booking-form/booking-form';

export function PropertyDetail() {
    const amenities = [
        {
            name: 'High-speed Wi-Fi',
            desc: '500 Mbps connection',
            icon: <Wifi className="size-4 text-primary" />,
        },
        {
            name: 'Chef Kitchen',
            desc: 'Professional stove & cookware',
            icon: <Coffee className="size-4 text-primary" />,
        },
        {
            name: 'Smart Cable TV',
            desc: 'Netflix, Prime & sound system',
            icon: <Tv className="size-4 text-primary" />,
        },
        {
            name: 'Protected Safety',
            desc: 'Gated entrance & smart lock',
            icon: <Shield className="size-4 text-primary" />,
        },
        {
            name: 'Panoramic Balcony',
            desc: 'Overlooks ocean & sunset view',
            icon: <Compass className="size-4 text-primary" />,
        },
        {
            name: 'Wellness Bath',
            desc: 'Rain shower & cedar hot tub',
            icon: <Sparkles className="size-4 text-primary" />,
        },
    ];

    const highlights = [
        'Selected in "Top 100 Stays" Worldwide by Travel Guide',
        'Direct sand access, just 20 meters to the beach',
        'Exceptional host with average response time of 5 minutes',
    ];

    return (
        <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-6">
            {/* Top Header section */}
            <div className="space-y-2 border-b border-border/20 pb-6">
                <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-chart-2 font-mono text-[9px] tracking-wider text-primary-foreground uppercase hover:bg-chart-2/90">
                        ★ Top Rated
                    </Badge>
                    <Badge
                        variant="outline"
                        className="text-[9px] tracking-wider uppercase"
                    >
                        Eleuthera, Bahamas
                    </Badge>
                </div>
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <h2 className="font-sans text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
                        The Azure Wave Villa
                    </h2>
                    <div className="flex shrink-0 items-center gap-1.5 text-sm">
                        <Star className="size-4 fill-chart-4 text-chart-4" />
                        <span className="font-extrabold">4.98</span>
                        <span className="text-muted-foreground">
                            (86 reviews)
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="cursor-pointer font-semibold text-primary underline">
                            Superhost
                        </span>
                    </div>
                </div>
            </div>

            {/* Premium Vector Mosaic Gallery */}
            <div className="grid h-[300px] grid-cols-1 gap-3 overflow-hidden rounded-xl border border-border/20 shadow-lg md:h-[400px] md:grid-cols-4">
                <div className="relative flex h-full items-center justify-center bg-gradient-to-tr from-chart-3/95 via-chart-3/80 to-primary/40 p-6 text-center text-white md:col-span-2">
                    <div className="absolute inset-0 bg-black/10 transition-colors hover:bg-black/20" />
                    <span className="relative z-10 font-bebas-neue! text-3xl tracking-wider">
                        Ocean Front Terrace
                    </span>
                    <div className="absolute bottom-4 left-4 font-mono text-xs opacity-80">
                        Living Area & Pool
                    </div>
                </div>
                <div className="grid h-full grid-rows-2 gap-3 md:col-span-2">
                    <div className="grid h-full grid-cols-2 gap-3">
                        <div className="relative flex items-center justify-center bg-gradient-to-br from-chart-2/95 via-chart-2/80 to-chart-3 text-center text-white">
                            <div className="absolute inset-0 bg-black/10" />
                            <span className="relative z-10 text-xs font-bold">
                                Infinity Pool
                            </span>
                        </div>
                        <div className="relative flex items-center justify-center bg-gradient-to-br from-chart-4/95 via-chart-4/80 to-primary/50 text-center text-white">
                            <div className="absolute inset-0 bg-black/10" />
                            <span className="relative z-10 text-xs font-bold">
                                Master Bed Suite
                            </span>
                        </div>
                    </div>
                    <div className="grid h-full grid-cols-2 gap-3">
                        <div className="relative flex items-center justify-center bg-gradient-to-tr from-chart-1/95 via-chart-1/80 to-chart-5 text-center text-white">
                            <div className="absolute inset-0 bg-black/10" />
                            <span className="relative z-10 text-xs font-bold">
                                Wellness Bath
                            </span>
                        </div>
                        <div className="relative flex items-center justify-center bg-gradient-to-tr from-chart-3/95 via-chart-3/80 to-chart-2 text-center text-white">
                            <div className="absolute inset-0 bg-black/10" />
                            <span className="relative z-10 text-xs font-bold">
                                Direct Sand Path
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Split Details Section */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Left Side: Property details */}
                <div className="space-y-8 lg:col-span-2">
                    {/* Host Info */}
                    <div className="flex items-center justify-between border-b border-border/20 pb-6">
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-foreground">
                                Entire villa hosted by Sarah
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                6 guests • 3 bedrooms • 5 beds • 3 baths
                            </p>
                        </div>
                        <div className="relative">
                            <div className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-gradient-to-tr from-chart-2 to-chart-3 font-extrabold text-white shadow-inner">
                                S
                            </div>
                            <div className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full border-2 border-background bg-chart-2 text-primary-foreground">
                                <Check className="size-3 stroke-[3]" />
                            </div>
                        </div>
                    </div>

                    {/* Highlights list */}
                    <div className="space-y-3">
                        <h4 className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                            Key Highlights
                        </h4>
                        <div className="space-y-2.5">
                            {highlights.map((h, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground"
                                >
                                    <Sparkles className="mt-0.5 size-4.5 shrink-0 text-chart-4" />
                                    <span>{h}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-3 border-t border-border/20 pt-6">
                        <h4 className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                            About This Guesthouse
                        </h4>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                            Welcome to The Azure Wave Villa, where sea meets
                            luxury. Elevated above the sparkling waves of
                            Eleuthera, our guesthouse features structural open
                            ceilings, natural limestone walls, and
                            floor-to-ceiling glass panel windows that frame
                            magnificent panoramic views of Aspire Bay.
                        </p>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                            Perfect for families or groups looking for private
                            beach access combined with high-end modern comforts.
                            Step onto the sunset terrace to enjoy our heated
                            infinity pool, fire up the outdoor chef grill, or
                            follow our private rope path down to direct pink
                            sand shores.
                        </p>
                    </div>

                    {/* Amenities list */}
                    <div className="space-y-3 border-t border-border/20 pt-6">
                        <h4 className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                            Premium Amenities
                        </h4>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {amenities.map((amenity, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start gap-3 rounded-lg border border-border/30 bg-muted/10 p-3 transition-all duration-300 hover:bg-muted/20"
                                >
                                    <div className="flex size-8 shrink-0 items-center justify-center rounded bg-primary/10">
                                        {amenity.icon}
                                    </div>
                                    <div className="min-w-0 space-y-0.5">
                                        <h5 className="truncate text-xs font-bold text-foreground">
                                            {amenity.name}
                                        </h5>
                                        <p className="truncate text-[10px] text-muted-foreground">
                                            {amenity.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Booking widget */}
                <div className="relative">
                    <div className="sticky top-24">
                        <BookingForm
                            pricePerNight={280}
                            cleaningFee={65}
                            serviceFee={35}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyDetail;
