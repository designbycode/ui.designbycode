'use client';

import { ChevronUp, ChevronDown } from 'lucide-react';
import * as React from 'react';
import type { Swiper as SwiperClass } from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import 'swiper/css';
import 'swiper/css/pagination';

interface CarouselVerticalProps {
    items: React.ReactNode[];
    autoplay?: boolean;
    autoplayDelay?: number;
    className?: string;
    height?: string;
}

export function CarouselVertical({
    items,
    autoplay = true,
    autoplayDelay = 3000,
    className,
    height = '240px',
}: CarouselVerticalProps) {
    const [swiper, setSwiper] = React.useState<SwiperClass | null>(null);
    const [activeIndex, setActiveIndex] = React.useState(0);

    return (
        <div
            className={cn(
                'relative flex w-full items-center justify-center gap-4',
                className,
            )}
        >
            {/* Slider container with constrained height */}
            <div
                style={{ height }}
                className="relative flex-1 overflow-hidden rounded-xl border border-border/40 bg-card/15 p-4"
            >
                <Swiper
                    modules={[Autoplay, Pagination]}
                    direction="vertical"
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
                    className="h-full w-full"
                >
                    {items.map((item, idx) => (
                        <SwiperSlide key={idx} className="h-full">
                            <div className="h-full w-full select-none">
                                {item}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Vertical Controls and Pagination */}
            <div className="flex flex-col items-center gap-4 select-none">
                <Button
                    onClick={() => swiper?.slidePrev()}
                    variant="outline"
                    size="icon"
                    className="size-8 cursor-pointer rounded-full border-border/40 hover:bg-muted"
                    aria-label="Previous slide"
                >
                    <ChevronUp className="size-4" />
                </Button>

                {/* Vertical indicators */}
                <div className="flex flex-col gap-2">
                    {items.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => swiper?.slideToLoop(idx)}
                            className={cn(
                                'w-1.5 cursor-pointer rounded-full transition-all duration-300',
                                activeIndex === idx
                                    ? 'h-6 bg-primary'
                                    : 'h-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60',
                            )}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                <Button
                    onClick={() => swiper?.slideNext()}
                    variant="outline"
                    size="icon"
                    className="size-8 cursor-pointer rounded-full border-border/40 hover:bg-muted"
                    aria-label="Next slide"
                >
                    <ChevronDown className="size-4" />
                </Button>
            </div>
        </div>
    );
}

export default CarouselVertical;
