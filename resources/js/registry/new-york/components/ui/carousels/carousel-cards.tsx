'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import type { Swiper as SwiperClass } from 'swiper';
import { Autoplay, EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import 'swiper/css';
import 'swiper/css/effect-cards';

interface CarouselCardsProps {
    items: React.ReactNode[];
    autoplay?: boolean;
    autoplayDelay?: number;
    className?: string;
}

export function CarouselCards({
    items,
    autoplay = true,
    autoplayDelay = 3000,
    className,
}: CarouselCardsProps) {
    const [swiper, setSwiper] = React.useState<SwiperClass | null>(null);

    return (
        <div
            className={cn(
                'relative flex flex-col items-center gap-4',
                className,
            )}
        >
            <div className="w-full max-w-[280px] py-4 sm:max-w-[320px]">
                <Swiper
                    modules={[Autoplay, EffectCards]}
                    effect="cards"
                    grabCursor={true}
                    onSwiper={setSwiper}
                    autoplay={
                        autoplay
                            ? {
                                  delay: autoplayDelay,
                                  disableOnInteraction: false,
                              }
                            : false
                    }
                    loop={true}
                    className="aspect-3/4 w-full"
                >
                    {items.map((item, idx) => (
                        <SwiperSlide
                            key={idx}
                            className="overflow-hidden rounded-xl border border-border/40 shadow-lg"
                        >
                            <div className="h-full w-full select-none">
                                {item}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Navigation Controls */}
            <div className="flex gap-2 select-none">
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
    );
}

export default CarouselCards;
