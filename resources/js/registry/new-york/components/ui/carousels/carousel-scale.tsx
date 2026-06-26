'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import 'swiper/css';

interface CarouselScaleProps {
    items: React.ReactNode[];
    autoplay?: boolean;
    autoplayDelay?: number;
    className?: string;
}

export function CarouselScale({
    items,
    autoplay = true,
    autoplayDelay = 3000,
    className,
}: CarouselScaleProps) {
    const [swiper, setSwiper] = React.useState<SwiperClass | null>(null);
    const [activeIndex, setActiveIndex] = React.useState(0);

    return (
        <div className={cn('relative w-full space-y-6', className)}>
            <div className="relative overflow-hidden py-4">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    centeredSlides={true}
                    slidesPerView={1.5}
                    spaceBetween={16}
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
                    breakpoints={{
                        640: { slidesPerView: 2.2, spaceBetween: 24 },
                        1024: { slidesPerView: 3, spaceBetween: 30 },
                    }}
                    className="w-full"
                >
                    {items.map((item, idx) => (
                        <SwiperSlide key={idx} className="h-auto">
                            {({ isActive }) => (
                                <div
                                    className={cn(
                                        'h-full w-full transform transition-all duration-500 ease-out select-none',
                                        isActive
                                            ? 'scale-100 opacity-100 shadow-md'
                                            : 'scale-85 opacity-40 blur-[0.5px]',
                                    )}
                                >
                                    {item}
                                </div>
                            )}
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

export default CarouselScale;
