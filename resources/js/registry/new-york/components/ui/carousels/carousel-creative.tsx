'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import type { Swiper as SwiperClass } from 'swiper';
import { Autoplay, EffectCreative } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import 'swiper/css';
import 'swiper/css/effect-creative';

interface CarouselCreativeProps {
    items: React.ReactNode[];
    autoplay?: boolean;
    autoplayDelay?: number;
    className?: string;
}

export function CarouselCreative({
    items,
    autoplay = true,
    autoplayDelay = 3500,
    className,
}: CarouselCreativeProps) {
    const [swiper, setSwiper] = React.useState<SwiperClass | null>(null);
    const [activeIndex, setActiveIndex] = React.useState(0);

    return (
        <div className={cn('relative w-full space-y-4', className)}>
            <div className="relative overflow-hidden rounded-xl border border-border/40 bg-card/15 p-4">
                <Swiper
                    modules={[Autoplay, EffectCreative]}
                    effect="creative"
                    grabCursor={true}
                    creativeEffect={{
                        prev: {
                            shadow: true,
                            translate: ['-20%', 0, -1],
                        },
                        next: {
                            translate: ['100%', 0, 0],
                        },
                    }}
                    onSwiper={setSwiper}
                    onSlideChange={(s) => setActiveIndex(s.realIndex)}
                    autoplay={
                        autoplay
                            ? {
                                  delay: autoplayDelay,
                                  disableOnInteraction: false,
                              }
                            : false
                    }
                    loop={true}
                    slidesPerView={1}
                    className="w-full"
                >
                    {items.map((item, idx) => (
                        <SwiperSlide key={idx} className="h-auto">
                            <div className="h-full w-full select-none">
                                {item}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between px-2 select-none">
                <div className="flex gap-1.5">
                    {items.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => swiper?.slideToLoop(idx)}
                            className={cn(
                                'h-1.5 cursor-pointer rounded-full transition-all duration-300',
                                activeIndex === idx
                                    ? 'w-6 bg-primary'
                                    : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60',
                            )}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={() => swiper?.slidePrev()}
                        variant="outline"
                        size="icon"
                        className="size-8 cursor-pointer rounded-full border-border/40 hover:bg-muted"
                    >
                        <ChevronLeft className="size-4" />
                    </Button>
                    <Button
                        onClick={() => swiper?.slideNext()}
                        variant="outline"
                        size="icon"
                        className="size-8 cursor-pointer rounded-full border-border/40 hover:bg-muted"
                    >
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CarouselCreative;
