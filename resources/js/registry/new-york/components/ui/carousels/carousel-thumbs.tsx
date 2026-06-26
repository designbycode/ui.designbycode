'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import { Thumbs, FreeMode } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

interface CarouselThumbsProps {
    items: React.ReactNode[];
    thumbnails: React.ReactNode[];
    className?: string;
}

export function CarouselThumbs({
    items,
    thumbnails,
    className,
}: CarouselThumbsProps) {
    const [mainSwiper, setMainSwiper] = React.useState<SwiperClass | null>(
        null,
    );
    const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null);
    const [activeIndex, setActiveIndex] = React.useState(0);

    return (
        <div className={cn('w-full space-y-4', className)}>
            {/* Main Swiper Slider */}
            <div className="relative overflow-hidden rounded-xl border border-border/40 bg-card/15 p-4">
                <Swiper
                    modules={[Thumbs, FreeMode]}
                    thumbs={{
                        swiper:
                            thumbsSwiper && !thumbsSwiper.destroyed
                                ? thumbsSwiper
                                : null,
                    }}
                    onSwiper={setMainSwiper}
                    onSlideChange={(s) => setActiveIndex(s.activeIndex)}
                    spaceBetween={10}
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

                {/* Left/Right Arrows */}
                <Button
                    onClick={() => mainSwiper?.slidePrev()}
                    variant="outline"
                    size="icon"
                    className="absolute top-1/2 left-6 z-10 size-8 -translate-y-1/2 rounded-full border-border/40 bg-background/80 shadow-sm backdrop-blur-xs hover:bg-muted"
                >
                    <ChevronLeft className="size-4" />
                </Button>
                <Button
                    onClick={() => mainSwiper?.slideNext()}
                    variant="outline"
                    size="icon"
                    className="absolute top-1/2 right-6 z-10 size-8 -translate-y-1/2 rounded-full border-border/40 bg-background/80 shadow-sm backdrop-blur-xs hover:bg-muted"
                >
                    <ChevronRight className="size-4" />
                </Button>
            </div>

            {/* Thumbnail Navigation Slider */}
            <div className="px-2">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[Thumbs, FreeMode]}
                    className="w-full cursor-pointer select-none"
                    breakpoints={{
                        640: { slidesPerView: Math.min(6, thumbnails.length) },
                    }}
                >
                    {thumbnails.map((thumb, idx) => (
                        <SwiperSlide key={idx}>
                            <div
                                className={cn(
                                    'overflow-hidden rounded-lg border-2 transition-all duration-300',
                                    activeIndex === idx
                                        ? 'scale-95 border-primary bg-primary/5 shadow-sm'
                                        : 'border-border/30 hover:border-border/80',
                                )}
                            >
                                {thumb}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default CarouselThumbs;
