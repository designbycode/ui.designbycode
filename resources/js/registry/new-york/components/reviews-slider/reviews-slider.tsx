import React, { useState } from 'react';
import {
    Star,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Calendar,
    Sparkles,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';

// Import Swiper styles
import 'swiper/css';

interface Testimonial {
    id: string;
    author: string;
    avatar: string;
    date: string;
    rating: number;
    comment: string;
    verified: boolean;
    type: string;
}

const REVIEWS_DATA: Testimonial[] = [
    {
        id: '1',
        author: 'Marcus K.',
        avatar: 'M',
        date: 'June 2026',
        rating: 5,
        comment:
            'This was by far the best rental space we have reserved. The facilities were clean, and the layout made it extremely easy to host group sessions. Sarah was an amazing host, replying to our queries within minutes. Highly recommended!',
        verified: true,
        type: 'Group stay',
    },
    {
        id: '2',
        author: 'Elena R.',
        avatar: 'E',
        date: 'May 2026',
        rating: 5,
        comment:
            'Absolutely stunning views. We woke up every morning to panoramic ocean vistas. The space is extremely modern and well-equipped with premium appliances. We loved the smart-room automation. Will definitely book again next year.',
        verified: true,
        type: 'Premium booking',
    },
    {
        id: '3',
        author: 'David P.',
        avatar: 'D',
        date: 'April 2026',
        rating: 4.8,
        comment:
            'Clean, peaceful, and beautifully designed. The cedar hot tub and outdoor fireplace in the pines cabin were perfect for relaxing after a long day of hiking. The check-in process was smooth via smart lock.',
        verified: true,
        type: 'Solo booking',
    },
];

export function ReviewsSlider() {
    const [swiper, setSwiper] = useState<SwiperClass | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const nextReview = () => {
        swiper?.slideNext();
    };

    const prevReview = () => {
        swiper?.slidePrev();
    };

    const goToReview = (index: number) => {
        swiper?.slideTo(index);
    };

    const ratings = [
        { label: 'Cleanliness', value: 4.9 },
        { label: 'Accuracy', value: 4.8 },
        { label: 'Communication', value: 5.0 },
        { label: 'Location', value: 4.9 },
        { label: 'Value', value: 4.7 },
    ];

    const getPriorityBadge = (rating: number) => {
        return (
            <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`size-4.5 ${i < Math.floor(rating) ? 'fill-current' : 'opacity-30'}`}
                    />
                ))}
                <span className="ml-1.5 text-xs font-bold text-foreground">
                    {rating} Rating
                </span>
            </div>
        );
    };

    return (
        <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-4">
            {/* Reviews Header and Stats */}
            <div className="grid grid-cols-1 items-center gap-6 border-b border-border/20 pb-6 md:grid-cols-3">
                <div className="space-y-2 text-center select-none md:text-left">
                    <h3 className="text-xl font-bold tracking-tight">
                        Client Testimonials
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        What our customers say about their experiences
                    </p>
                    <div className="mt-1 flex items-center justify-center gap-2 md:justify-start">
                        <span className="text-3xl font-extrabold text-foreground">
                            4.92
                        </span>
                        <div className="flex flex-col text-left">
                            <div className="flex items-center text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="size-3.5 fill-current"
                                    />
                                ))}
                            </div>
                            <span className="text-[10px] text-muted-foreground">
                                Based on 280+ ratings
                            </span>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 select-none md:col-span-2">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {ratings.map((rate) => (
                            <div
                                key={rate.label}
                                className="flex flex-col gap-1 rounded-lg border border-border/40 bg-card/15 p-2.5"
                            >
                                <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                                    {rate.label}
                                </span>
                                <div className="flex items-center gap-2">
                                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                                        <div
                                            className="h-full bg-primary"
                                            style={{
                                                width: `${(rate.value / 5) * 100}%`,
                                            }}
                                        />
                                    </div>
                                    <span className="font-mono text-xs font-bold">
                                        {rate.value}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Interactive Swiper Card Slider */}
            <div className="relative mx-auto w-full max-w-2xl">
                <Swiper
                    onSwiper={setSwiper}
                    onSlideChange={(s) => setActiveIndex(s.activeIndex)}
                    className="w-full"
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={false}
                >
                    {REVIEWS_DATA.map((review) => (
                        <SwiperSlide key={review.id} className="px-1 py-2">
                            <Card className="overflow-hidden border border-border/40 bg-card/25 p-6 shadow-lg backdrop-blur-xs transition-all duration-300 select-none md:p-8">
                                <div className="absolute top-4 right-4 text-primary/10">
                                    <Sparkles className="size-16" />
                                </div>

                                <CardContent className="relative z-10 space-y-6 p-0">
                                    {/* Rating Stars */}
                                    {getPriorityBadge(review.rating)}

                                    {/* Comment Text */}
                                    <blockquote className="text-sm leading-relaxed text-muted-foreground italic">
                                        "{review.comment}"
                                    </blockquote>

                                    {/* Guest Meta info */}
                                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/10 pt-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm font-extrabold text-primary">
                                                {review.avatar}
                                            </div>
                                            <div className="space-y-0.5 text-left">
                                                <div className="flex items-center gap-1.5">
                                                    <h4 className="text-xs font-bold text-foreground">
                                                        {review.author}
                                                    </h4>
                                                    {review.verified && (
                                                        <Badge
                                                            variant="outline"
                                                            className="flex items-center gap-0.5 border-emerald-500/20 bg-emerald-500/5 px-1 py-0 text-[8px] font-normal text-emerald-500"
                                                        >
                                                            <CheckCircle className="size-2.5 fill-current" />
                                                            Verified Client
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                                                    <Calendar className="size-3" />
                                                    <span>
                                                        Reserved in{' '}
                                                        {review.date}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className="px-2 py-0.5 font-mono text-[9px]"
                                        >
                                            {review.type}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Slider Navigation & Pagination Controls */}
                <div className="mt-4 flex items-center justify-between px-2 select-none">
                    <div className="flex gap-1">
                        {REVIEWS_DATA.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => goToReview(idx)}
                                className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                                    activeIndex === idx
                                        ? 'w-6 bg-primary'
                                        : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60'
                                }`}
                            />
                        ))}
                    </div>
                    <div className="flex gap-1.5">
                        <Button
                            onClick={prevReview}
                            variant="outline"
                            size="icon"
                            disabled={activeIndex === 0}
                            className="size-8 cursor-pointer rounded-full border-border/40 hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
                        >
                            <ChevronLeft className="size-4" />
                        </Button>
                        <Button
                            onClick={nextReview}
                            variant="outline"
                            size="icon"
                            disabled={activeIndex === REVIEWS_DATA.length - 1}
                            className="size-8 cursor-pointer rounded-full border-border/40 hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
                        >
                            <ChevronRight className="size-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewsSlider;
